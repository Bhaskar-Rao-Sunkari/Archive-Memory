from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Dict, Any
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class ArchiveCreate(BaseModel):
    config: Dict[str, Any]


class Archive(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    config: Dict[str, Any]
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@api_router.get("/")
async def root():
    return {"message": "Memory Archive online"}


@api_router.post("/archive")
async def create_archive(payload: ArchiveCreate):
    archive = Archive(config=payload.config)
    await db.archives.insert_one(archive.model_dump())
    return {"id": archive.id}


@api_router.get("/archive/{archive_id}")
async def get_archive(archive_id: str):
    doc = await db.archives.find_one({"id": archive_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Archive not found")
    return doc


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

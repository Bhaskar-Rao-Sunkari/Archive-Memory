import axios from "axios";
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export async function saveArchive(cfg) {
  const { data } = await axios.post(`${API}/archive`, { config: cfg });
  return data.id;
}

export async function loadArchive(id) {
  const { data } = await axios.get(`${API}/archive/${id}`);
  return data.config;
}

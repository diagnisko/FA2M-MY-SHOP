import axios, { type AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";

const baseURL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({ baseURL });

let refreshing: Promise<string | null> | null = null;

async function refreshAccess(): Promise<string | null> {
  const refresh = useAuthStore.getState().refresh;
  if (!refresh) return null;
  const refreshUrl = baseURL.startsWith("http")
    ? `${baseURL.replace(/\/$/, "")}/auth/refresh/`
    : "/api/auth/refresh/";
  try {
    const { data } = await axios.post(refreshUrl, { refresh });
    const access = data.access as string;
    useAuthStore.getState().setAccess(access);
    return access;
  } catch {
    useAuthStore.getState().logout();
    return null;
  }
}

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().access;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const original = error.config;
    if (!original || error.response?.status !== 401) throw error;
    if ((original as { _retry?: boolean })._retry) throw error;
    (original as { _retry?: boolean })._retry = true;
    if (!refreshing) refreshing = refreshAccess();
    const access = await refreshing;
    refreshing = null;
    if (!access) throw error;
    original.headers.Authorization = `Bearer ${access}`;
    return api.request(original);
  },
);

export function mediaUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  const root = baseURL.replace(/\/api\/?$/, "");
  if (root.startsWith("http")) return `${root}${path}`;
  return path;
}

export const API_BASE = "http://localhost:3000";

export async function apiFetch(path, options = {}) {
  console.log("Fetching API...")
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include", // needed for httpOnly cookies
    ...options
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    console.log(`Data Error: ${e}`)
  }
  if (!res.ok) {
    throw new Error(data?.error || `Request failed: ${res.status}`);
  }
  return data;
}

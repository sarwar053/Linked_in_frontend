const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/talent`;



export async function fetchTalents({
  search = "",
  category = "",
  locations = [],
  sort = "recent",
  page = 1,
  limit = 12,
} = {}) {
  const query = new URLSearchParams();
 
  if (search.trim()) query.set("search", search.trim());
  if (category && category.toLowerCase() !== "all categories") {
    query.set("category", category);
  }
  if (locations.length) query.set("location", locations.join(","));
  if (sort) query.set("sort", sort);
  query.set("page", String(page));
  query.set("limit", String(limit));
 
  const res = await fetch(`${API_BASE}?${query.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
 
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed with status ${res.status}`);
  }
 
  return res.json(); // { success, data, pagination, categoryCounts }
}
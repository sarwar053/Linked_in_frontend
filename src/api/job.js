const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/job`;

const getToken = () => localStorage.getItem("token"); // change key if yours differs

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const getMyJobs = async () => {
  const res = await fetch(`${BASE_URL}/my-jobs`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch jobs");
  return data.data;
};

export const updateJob = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update job");
  return data.data;
};

export const deleteJob = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete job");
  return data;
};
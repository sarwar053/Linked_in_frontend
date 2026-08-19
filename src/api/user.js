const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

export async function getAllUsers() {
  const res = await fetch(`${BASE_URL}/all-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // only needed if you're using cookies/sessions for auth
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to fetch users");
  }

  const data = await res.json();
  return data.users; // your backend returns { success, count, users }
}

export async function getUser(userId) {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // only needed if you're using cookies/sessions for auth
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to fetch user");
  }

  const data = await res.json();
  return data; // your backend returns { success, user }
}
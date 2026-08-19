import { useState, useRef, useEffect } from "react";
import JobCard from "./card";
import { getMyJobs,updateJob,deleteJob } from "../../api/job";
import { useNavigate } from "react-router-dom";

import {
  Camera,
  Pencil,
  Check,
  X,
  MapPin,
  Building2,
  ShieldCheck,
  Plus,
  Home,
  LogOut
} from "lucide-react";


// samples



// ─── API helpers ─────────────────────────────────────────────────────────────

const fetchProfileApi = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};



const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/client`;

const updateNameApi = async ({ name }) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/update-name`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

const updateAvatarApi = async ({ file }) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("avatar", file);
  const res = await fetch(`${BASE_URL}/update-avatar`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data; // { avatarUrl }
};



export default function ClientProfile() {

  const navigate = useNavigate();

  // Home navigation function
  const handleHome = () => {
    navigate('/'); // Navigate to home page
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin'); // Adjust to your login route
  };

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");


  const [client, setClient] = useState({});
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(client.name);
  const [nameError, setNameError] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const fileInputRef = useRef(null);


  // jobs state
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Name editing ──
  const startEditingName = () => {
    setNameDraft(client.name);
    setNameError("");
    setIsEditingName(true);
  };

  const cancelEditingName = () => {
    setIsEditingName(false);
    setNameError("");
  };

  const saveName = async () => {
    const trimmed = nameDraft.trim();
    if (!trimmed) {
      setNameError("Name can't be empty.");
      return;
    }
    setIsSavingName(true);
    try {
      await updateNameApi({ name: trimmed });
      setClient((prev) => ({ ...prev, name: trimmed }));
      setIsEditingName(false);
    } catch (err) {
      setNameError(err.message || "Couldn't save your name.");
    } finally {
      setIsSavingName(false);
    }
  };

  // ── Avatar editing ──
  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Image must be under 5MB.");
      return;
    }

    setAvatarError("");
    const previewUrl = URL.createObjectURL(file);
    setClient((prev) => ({ ...prev, avatarUrl: previewUrl }));

    setIsUploadingAvatar(true);
    try {
      const { avatarUrl } = await updateAvatarApi({ file });
      setClient((prev) => ({ ...prev, avatarUrl }));
    } catch (err) {
      setAvatarError(err.message || "Couldn't upload photo.");
    } finally {
      setIsUploadingAvatar(false);
      e.target.value = "";
    }
  };

  // ── Post a job ──
  const handlePostJob = () => {
    window.location.href = "/post-job";
  };

  


     useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfileApi();
        setClient({
          ...data,
          memberSince: new Date(data.memberSince).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
        });
      } catch (err) {
        setLoadError(err.message || "Couldn't load profile.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();

    const fetchJobs = async () => {
      try {
        const data = await getMyJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();

  }, []);


  const handleDelete = async (id) => {
    const prevJobs = jobs;
    setJobs((prev) => prev.filter((job) => job._id !== id)); // optimistic
    try {
      await deleteJob(id);
    } catch (err) {
      setJobs(prevJobs); // revert on failure
      alert(err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const prevJobs = jobs;
    setJobs((prev) =>
      prev.map((job) => (job._id === id ? { ...job, status: newStatus } : job))
    ); // optimistic
    try {
      await updateJob(id, { status: newStatus });
    } catch (err) {
      setJobs(prevJobs); // revert on failure
      alert(err.message);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>;
  }

  if (loadError || !client) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{loadError || "Profile not found."}</div>;
  }

  if (loading) return <p className="text-center py-10 text-gray-500">Loading your jobs...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;


  const initials = client.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

 


  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      {/* Top Navigation Bar */}
      <div className="mx-auto max-w-3xl mb-6">
        <div className="flex items-center justify-end gap-3 bg-white rounded-xl px-4 py-3 shadow-sm ring-1 ring-slate-200">
          <button
            onClick={handleHome}
            title="Go to Home"
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Home</span>
          </button>
          
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors border border-red-200"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        {/* ── Card ── */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900" />

          {/* Identity block */}
          <div className="px-8 pb-8">
            <div className="-mt-12 flex items-end justify-between">
              {/* Avatar */}
              <div className="group relative">
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  aria-label="Change profile photo"
                  className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-sm"
                >
                  {client.avatarUrl ? (
                    <img
                      src={client.avatarUrl}
                      alt={client.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-semibold text-slate-500">
                      {initials}
                    </span>
                  )}

                  {/* Hover overlay */}
                  <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 text-white opacity-0 transition group-hover:bg-slate-900/50 group-hover:opacity-100">
                    <Camera className="h-5 w-5" />
                  </span>

                  {isUploadingAvatar && (
                    <span className="absolute inset-0 flex items-center justify-center bg-white/70">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-slate-900" />
                    </span>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <div className="mb-1 flex items-center gap-2">
                {client.isVerified && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified client
                  </span>
                )}
                
              </div>
            </div>

            {avatarError && (
              <p className="mt-2 text-xs text-red-600">{avatarError}</p>
            )}

            {/* Name */}
            <div className="mt-4">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveName();
                      if (e.key === "Escape") cancelEditingName();
                    }}
                    className={`rounded-lg border px-3 py-1.5 text-xl font-semibold text-slate-900 outline-none transition focus:ring-2 focus:ring-offset-0 ${
                      nameError
                        ? "border-red-300 focus:ring-red-200"
                        : "border-slate-300 focus:border-slate-400 focus:ring-slate-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={saveName}
                    disabled={isSavingName}
                    aria-label="Save name"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-slate-800 disabled:opacity-60"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditingName}
                    aria-label="Cancel"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-500 transition hover:bg-slate-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold text-slate-900">
                    {client.name}
                  </h1>
                  <button
                    type="button"
                    onClick={startEditingName}
                    aria-label="Edit name"
                    className="text-slate-400 transition hover:text-slate-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                        </div>
                  <button
                  type="button"
                  onClick={handlePostJob}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  <Plus className="h-4 w-4" />
                  Post a job
                </button>
                </div>
              )}
              {nameError && !isSavingName && (
                <p className="mt-1 text-xs text-red-600">{nameError}</p>
              )}

              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  {client.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {client.location}
                </span>
                
              </div>
            </div>
          </div>


{/* card */}


{jobs &&(
  <div className="flex flex-col items-center gap-6 py-8 px-4">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      ))}
</div>
)}



        </div>
      </div>
    </div>
  );
}
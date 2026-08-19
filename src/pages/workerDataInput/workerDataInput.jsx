import { useState, useRef, useMemo, useEffect } from "react";
import { ArrowLeft } from "lucide-react";


const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

function getToken() {
  return localStorage.getItem("token"); // adjust to however you store the JWT
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
}

async function getProfile() {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return handleResponse(res);
}

async function updateProfile(profile) {
  const formData = new FormData();

  if (profile.fullName) formData.append("fullName", profile.fullName);
  if (profile.whatsapp) formData.append("whatsapp", profile.whatsapp);
  if (profile.gender) formData.append("gender", profile.gender);

  if (profile.address) formData.append("address", profile.address);
  

  if (profile.skills) formData.append("skills", JSON.stringify(profile.skills));
  if (profile.certifications)
    formData.append("certifications", JSON.stringify(profile.certifications));
  if (profile.languages) formData.append("languages", JSON.stringify(profile.languages));
  if (profile.experience) formData.append("experience", JSON.stringify(profile.experience));

  if (profile.currency) formData.append("currency", profile.currency);
  if (profile.amount) formData.append("amount", profile.amount);

  if (profile.videoFile) formData.append("video", profile.videoFile);
  if (profile.photoFile) formData.append("photo", profile.photoFile);

  const res = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      // Do NOT set Content-Type manually — the browser sets the multipart boundary
    },
    body: formData,
  });
  return handleResponse(res);
}

/* ============================================================
   CONSTANTS
   ============================================================ */
const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];
const COMMON_LANGUAGES = [
  "Arabic", "Bengali", "Cantonese", "English", "French", "German",
  "Hindi", "Indonesian", "Japanese", "Malay", "Mandarin", "Portuguese",
  "Russian", "Spanish", "Tagalog", "Tamil", "Urdu", "Vietnamese"
].sort();
const CURRENCIES = ["BDT", "USD", "AED", "SAR", "MYR"];

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

/* ---------- small icon set (no external deps) ---------- */
const Icon = {
  Upload: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Trash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  ),
  ArrowLeft: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 19.5c1.6-3.3 4.3-5 7.5-5s5.9 1.7 7.5 5" strokeLinecap="round" />
    </svg>
  ),
  Badge: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5 7.5 21l4.5-2.3L16.5 21 15 13.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Coins: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <ellipse cx="9" cy="7" rx="5.5" ry="3" />
      <path d="M3.5 7v5c0 1.66 2.46 3 5.5 3s5.5-1.34 5.5-3V7" strokeLinecap="round" />
      <path d="M9 12v5c0 1.66 2.46 3 5.5 3s5.5-1.34 5.5-3v-5c0-1.1-1.06-2.06-2.6-2.56" strokeLinecap="round" />
    </svg>
  ),
  Whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.3 0-.5s-.6-1.5-.9-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.3zM12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2z" />
    </svg>
  ),
  Spinner: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
};

/* ---------- shared class fragments ---------- */
const inputClass =
  "w-full bg-ink border border-panel-border text-ivory placeholder:text-[#5A6269] text-sm px-3.5 py-2.5 font-sans focus:outline-none focus:border-gold transition-colors";
const labelClass = "text-xs text-muted font-medium";
const fieldCodeClass = "font-mono text-[11px] tracking-[0.1em] text-muted mb-2.5";
const panelTitleClass = "font-display text-xl font-semibold mb-1.5";

/* ================= MAIN COMPONENT ================= */
export default function WorkerDataInput({ onBack }) {
  const [profile, setProfile] = useState({ fullName: "", email: "", whatsapp: "", gender: "",address:"" });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState([
    { id: makeId(), role: "", company: "", duration: "", description: "" },
  ]);
  const [video, setVideo] = useState(null); // { url, name, size, file }
  const [videoError, setVideoError] = useState("");
  const [photo, setPhoto] = useState(null); // { url, name, size, file }
  const [photoError, setPhotoError] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [certInput, setCertInput] = useState("");
  const [languages, setLanguages] = useState([
    { id: makeId(), name: "", level: "Conversational" },
  ]);
  const [indicative, setIndicative] = useState({ currency: "BDT", amount: "" });
  const [passportId, setPassportId] = useState(null); // comes from the server once saved

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

  /* ---------- load existing profile on mount ---------- */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadingProfile(true);
      setLoadError("");
      try {
        const { user } = await getProfile();
        if (cancelled || !user) return;

        setProfile({
          fullName: user.name || "",
          email: user.email || "",
          whatsapp: user.whatsapp || "",
          gender: user.gender || "",
          address:user.address || "",
        });
        setSkills(user.skills || []);
        setCertifications(user.certifications || []);
        setLanguages(
          user.languages?.length
            ? user.languages.map((l) => ({ id: makeId(), name: l.name, level: l.level }))
            : [{ id: makeId(), name: "", level: "Conversational" }]
        );
        setExperience(
          user.experience?.length
            ? user.experience.map((e) => ({ id: makeId(), ...e }))
            : [{ id: makeId(), role: "", company: "", duration: "", description: "" }]
        );
        setIndicative({
          currency: user.indicativeSalary?.currency || "BDT",
          amount: user.indicativeSalary?.amount ? String(user.indicativeSalary.amount) : "",
        });
        if (user.videoUrl) setVideo({ url: user.videoUrl, name: "Current video", size: 0, file: null });
        if (user.photoUrl) setPhoto({ url: user.photoUrl, name: "Current photo", size: 0, file: null });
        if (user.passportId) setPassportId(user.passportId);
      } catch (err) {
        if (!cancelled) setLoadError(err.message || "Couldn't load your profile.");
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (video?.url && video.file) URL.revokeObjectURL(video.url);
    };
  }, [video]);

  useEffect(() => {
    return () => {
      if (photo?.url && photo.file) URL.revokeObjectURL(photo.url);
    };
  }, [photo]);

  const handleProfileChange = (field) => (e) =>
    setProfile((p) => ({ ...p, [field]: e.target.value }));

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    if (skills.some((s) => s.toLowerCase() === value.toLowerCase())) {
      setSkillInput("");
      return;
    }
    setSkills((s) => [...s, value]);
    setSkillInput("");
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skill) => setSkills((s) => s.filter((x) => x !== skill));

  const addExperience = () =>
    setExperience((exp) => [
      ...exp,
      { id: makeId(), role: "", company: "", duration: "", description: "" },
    ]);

  const removeExperience = (id) =>
    setExperience((exp) => exp.filter((x) => x.id !== id));

  const updateExperience = (id, field, value) =>
    setExperience((exp) => exp.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoError("");
    if (!file.type.startsWith("video/")) {
      setVideoError("Please choose a video file.");
      return;
    }
    const MAX_MB = 100;
    if (file.size > MAX_MB * 1024 * 1024) {
      setVideoError(`Keep videos under ${MAX_MB}MB.`);
      return;
    }
    if (video?.url && video.file) URL.revokeObjectURL(video.url);
    setVideo({ url: URL.createObjectURL(file), name: file.name, size: file.size, file });
  };

  const removeVideo = () => {
    if (video?.url && video.file) URL.revokeObjectURL(video.url);
    setVideo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError("");
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file.");
      return;
    }
    const MAX_MB = 10;
    if (file.size > MAX_MB * 1024 * 1024) {
      setPhotoError(`Keep photos under ${MAX_MB}MB.`);
      return;
    }
    if (photo?.url && photo.file) URL.revokeObjectURL(photo.url);
    setPhoto({ url: URL.createObjectURL(file), name: file.name, size: file.size, file });
  };

  const removePhoto = () => {
    if (photo?.url && photo.file) URL.revokeObjectURL(photo.url);
    setPhoto(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const addCertification = () => {
    const value = certInput.trim();
    if (!value) return;
    if (certifications.some((c) => c.toLowerCase() === value.toLowerCase())) {
      setCertInput("");
      return;
    }
    setCertifications((c) => [...c, value]);
    setCertInput("");
  };

  const handleCertKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addCertification();
    }
  };

  const removeCertification = (cert) =>
    setCertifications((c) => c.filter((x) => x !== cert));

  const addLanguage = () =>
    setLanguages((langs) => [...langs, { id: makeId(), name: "", level: "Conversational" }]);

  const removeLanguage = (id) =>
    setLanguages((langs) => (langs.length > 1 ? langs.filter((x) => x.id !== id) : langs));

  const updateLanguage = (id, field, value) =>
    setLanguages((langs) => langs.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const handleIndicativeAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setIndicative((i) => ({ ...i, amount: value }));
  };

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    } else if (typeof window !== "undefined" && window.history.length > 1) {
      window.location.href = "/";
    }
  };

  const completeness = useMemo(() => {
    const checks = [
      !!profile.fullName.trim(),
      !!profile.email.trim(),
      !!profile.whatsapp.trim(),
      !!profile.gender,
      !!profile.address,
      skills.length > 0,
      !!video,
      !!photo,
      languages.some((l) => l.name.trim()),
    ];
    const done = checks.filter(Boolean).length;
    return Math.round((done / checks.length) * 100);
  }, [profile, skills, video, photo, languages]);

  const initials =
    (profile.fullName || "?")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?";

  /* ---------- submit to backend ---------- */
  const handleSubmit = async () => {
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    try {
      const { user } = await updateProfile({
        fullName: profile.fullName,
        whatsapp: profile.whatsapp,
        gender: profile.gender,
        address: profile.address,
        skills,
        certifications,
        languages: languages.filter((l) => l.name.trim()),
        experience: experience
          .filter((e) => e.role || e.company)
          .map(({  ...rest }) => rest),
        currency: indicative.currency,
        amount: indicative.amount,
        videoFile: video?.file || null,
        photoFile: photo?.file || null,
      });

      if (user?.passportId) setPassportId(user.passportId);
      if (user?.videoUrl) setVideo((v) => (v ? { ...v, url: user.videoUrl, file: null } : v));
      if (user?.photoUrl) setPhoto((p) => (p ? { ...p, url: user.photoUrl, file: null } : p));

      setSaveSuccess(true);
    } catch (err) {
      setSaveError(err.message || "Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-ink text-ivory font-sans flex items-center justify-center gap-3">
        <Icon.Spinner className="w-5 h-5 animate-spin text-gold" />
        <span className="text-sm text-muted">Loading your profile…</span>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-ink text-ivory font-sans px-4 py-12 sm:px-8 sm:py-16">
        <header className="max-w-295 mx-auto mb-10 flex items-center gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="group flex items-center gap-2 px-4 py-2 border border-panel-border bg-panel text-ivory text-xs font-semibold tracking-widest transition-all duration-300 hover:border-gold hover:text-gold hover:pl-3"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            HOME
          </button>
          <div className="w-13 h-13 border border-gold text-gold font-mono font-medium text-[15px] flex items-center justify-center shrink-0">
            TP
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-gold mb-1">
              Talent Passport / Profile Builder
            </p>
            <h1 className="font-display font-semibold text-3xl tracking-tight">Build your profile</h1>
          </div>
        </header>

        {loadError && (
          <div className="max-w-295 mx-auto mb-6 border border-red text-red text-sm px-4 py-3 bg-red/5">
            {loadError}
          </div>
        )}

        <div className="max-w-295 mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-7 items-start">
          {/* ---------------- FORM COLUMN ---------------- */}
          <div className="flex flex-col gap-5 min-w-0">
            <section className="bg-panel border border-panel-border p-7">
              <p className={fieldCodeClass}>FIELD 01 — VIDEO INTRODUCTION</p>
              <h2 className={panelTitleClass}>Say hello on camera</h2>
              <p className="text-muted text-[13.5px] mb-5 leading-relaxed">
                A short intro video helps people get a real sense of you before they read a word.
              </p>

              {!video ? (
                <button
                  type="button"
                  className="w-full border-[1.5px] border-dashed border-panel-border text-muted py-10 px-5 flex flex-col items-center gap-2 cursor-pointer transition-colors hover:border-gold hover:text-gold"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icon.Upload className="w-6.5 h-6.5" />
                  <span className="text-sm font-medium text-ivory">Click to upload a video</span>
                  <span className="text-xs text-muted">MP4, MOV or WebM — up to 100MB</span>
                </button>
              ) : (
                <div className="border border-panel-border">
                  <video src={video.url} controls className="w-full block bg-black max-h-80" />
                  <div className="flex items-center justify-between px-3.5 py-3 bg-ink">
                    <div>
                      <p className="text-sm m-0">{video.name}</p>
                      <p className="text-[11.5px] text-muted mt-0.5">
                        {video.size ? formatBytes(video.size) : "Saved to your profile"}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="w-8.5 h-8.5 border border-panel-border bg-ink text-ivory flex items-center justify-center hover:border-red hover:text-red"
                      onClick={removeVideo}
                      aria-label="Remove video"
                    >
                      <Icon.Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
              {videoError && <p className="text-red text-[12.5px] mt-2.5">{videoError}</p>}
            </section>

            <section className="bg-panel border border-panel-border p-7">
              <p className={fieldCodeClass}>FIELD 02 — PROFILE PICTURE</p>
              <h2 className={panelTitleClass}>Put a face to the name</h2>
              <p className="text-muted text-[13.5px] mb-5 leading-relaxed">
                Used as your passport photo when your video isn't playing.
              </p>

              <div className="flex items-center gap-5">
                <div className="w-24 h-24 rounded-full border border-panel-border bg-ink overflow-hidden flex items-center justify-center shrink-0">
                  {photo ? (
                    <img src={photo.url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Icon.User className="w-9 h-9 text-muted" />
                  )}
                </div>

                <div className="flex flex-col gap-2.5 min-w-0">
                  {photo && (
                    <div className="min-w-0">
                      <p className="text-sm m-0 truncate">{photo.name}</p>
                      <p className="text-[11.5px] text-muted mt-0.5">
                        {photo.size ? formatBytes(photo.size) : "Saved to your profile"}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      className="border border-panel-border bg-ink text-ivory text-[13px] px-3.5 py-2 hover:border-gold hover:text-gold transition-colors"
                      onClick={() => photoInputRef.current?.click()}
                    >
                      {photo ? "Change photo" : "Upload photo"}
                    </button>
                    {photo && (
                      <button
                        type="button"
                        className="border border-panel-border bg-ink text-ivory text-[13px] px-3.5 py-2 hover:border-red hover:text-red transition-colors"
                        onClick={removePhoto}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              {photoError && <p className="text-red text-[12.5px] mt-2.5">{photoError}</p>}
            </section>

            <section className="bg-panel border border-panel-border p-7">
              <p className={fieldCodeClass}>FIELD 03 — PERSONAL DETAILS</p>
              <h2 className={panelTitleClass}>Who are you?</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Full name</span>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={handleProfileChange("fullName")}
                    placeholder="Jamal Uddin"
                    className={inputClass}
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Email</span>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    placeholder="jamal@email.com"
                    className={`${inputClass} opacity-60 cursor-not-allowed`}
                    title="Email is tied to your account and can't be changed here."
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>WhatsApp number</span>
                  <div className="relative">
                    <Icon.Whatsapp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green" />
                    <input
                      type="tel"
                      value={profile.whatsapp}
                      onChange={handleProfileChange("whatsapp")}
                      placeholder="+880 1XXX-XXXXXX"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Address</span>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.address}
                      onChange={handleProfileChange("address")}
                      placeholder=""
                      className={`${inputClass}`}
                    />
                  </div>
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className={labelClass}>Gender</span>
                  <div className="flex flex-wrap gap-2">
                    {GENDERS.map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setProfile((p) => ({ ...p, gender: g }))}
                        className={`border px-3.5 py-2 text-[13px] font-sans transition-colors ${
                          profile.gender === g
                            ? "bg-gold-soft border-gold text-gold"
                            : "bg-ink border-panel-border text-muted hover:border-gold hover:text-ivory"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-panel border border-panel-border p-7">
              <p className={fieldCodeClass}>FIELD 04 — SKILLS</p>
              <h2 className={panelTitleClass}>What can you do?</h2>

              <div className="flex gap-2.5 mt-5">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter"
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  className="w-8.5 h-8.5 border border-panel-border bg-ink text-ivory flex items-center justify-center shrink-0 hover:border-gold hover:text-gold"
                  onClick={addSkill}
                  aria-label="Add skill"
                >
                  <Icon.Plus className="w-4 h-4" />
                </button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 bg-gold-soft border border-gold text-gold text-xs px-2.5 py-1.5"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        aria-label={`Remove ${skill}`}
                        className="text-gold flex p-0"
                      >
                        <Icon.Close className="w-2.75 h-2.75" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </section>

            <section className="bg-panel border border-panel-border p-7">
              <p className={fieldCodeClass}>FIELD 05 — CERTIFICATIONS</p>
              <h2 className={panelTitleClass}>Any certificates or training?</h2>
              <p className="text-muted text-[13.5px] mb-5 leading-relaxed">
                Add trade certificates, licenses, or completed training courses.
              </p>

              <div className="flex gap-2.5">
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  onKeyDown={handleCertKeyDown}
                  placeholder="e.g. Welding Certificate — BTEB, 2023"
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  className="w-8.5 h-8.5 border border-panel-border bg-ink text-ivory flex items-center justify-center shrink-0 hover:border-gold hover:text-gold"
                  onClick={addCertification}
                  aria-label="Add certification"
                >
                  <Icon.Plus className="w-4 h-4" />
                </button>
              </div>

              {certifications.length > 0 && (
                <div className="flex flex-col gap-2 mt-3.5">
                  {certifications.map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center justify-between gap-2.5 bg-ink border border-panel-border px-3.5 py-2.5"
                    >
                      <span className="flex items-center gap-2 text-[13px] min-w-0">
                        <Icon.Badge className="w-3.75 h-3.75 text-gold shrink-0" />
                        <span className="truncate">{cert}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCertification(cert)}
                        aria-label={`Remove ${cert}`}
                        className="text-muted hover:text-red shrink-0 flex p-0"
                      >
                        <Icon.Close className="w-3.25 h-3.25" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="bg-panel border border-panel-border p-7">
              <p className={fieldCodeClass}>FIELD 06 — LANGUAGES</p>
              <h2 className={panelTitleClass}>What do you speak?</h2>

              <div className="flex flex-col gap-3 mt-5">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex flex-col sm:flex-row items-center gap-2.5">
                    <select
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                      className={`${inputClass} flex-1`}
                    >
                      <option value="" disabled>Select a language</option>
                      {COMMON_LANGUAGES.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>

                    <select
                      value={lang.level}
                      onChange={(e) => updateLanguage(lang.id, "level", e.target.value)}
                      className={`${inputClass} sm:w-44`}
                    >
                      {["Basic", "Conversational", "Fluent", "Native"].map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>

                    {languages.length > 1 && (
                      <button
                        type="button"
                        className="w-8.5 h-8.5 border border-panel-border bg-ink text-ivory flex items-center justify-center shrink-0 hover:border-red hover:text-red self-end sm:self-center"
                        onClick={() => removeLanguage(lang.id)}
                        aria-label="Remove language"
                      >
                        <Icon.Trash className="w-3.75 h-3.75" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-4 w-full border border-dashed border-panel-border text-muted py-3 flex items-center justify-center gap-2 text-[13px] hover:border-gold hover:text-gold"
                onClick={addLanguage}
              >
                <Icon.Plus className="w-3.5 h-3.5" />
                Add another language
              </button>
            </section>

            <section className="bg-panel border border-panel-border p-7">
              <p className={fieldCodeClass}>FIELD 07 — INDICATIVE SALARY</p>
              <h2 className={panelTitleClass}>What are you expecting to earn?</h2>
              <p className="text-muted text-[13.5px] mb-5 leading-relaxed">
                A rough monthly figure — this helps match you to the right roles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className={labelClass}>Currency</span>
                  <div className="flex flex-wrap gap-2">
                    {CURRENCIES.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setIndicative((i) => ({ ...i, currency: c }))}
                        className={`border px-3.5 py-2 text-[13px] font-sans transition-colors ${
                          indicative.currency === c
                            ? "bg-gold-soft border-gold text-gold"
                            : "bg-ink border-panel-border text-muted hover:border-gold hover:text-ivory"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex flex-col gap-1.5 flex-1">
                  <span className={labelClass}>Hourly</span>
                  <div className="relative">
                    <Icon.Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={indicative.amount}
                      onChange={handleIndicativeAmountChange}
                      placeholder="25,000"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </label>
              </div>
            </section>

            <section className="bg-panel border border-panel-border p-7">
              <div className="flex items-center justify-between mb-1.5">
                <p className={`${fieldCodeClass} mb-0`}>FIELD 08 — WORK EXPERIENCE</p>
                <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-muted border border-panel-border px-2 py-1">
                  Optional
                </span>
              </div>
              <h2 className={panelTitleClass}>Where you've worked</h2>
              <p className="text-muted text-[13.5px] mb-5 leading-relaxed">
                Skip this section if you're just starting out — you can always add it later.
              </p>

              {experience.length > 0 && (
                <div className="flex flex-col gap-4.5">
                  {experience.map((exp, idx) => (
                    <div key={exp.id} className="border border-panel-border p-4.5 bg-white/1.5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-gold text-[13px]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <button
                          type="button"
                          className="w-7 h-7 border border-panel-border bg-ink text-ivory flex items-center justify-center hover:border-red hover:text-red"
                          onClick={() => removeExperience(exp.id)}
                          aria-label="Remove experience"
                        >
                          <Icon.Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1.5">
                          <span className={labelClass}>Role</span>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                            placeholder="Frontend Developer"
                            className={inputClass}
                          />
                        </label>
                        <label className="flex flex-col gap-1.5">
                          <span className={labelClass}>Company</span>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            placeholder="Acme Ltd."
                            className={inputClass}
                          />
                        </label>
                        <label className="flex flex-col gap-1.5 sm:col-span-2">
                          <span className={labelClass}>Duration</span>
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                            placeholder="Jan 2023 — Present"
                            className={inputClass}
                          />
                        </label>
                        <label className="flex flex-col gap-1.5 sm:col-span-2">
                          <span className={labelClass}>What did you do?</span>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            placeholder="Briefly describe your responsibilities and impact."
                            className={`${inputClass} resize-y leading-relaxed`}
                            rows={3}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                className="mt-4 w-full border border-dashed border-panel-border text-muted py-3 flex items-center justify-center gap-2 text-[13px] hover:border-gold hover:text-gold"
                onClick={addExperience}
              >
                <Icon.Plus className="w-3.5 h-3.5" />
                {experience.length === 0 ? "Add work experience" : "Add another role"}
              </button>
            </section>
          </div>

          {/* ---------------- LIVE PREVIEW COLUMN ---------------- */}
          <aside className="min-w-0">
            <div className="sticky top-8 flex flex-col gap-4">
              <div className="bg-paper text-paper-ink relative shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <div
                  className="h-3.5 bg-repeat-x bg-center"
                  style={{
                    backgroundImage: "radial-gradient(circle, #10161A 3.5px, transparent 4px)",
                    backgroundSize: "18px 100%",
                  }}
                />
                <div className="px-6 pt-6 pb-6">
                  <div className="flex justify-between font-mono text-[10.5px] tracking-[0.06em] text-[#6B665A] mb-4.5">
                    <span>TALENT PASSPORT</span>
                    <span>{passportId || "Not yet issued"}</span>
                  </div>

                  <div className="w-full aspect-16/10 bg-[#DAD5C6] mb-4 overflow-hidden flex items-center justify-center">
                    {video ? (
                      <video
                        src={video.url}
                        muted
                        loop
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : photo ? (
                      <img src={photo.url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display text-4xl font-semibold text-[#A79B7F]">
                        {initials}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-semibold mb-1">
                    {profile.fullName || "Your name here"}
                  </h3>
                  <p className="text-[13px] text-[#5C574A] mb-2">
                    {profile.email || "your@email.com"}
                    {profile.gender ? ` · ${profile.gender}` : ""}
                  </p>
                  {profile.whatsapp && (
                    <p className="text-[13px] text-green flex items-center gap-1.5 mb-1.5">
                      <Icon.Whatsapp className="w-3.25 h-3.25" /> {profile.whatsapp}
                    </p>
                  )}

                  {skills.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-[#D8D2C0]">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#8A836C] mb-2">
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s) => (
                          <span
                            key={s}
                            className="bg-gold-soft border border-gold/40 text-paper-ink text-xs px-2.5 py-1.5"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {certifications.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-[#D8D2C0]">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#8A836C] mb-2">
                        Certifications
                      </p>
                      <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
                        {certifications.map((c) => (
                          <li key={c} className="text-[13px]">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {languages.some((l) => l.name.trim()) && (
                    <div className="mt-4 pt-3.5 border-t border-[#D8D2C0]">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#8A836C] mb-2">
                        Languages
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {languages
                          .filter((l) => l.name.trim())
                          .map((l) => (
                            <span
                              key={l.id}
                              className="bg-gold-soft border border-gold/40 text-paper-ink text-xs px-2.5 py-1.5"
                            >
                              {l.name} <span className="text-[#7A745F]">· {l.level}</span>
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {experience.some((e) => e.role || e.company) && (
                    <div className="mt-4 pt-3.5 border-t border-[#D8D2C0]">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#8A836C] mb-2">
                        Experience
                      </p>
                      <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
                        {experience
                          .filter((e) => e.role || e.company)
                          .map((e) => (
                            <li key={e.id} className="text-[13px]">
                              <strong>{e.role || "Role"}</strong>
                              {e.company && ` · ${e.company}`}
                              {e.duration && <span className="text-[#7A745F]"> ({e.duration})</span>}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {indicative.amount && (
                    <div className="mt-4 pt-3.5 border-t border-[#D8D2C0]">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#8A836C] mb-2">
                        Indicative Salary
                      </p>
                      <p className="text-[13px] m-0">
                        {indicative.currency} {Number(indicative.amount).toLocaleString()}{" "}
                        <span className="text-[#7A745F]">/ hr</span>
                      </p>
                    </div>
                  )}

                  <div className="mt-5">
                    <div className="h-1.25 bg-[#DAD5C6] overflow-hidden mb-1.5">
                      <div
                        className="h-full bg-green transition-all duration-300"
                        style={{ width: `${completeness}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-[#7A745F]">
                      {completeness}% complete
                    </span>
                  </div>

                  {completeness === 100 && (
                    <div className="absolute top-15 right-5 border-2 border-green text-green font-mono text-[10.5px] tracking-[0.08em] px-2.5 py-1.5 rotate-[8deg] opacity-85">
                      VERIFIED PROFILE
                    </div>
                  )}
                </div>
              </div>

              {saveError && (
                <div className="border border-red text-red text-[12.5px] px-3.5 py-2.5">
                  {saveError}
                </div>
              )}
              {saveSuccess && !saving && (
                <div className="border border-green text-green text-[12.5px] px-3.5 py-2.5">
                  Profile saved successfully.
                </div>
              )}

              <button
                type="button"
                disabled={completeness < 100 || saving}
                onClick={handleSubmit}
                className={`w-full py-4 text-sm font-semibold font-sans transition-opacity flex items-center justify-center gap-2 ${
                  completeness < 100 || saving
                    ? "bg-panel text-muted border border-panel-border cursor-not-allowed"
                    : "bg-gold text-ink hover:opacity-90"
                }`}
              >
                {saving && <Icon.Spinner className="w-4 h-4 animate-spin" />}
                {saving
                  ? "Saving…"
                  : completeness < 100
                  ? "Complete profile to continue"
                  : "Save profile"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
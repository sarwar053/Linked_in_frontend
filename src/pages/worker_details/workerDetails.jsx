import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

/* ---------- Google Fonts loader (Fraunces for display, Inter for body,
   JetBrains Mono for the passport-code typography) ---------- */
function useFonts() {
  useEffect(() => {
    const id = "passport-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

const LEVEL_WIDTH = {
  Basic: "25%",
  Conversational: "55%",
  Fluent: "80%",
  Native: "100%",
};

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Seal({ verified }) {
  return (
    <div
      className={`relative flex h-24 w-24 shrink-0 -rotate-12 items-center justify-center rounded-full border-[3px] text-center font-mono ${
        verified
          ? "border-[#C9A227] text-[#8a6d13]"
          : "border-[#9AA5AC] text-[#6b7378]"
      }`}
      style={{
        borderStyle: "dashed",
      }}
    >
      <div className="leading-tight">
        <div className="text-[9px] tracking-[0.15em]">
          {verified ? "OFFICIALLY" : "AWAITING"}
        </div>
        <div className="text-[11px] font-bold tracking-[0.1em]">
          {verified ? "VERIFIED" : "REVIEW"}
        </div>
        <div className="mt-0.5 text-[8px] tracking-[0.15em]">TALENT PASSPORT</div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8a7d55]">
        {children}
      </span>
      <span className="h-px flex-1 bg-[#E4DDC9]" />
    </div>
  );
}

export default function Worker_details() {
  useFonts();
  const { id } = useParams();

  const [profileId, setProfileId] = useState(id);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  if (id !== profileId) {
    setProfileId(id);
    setUser(null);
    setError("");
    setLoading(true);
  }

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`${BASE_URL}/${id}`, { signal: controller.signal })
      .then((res) => {
        setUser(res.data?.user ?? res.data);
      })
      .catch((err) => {
        if (axios.isCancel?.(err) || err.name === "CanceledError") return;
        setError(
          err?.response?.data?.message || "Could not load this profile."
        );
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF6ED]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C9A227] border-t-transparent" />
          <span className="font-mono text-xs tracking-[0.2em] text-[#8a7d55]">
            RETRIEVING RECORD…
          </span>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF6ED] px-6">
        <div className="max-w-sm rounded-2xl border border-[#E4DDC9] bg-white px-8 py-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E9E9] font-mono text-lg text-[#B4453D]">
            !
          </div>
          <h2
            className="mb-2 text-xl text-[#23282B]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Record not found
          </h2>
          <p className="text-sm text-[#6b6455]">
            {error || "This passport could not be located."}
          </p>
        </div>
      </div>
    );
  }

  const {
    name,
    email,
    role,
    isVerified,
    passportId,
    whatsapp,
    address,
    gender,
    skills = [],
    certifications = [],
    languages = [],
    experience = [],
    indicativeSalary,
    videoUrl,
    photoUrl,
    createdAt,
  } = user;

  return (
    <div className="min-h-screen bg-[#FAF6ED] pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navy cover band */}
      <div className="bg-[#0F2A3E] pb-24 pt-10">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-[#9DB4C4]">
            <span>Talent Passport</span>
            <span>{passportId ? `No. ${passportId}` : "Unassigned"}</span>
          </div>
          <div className="mt-1 h-px w-full bg-[#22415A]" />
        </div>
      </div>

      {/* Passport card, overlapping the band */}
      <div className="mx-auto -mt-16 max-w-3xl px-6">
        <div className="rounded-3xl border border-[#E4DDC9] bg-white p-8 shadow-[0_20px_50px_-25px_rgba(15,42,62,0.4)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-[#0F2A3E] bg-[#F1EDE0]">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-3xl text-[#0F2A3E]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </div>
              <div>
                <h1
                  className="text-3xl leading-tight text-[#0F2A3E]"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                >
                  {name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#0F2A3E] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white">
                    {role}
                  </span>
                  {gender && (
                    <span className="rounded-full border border-[#E4DDC9] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#6b6455]">
                      {gender}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-mono text-xs text-[#8a7d55]">
                  Issued {formatDate(createdAt)}
                </p>
              </div>
            </div>
            <Seal verified={isVerified} />
          </div>
        </div>

        {/* Bio data */}
        <div className="mt-8 rounded-3xl border border-[#E4DDC9] bg-white p-8">
          <SectionLabel>Bio Data</SectionLabel>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8a7d55]">
                Email
              </dt>
              <dd className="mt-1 text-sm text-[#23282B]">{email || "—"}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8a7d55]">
                WhatsApp
              </dt>
              <dd className="mt-1 text-sm text-[#23282B]">{whatsapp || "—"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8a7d55]">
                Address
              </dt>
              <dd className="mt-1 text-sm text-[#23282B]">{address || "—"}</dd>
            </div>
            {indicativeSalary?.amount ? (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8a7d55]">
                  Indicative Salary
                </dt>
                <dd className="mt-1 text-sm text-[#23282B]">
                  <span className="rounded-md bg-[#F1EDE0] px-2 py-0.5 font-mono text-[#0F2A3E]">
                    {indicativeSalary.currency}
                  </span>{" "}
                  {indicativeSalary.amount.toLocaleString()}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-8 rounded-3xl border border-[#E4DDC9] bg-white p-8">
            <SectionLabel>Skills</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[#145C67]/30 bg-[#145C67]/5 px-3 py-1.5 text-sm text-[#145C67]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mt-8 rounded-3xl border border-[#E4DDC9] bg-white p-8">
            <SectionLabel>Languages</SectionLabel>
            <div className="space-y-4">
              {languages.map((l, i) => (
                <div key={i}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-[#23282B]">{l.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8a7d55]">
                      {l.level}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F1EDE0]">
                    <div
                      className="h-full rounded-full bg-[#C9A227]"
                      style={{ width: LEVEL_WIDTH[l.level] || "50%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mt-8 rounded-3xl border border-[#E4DDC9] bg-white p-8">
            <SectionLabel>Experience</SectionLabel>
            <div className="space-y-6 border-l border-[#E4DDC9] pl-6">
              {experience.map((e, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#0F2A3E] bg-[#FAF6ED]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-base font-medium text-[#23282B]">
                      {e.role}
                      {e.company ? (
                        <span className="text-[#8a7d55]"> · {e.company}</span>
                      ) : null}
                    </h3>
                    {e.duration && (
                      <span className="font-mono text-[11px] text-[#8a7d55]">
                        {e.duration}
                      </span>
                    )}
                  </div>
                  {e.description && (
                    <p className="mt-1 text-sm leading-relaxed text-[#6b6455]">
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mt-8 rounded-3xl border border-[#E4DDC9] bg-white p-8">
            <SectionLabel>Certifications</SectionLabel>
            <div className="flex flex-wrap gap-3">
              {certifications.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl border border-dashed border-[#C9A227] bg-[#FDF9EE] px-3 py-2 text-sm text-[#8a6d13]"
                >
                  <span className="font-mono text-[10px]">✓</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {videoUrl && (
          <div className="mt-8 rounded-3xl border border-[#E4DDC9] bg-white p-8">
            <SectionLabel>Introduction Video</SectionLabel>
            <video
              src={videoUrl}
              controls
              className="w-full rounded-xl border border-[#E4DDC9]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
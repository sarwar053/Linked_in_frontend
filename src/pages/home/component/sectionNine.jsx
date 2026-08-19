import { useEffect, useState } from "react";
import { getAllUsers } from "../../../api/user.js"; 

function SectionNine() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null); // { name, videoUrl } | null

  useEffect(() => {
    let isMounted = true;

    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllUsers();
        if (isMounted) setUsers(data || []);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  // Lock body scroll while the video modal is open, and allow Esc to close it
  useEffect(() => {
    if (!activeVideo) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeVideo]);

  return (
    <section className="container-page py-20">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="max-w-2xl ">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Employer Tools
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Built for hiring teams, not just job boards.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Skillavy gives recruiters and operations teams a real workflow:
              shortlists, team notes, video review, and concierge mobility.
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            <li className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true">
                <circle cx={12} cy={12} r={10} />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div>
                <p className="font-semibold text-navy">Smart search</p>
                <p className="text-sm text-muted-foreground">
                  Filter by trade, certifications, languages, location, and availability.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true">
                <circle cx={12} cy={12} r={10} />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div>
                <p className="font-semibold text-navy">Shortlists &amp; notes</p>
                <p className="text-sm text-muted-foreground">
                  Collaborate with your team — share, comment, rate.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true">
                <circle cx={12} cy={12} r={10} />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div>
                <p className="font-semibold text-navy">Video review workspace</p>
                <p className="text-sm text-muted-foreground">
                  Watch intros and skills videos side-by-side.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true">
                <circle cx={12} cy={12} r={10} />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div>
                <p className="font-semibold text-navy">Verified contracts</p>
                <p className="text-sm text-muted-foreground">
                  Templates aligned with destination-country requirements.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true">
                <circle cx={12} cy={12} r={10} />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div>
                <p className="font-semibold text-navy">Mobility concierge</p>
                <p className="text-sm text-muted-foreground">
                  Optional end-to-end deployment support.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="card-surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-secondary px-5 py-3 text-sm">
            <div className="flex items-center gap-2 text-navy">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4 text-primary" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx={9} cy={7} r={4} />
              </svg>
              <span className="font-semibold">Verified Talent Pool</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {loading ? "…" : `${users.length} candidates`}
            </span>
          </div>

          <div className="divide-y divide-border max-h-[420px] overflow-y-auto">
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-20 animate-pulse bg-secondary/40 p-4" />
              ))}

            {!loading && error && (
              <p className="p-4 text-sm text-destructive">
                Couldn&apos;t load candidates: {error}
              </p>
            )}

            {!loading && !error && users.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">
                No candidates found.
              </p>
            )}

            {!loading &&
              !error &&
              users.slice(0, 7)
                .filter((u) => u.role === "worker")
                .map((user) => {
                  const trade = user.skills?.[0]?.name || user.skills?.[0] || "Skilled Worker";
                  return (
                    <div
                      key={user._id}
                      className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4"
                    >
                      <img
                        alt={user.name}
                        loading="lazy"
                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                        src={user.photoUrl || "/assets/hero-welder-BWyaSbx6.jpg"}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-navy capitalize">
                          {user.name} ·{" "}
                          <span className="font-normal text-muted-foreground">
                            {trade}
                          </span>
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          {user.isVerified && (
                            <span className="badge-verified">
                              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check h-3 w-3" aria-hidden="true">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                <path d="m9 12 2 2 4-4" />
                              </svg>{" "}
                              Verified
                            </span>
                          )}
                          {user.address && (
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground capitalize">
                              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-3 w-3" aria-hidden="true">
                                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                <circle cx={12} cy={10} r={3} />
                              </svg>{" "}
                              {user.address}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-secondary text-xs disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!user.videoUrl}
                        onClick={() =>
                          setActiveVideo({ name: user.name, videoUrl: user.videoUrl })
                        }
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play h-3 w-3 fill-current text-primary" aria-hidden="true">
                          <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                        </svg>{" "}
                        Watch
                      </button>
                    </div>
                  );
                })}
          </div>

          <div className="flex items-center justify-between border-t border-border bg-secondary/60 px-5 py-3 text-xs text-muted-foreground">
            <span>Live from verified talent passports</span>
            <span className="inline-flex items-center gap-1 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column h-3 w-3" aria-hidden="true">
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M18 17V9" />
                <path d="M13 17V5" />
                <path d="M8 17v-3" />
              </svg>{" "}
              Updated live
            </span>
          </div>
        </div>
      </div>

      {/* Video modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-navy px-4 py-3 text-sm text-white">
              <span className="font-semibold capitalize">{activeVideo.name}'s intro video</span>
              <button
                type="button"
                aria-label="Close video"
                onClick={() => setActiveVideo(null)}
                className="rounded-md p-1 hover:bg-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <video
              src={activeVideo.videoUrl}
              controls
              autoPlay
              className="max-h-[70vh] w-full bg-black"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}

export default SectionNine;
import { useEffect, useRef, useState } from "react";
import { getAllUsers } from "../../../api/user";
import { Link } from "react-router-dom";

function SectionTwo() {
  const [playing, setPlaying] = useState(false);
  const [timeLabel, setTimeLabel] = useState("1:48");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const videoRef = useRef(null);

  function handlePlay(e) {
    e.preventDefault();
    setPlaying(true);
    videoRef.current?.play();
  }

  function handleTimeUpdate() {
    const vid = videoRef.current;
    if (!vid) return;
    const remaining = vid.duration - vid.currentTime;
    if (isFinite(remaining)) {
      const m = Math.floor(remaining / 60);
      const s = Math.floor(remaining % 60).toString().padStart(2, "0");
      setTimeLabel(`${m}:${s}`);
    }
  }

  function handleEnded() {
    setPlaying(false);
    setTimeLabel("1:48");
    if (videoRef.current) videoRef.current.currentTime = 0;
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);


  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;


  const getThumbnail = (videoUrl) => {
    if (!videoUrl) return "https://via.placeholder.com/400x500?text=No+Video";

    // 1. Replace the file extension (.mp4, .mov, etc) with .jpg
    // 2. Insert 'so_auto' to pick a good frame automatically
    return videoUrl.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/so_auto,f_auto,q_auto/");
  };

  return (
    <>
      {users.slice(0, 6).map((user) => (

        <section className="container-page py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl ">
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Featured Verified Talent
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Watch them work. Then hire them.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Every featured profile includes a mandatory introduction video and
                skills demonstration videos reviewed by Proofax.
              </p>
            </div>
            <a href="/browse" className="btn-secondary text-sm">
              All verified talent{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right h-4 w-4"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* article here */}
            <article className="group relative overflow-hidden rounded-2xl bg-navy shadow-elevated ring-1 ring-border transition-all duration-500 hover:-translate-y-1 hover:shadow-glow hover:ring-primary/40">
              <div
                className="relative block aspect-6/7 w-full overflow-hidden cursor-pointer"
                onClick={!playing ? handlePlay : undefined}
                role="button"
                aria-label="Play skills video — Samuel Tetteh"
              >
                {/* Thumbnail */}
                {!playing && (
                  <img
                    src={getThumbnail(user.videoUrl)}
                    alt="Samuel Tetteh — Class A Commercial Driver on the job"
                    loading="lazy"
                    className="h-full w-full scale-105 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                )}

                {/* Video */}
                <video
                  ref={videoRef}
                  src={user.videoUrl}
                  preload="none"
                  playsInline
                  controls={playing}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleEnded}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                />

                {/* Overlays */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-navy/5" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/55 via-transparent to-transparent" />

                {/* Top badges */}
                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3.5 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 text-[11px] font-bold text-navy shadow-md backdrop-blur">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-success" aria-hidden="true">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    Proofax Verified
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-gold px-2 py-1 text-[11px] font-extrabold text-navy shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 fill-current" aria-hidden="true">
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                    97
                  </span>
                </div>

                {/* Skills Video badge */}
                <span className="absolute left-3.5 top-12 z-10 inline-flex items-center gap-1.5 rounded-md bg-destructive/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  Skills Video
                </span>

                {/* Duration */}
                <span className="absolute right-3.5 top-12 z-10 rounded-md bg-navy/85 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                  {timeLabel}
                </span>

                {/* Play button */}
                {!playing && (
                  <div className="absolute inset-0 z-10 grid place-items-center">
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-white/95 text-primary shadow-2xl ring-4 ring-white/25 backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:ring-white/50">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9 translate-x-[2px] fill-current" aria-hidden="true">
                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="absolute inset-x-3.5 bottom-24 z-10 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white ring-1 ring-white/25 backdrop-blur">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true">
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    Interview Ready
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white ring-1 ring-white/25 backdrop-blur">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    {user.experience && user.experience.map((exp)=>{
                      return (
                        <span>{exp.duration}</span>
                      )
                    }) }
                  </span>
                </div>
              </div>

              {/* Card footer */}
              <div className="bg-navy px-4 pb-4 pt-3 text-white">

                <Link to={`/user/${user._id}`}
                  className="group/name inline-flex items-center gap-1 text-base font-bold leading-tight text-white transition-colors hover:text-gold"
                >
                  <span className="underline-offset-4 group-hover/name:underline">
                    {user.name}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 opacity-70 transition-transform group-hover/name:translate-x-0.5 group-hover/name:-translate-y-0.5 group-hover/name:opacity-100" aria-hidden="true">
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </Link>
                <p className="mt-0.5 truncate text-sm font-medium text-white/80">
                  {user.skills && user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </p>
              
              </div>
            </article>

          </div>
        </section>

      ))}

    </>
  );
}

export default SectionTwo;
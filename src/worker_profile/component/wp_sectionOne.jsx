import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Wp_sectionOne({user}) {

  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);

   const getThumbnail = (videoUrl) => {
    if (!videoUrl) return "https://via.placeholder.com/400x500?text=No+Video";

    // 1. Replace the file extension (.mp4, .mov, etc) with .jpg
    // 2. Insert 'so_auto' to pick a good frame automatically
    return videoUrl.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/so_auto,f_auto,q_auto/");
  };


  const handleRequestInterview = () => {
    navigate(`/request_interview/${user._id}`);
  };

  return (
    <>
    <section className="relative overflow-hidden bg-navy text-white">
  <div className="absolute inset-0 z-0 opacity-40">
    <img
      alt=""
      className="h-full w-full object-cover blur-3xl scale-110"
      src="/assets/worker-operator-00zs3UGG.jpg"
    />
    <div className="absolute inset-0 bg-navy/70" />
  </div>
  <div className="container-page relative py-8 lg:py-12">
    <a
      href="/browse"
      className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
    >
      ← Back to all talent
    </a>
    <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1.55fr_1fr]">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
      {isPlaying ? (
        /* The Actual Video Player */
        <video
          src={user.videoUrl} 
          className="h-full w-full object-cover"
          controls
          autoPlay
        />
      ) : (
        /* The Preview UI (Your Original Code) */
        <>
          <img
            alt="Yaw Darko"
            className="h-full w-full object-cover"
            src={getThumbnail(user.videoUrl)}
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
            <span className="inline-flex items-center gap-2 rounded-md bg-destructive px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />{" "}
              Intro Video · 2:21
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 px-3 py-1.5 text-xs font-bold text-navy shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check h-4 w-4 text-success" aria-hidden="true">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>{" "}
              Proofax Verified
            </span>
          </div>

          {/* Play Button - Now triggers state */}
          <button 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 m-auto grid h-28 w-28 place-items-center rounded-full bg-white text-primary shadow-2xl ring-8 ring-white/20 transition hover:scale-110 hover:ring-white/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play h-12 w-12 translate-x-0.75 fill-current" aria-hidden="true">
              <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
            </svg>
          </button>

          {/* Bottom Text */}
          <div className="absolute inset-x-0 bottom-0 p-6 text-white pointer-events-none">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Now playing
            </p>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Yaw Darko</h1>
            <p className="text-lg text-white/85">Heavy Equipment Operator</p>
          </div>
        </>
      )}
    </div>
      <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-2.5 py-1 text-xs font-semibold text-success">
            ● Available in 2 weeks
          </span>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/60">
          Proofax Trust Score
        </p>
        <div className="mt-1 flex items-end gap-2">
          <span className="text-6xl font-black text-gold">95</span>
          <span className="mb-2 text-sm text-white/70">/ 100</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-linear-to-r from-success to-gold"
            style={{ width: "95%" }}
          />
        </div>
        <p className="mt-2 text-xs text-white/70">
          Independently verified by Proofax across 6 checkpoints.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div>
            
            
          </div>
          <div>
            <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white/60">
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
                className="lucide lucide-briefcase h-3 w-3"
                aria-hidden="true"
              >
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <rect width={20} height={14} x={2} y={6} rx={2} />
              </svg>{" "}
              Experience
            </p>
            <p className="mt-0.5 text-sm font-semibold text-white">{user.experience.duration || "new"}</p>
          </div>
          <div>
            <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white/60">
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
                className="lucide lucide-award h-3 w-3"
                aria-hidden="true"
              >
                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                <circle cx={12} cy={8} r={6} />
              </svg>{" "}
              Certified
            </p>
            <p className="mt-0.5 text-sm font-semibold text-white">3 creds</p>
          </div>
          <div>
            <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white/60">
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
                className="lucide lucide-calendar h-3 w-3"
                aria-hidden="true"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width={18} height={18} x={3} y={4} rx={2} />
                <path d="M3 10h18" />
              </svg>{" "}
              Indicative
            </p>
            <p className="mt-0.5 text-sm font-semibold text-white">
             {user.indicativeSalary?.currency} {user.indicativeSalary?.amount}
            </p>
          </div>
        </div>
        
        <div className="mt-5 flex flex-col gap-2">
          <button
          onClick={handleRequestInterview}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-hover"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase h-4 w-4" aria-hidden="true">
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width={20} height={14} x={2} y={6} rx={2} />
          </svg>{" "}
          Request interview
        </button>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Wp_sectionOne

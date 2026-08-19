import bacgroudVideo from "../../../assets/backgroud_video.mp4"

function SectionOne() {
  return (
    <section className="relative overflow-hidden text-white">
  <div className="absolute inset-0 -z-10">
    <video
      autoPlay
      loop
      muted
      playsInline
      poster="/assets/hero-welder-BWyaSbx6.jpg"
      className="h-full w-full object-cover"
    >
      <source src={bacgroudVideo} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-linear-to-r from-navy/95 via-navy/75 to-navy/40" />
    <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/30 to-transparent" />
  </div>
  <div className="container-page grid items-center gap-12 py-24 lg:grid-cols-[1.15fr_1fr] lg:py-32">
    <div>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        Video-first · Proofax verified
      </span>
      <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
        Verified Ghanaian Talent.
        <span className="mt-2 block bg-linear-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
          Global Opportunities.
        </span>
      </h1>
      <p className="mt-6 max-w-xl text-xl font-medium text-white/85 sm:text-2xl">
        Don't read résumés. <span className="text-white">Watch them work.</span>
      </p>
      <p className="mt-3 max-w-xl text-base text-white/70">
        Every profile includes real skills videos — see welders weld, caregivers
        care, operators operate. Then hire with confidence.
      </p>
      <div className="mt-9 flex flex-wrap gap-4">
        <a
          href="/browse"
          className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-base font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-hover sm:text-lg"
        >
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
            className="lucide lucide-search h-5 w-5"
            aria-hidden="true"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx={11} cy={11} r={8} />
          </svg>{" "}
          Browse Verified Talent
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
            className="lucide lucide-arrow-right h-5 w-5 transition group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
        <a
          href="/post-job"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-navy sm:text-lg"
        >
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
            className="lucide lucide-briefcase h-5 w-5"
            aria-hidden="true"
          >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width={20} height={14} x={2} y={6} rx={2} />
          </svg>{" "}
          Post a Job
        </a>
      </div>
      <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6">
        <div>
          <dt className="text-2xl font-bold text-white">1,600+</dt>
          <dd className="text-xs uppercase tracking-wider text-white/65">
            Verified workers
          </dd>
        </div>
        <div>
          <dt className="text-2xl font-bold text-white">42</dt>
          <dd className="text-xs uppercase tracking-wider text-white/65">
            Countries hiring
          </dd>
        </div>
        <div>
          <dt className="text-2xl font-bold text-white">98%</dt>
          <dd className="text-xs uppercase tracking-wider text-white/65">
            Avg. Trust Score
          </dd>
        </div>
      </dl>
    </div>
    <div className="relative">
      <div className="absolute -inset-8 -z-10 rounded-4xl bg-linear-to-br from-primary/40 via-gold/20 to-transparent blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-navy/40 shadow-glow backdrop-blur-sm">
        
      </div>
      
    </div>
  </div>
  <div className="border-t border-white/10 bg-white/5 backdrop-blur">
    <div className="container-page flex flex-wrap items-center justify-between gap-6 py-5 text-xs uppercase tracking-[0.2em] text-white/55">
      <span>Hiring employers from</span>
      <span className="font-semibold text-white/80">Canada</span>
      <span className="font-semibold text-white/80">Australia</span>
      <span className="font-semibold text-white/80">United Kingdom</span>
      <span className="font-semibold text-white/80">Germany</span>
      <span className="font-semibold text-white/80">UAE</span>
      <span className="font-semibold text-white/80">Saudi Arabia</span>
      <span className="font-semibold text-white/80">Qatar</span>
    </div>
  </div>
</section>

  )
}

export default SectionOne


function SectionThirteen() {
  return (
    <section className="container-page py-20">
  <div className="overflow-hidden rounded-3xl bg-linear-to-br from-primary to-[oklch(0.40_0.20_260)] p-10 text-white shadow-glow sm:p-14">
    <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Hire verified Ghanaian talent. Or get hired globally.
        </h2>
        <p className="mt-3 max-w-xl text-white/85">
          Skillavy is the video-first marketplace built on Proofax verification.
          Start in minutes.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 lg:justify-end">
        <a
          href="/post-job"
          className="btn-primary bg-white text-primary hover:bg-white/90"
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
            className="lucide lucide-briefcase h-4 w-4"
            aria-hidden="true"
          >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width={20} height={14} x={2} y={6} rx={2} />
          </svg>{" "}
          Post a Job
        </a>
        <a
          href="/workers"
          className="btn-secondary bg-transparent text-white hover:bg-white/10"
        >
          Join as a worker
        </a>
      </div>
    </div>
  </div>
</section>

  )
}

export default SectionThirteen

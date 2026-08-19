

function SectionEight() {
  return (
   <section className="bg-surface py-20">
  <div className="container-page">
    <div className="max-w-2xl text-center mx-auto">
      <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
        How It Works
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        Simple flows. Serious verification.
      </h2>
    </div>
    <div className="mt-12 grid gap-8 lg:grid-cols-2">
      <div className="card-surface p-8">
        <h3 className="text-xl font-bold text-navy">For Workers</h3>
        <ol className="mt-6 space-y-5">
          <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
              1
            </span>
            <div>
              <p className="font-semibold text-navy">Create your profile</p>
              <p className="text-sm text-muted-foreground">
                Add your trade, experience, and certifications.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
              2
            </span>
            <div>
              <p className="font-semibold text-navy">Record your videos</p>
              <p className="text-sm text-muted-foreground">
                A 60-sec intro plus skills demonstrations.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
              3
            </span>
            <div>
              <p className="font-semibold text-navy">Proofax review</p>
              <p className="text-sm text-muted-foreground">
                Verified manually within 5–7 business days.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
              4
            </span>
            <div>
              <p className="font-semibold text-navy">Get hired globally</p>
              <p className="text-sm text-muted-foreground">
                Receive interview requests and contracts.
              </p>
            </div>
          </li>
        </ol>
      </div>
      <div className="card-surface p-8">
        <h3 className="text-xl font-bold text-navy">For Employers</h3>
        <ol className="mt-6 space-y-5">
          <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
              1
            </span>
            <div>
              <p className="font-semibold text-navy">Search &amp; filter</p>
              <p className="text-sm text-muted-foreground">
                Browse verified workers by trade, location, certifications.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
              2
            </span>
            <div>
              <p className="font-semibold text-navy">
                Watch real skills videos
              </p>
              <p className="text-sm text-muted-foreground">
                Assess ability before any call.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
              3
            </span>
            <div>
              <p className="font-semibold text-navy">
                Shortlist &amp; interview
              </p>
              <p className="text-sm text-muted-foreground">
                Built-in shortlists, notes, and team sharing.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
              4
            </span>
            <div>
              <p className="font-semibold text-navy">
                Hire with concierge support
              </p>
              <p className="text-sm text-muted-foreground">
                Optional mobility, visa, and arrival support.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
    <div className="mt-10 text-center">
      <a href="/how-it-works" className="btn-secondary">
        See the full process{" "}
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
  </div>
</section>

  )
}

export default SectionEight

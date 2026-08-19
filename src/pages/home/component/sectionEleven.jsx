

function SectionEleven() {
  return (
    <section className="container-page py-20">
  <div className="max-w-2xl text-center mx-auto">
    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
      Pricing
    </span>
    <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
      Transparent pricing for global hiring teams.
    </h2>
  </div>
  <div className="mt-12 grid gap-6 lg:grid-cols-3">
    <div className="card-surface flex flex-col p-7 ">
      <h3 className="text-lg font-semibold text-navy">Explore</h3>
      <p className="mt-2 text-3xl font-bold text-navy">Free</p>
      <p className="mt-3 text-sm text-muted-foreground">
        Search and watch any verified profile. Save shortlists.
      </p>
      <a href="/pricing" className="mt-6 btn-secondary">
        Get started
      </a>
    </div>
    <div className="card-surface flex flex-col p-7 border-2 border-[#0066cc] ring-2 ring-[#0066cc] ring-opacity-0 transition-all duration-300 hover:ring-opacity-100 hover:border-[#0066cc]/50">
      <span className="mb-2 inline-flex w-fit rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
        Most popular
      </span>
      <h3 className="text-lg font-semibold text-navy">Hire</h3>
      <p className="mt-2 text-3xl font-bold text-navy">$299/mo</p>
      <p className="mt-3 text-sm text-muted-foreground">
        Unlock direct contact, shortlist sharing, and contract templates.
      </p>
      <a href="/pricing" className="mt-6 btn-primary">
        Start hiring
      </a>
    </div>
    <div className="card-surface flex flex-col p-7 ">
      <h3 className="text-lg font-semibold text-navy">Enterprise</h3>
      <p className="mt-2 text-3xl font-bold text-navy">Custom</p>
      <p className="mt-3 text-sm text-muted-foreground">
        Bulk placements, dedicated recruiter, mobility concierge.
      </p>
      <a href="/pricing" className="mt-6 btn-secondary">
        Talk to sales
      </a>
    </div>
  </div>
</section>

  )
}

export default SectionEleven

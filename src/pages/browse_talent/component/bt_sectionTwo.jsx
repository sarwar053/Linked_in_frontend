const CATEGORIES = [
  "All categories",
  "Heavy Equipment",
  "Welders & Fabricators",
  "Caregivers & Nurses",
  "Electricians",
  "Drivers",
  "Mechanics",
  "Carpenters",
  "Plumbers",
  "Forklift Operators",
  "HVAC Technicians",
];

const CITIES = ["Accra", "Kumasi", "Tema", "Takoradi"];

function TalentCard({ talent }) {
  const title =
    talent.experience?.[0]?.role || talent.skills?.[0] || "Verified Worker";

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-navy shadow-elevated ring-1 ring-border transition-all duration-500 hover:-translate-y-1 hover:shadow-glow hover:ring-primary/40">
      <a
        aria-label={`View profile — ${talent.name}`}
        href={`/user/${talent._id}`}
        className="relative block aspect-[9/14] w-full overflow-hidden"
      >
        <img
          alt={`${talent.name} — ${title}`}
          loading="lazy"
          className="h-full w-full scale-105 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          src={talent.photoUrl || "/assets/placeholder-avatar.jpg"}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-navy/5" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/55 via-transparent to-transparent" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3.5">
          {talent.isVerified && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 text-[11px] font-bold text-navy shadow-md backdrop-blur">
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
                className="lucide lucide-shield-check h-3.5 w-3.5 text-success"
                aria-hidden="true"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>{" "}
              Proofax Verified
            </span>
          )}
        </div>

        {talent.videoUrl && (
          <>
            <span className="absolute left-3.5 top-12 inline-flex items-center gap-1.5 rounded-md bg-destructive/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />{" "}
              Skills Video
            </span>
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-white/95 text-primary shadow-2xl ring-4 ring-white/25 backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:ring-white/50">
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
                  className="lucide lucide-play h-9 w-9 translate-x-[2px] fill-current"
                  aria-hidden="true"
                >
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
              </div>
            </div>
          </>
        )}

        {talent.skills?.length > 0 && (
          <div className="absolute inset-x-3.5 bottom-24 flex flex-wrap gap-1.5">
            {talent.skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white ring-1 ring-white/25 backdrop-blur"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </a>
      <div className="bg-navy px-4 pb-4 pt-3 text-white">
        <a
          title="View Full Profile"
          href={`/user/${talent._id}`}
          className="group/name inline-flex items-center gap-1 text-base font-bold leading-tight text-white transition-colors hover:text-gold"
        >
          <span className="underline-offset-4 group-hover/name:underline">
            {talent.name}
          </span>
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
            className="lucide lucide-arrow-up-right h-4 w-4 shrink-0 opacity-70 transition-transform group-hover/name:translate-x-0.5 group-hover/name:-translate-y-0.5 group-hover/name:opacity-100"
            aria-hidden="true"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
        <p className="mt-0.5 truncate text-sm font-medium text-white/80">
          {title}
        </p>
        {talent.address && (
          <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-white/65">
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
              className="lucide lucide-map-pin h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx={12} cy={10} r={3} />
            </svg>{" "}
            {talent.address}
          </p>
        )}
      </div>
    </article>
  );
}

function Bt_sectionTwo({
  talents,
  loading,
  error,
  pagination,
  categoryCounts,
  category,
  onCategoryChange,
  locations,
  onLocationToggle,
  sort,
  onSortChange,
  onPageChange,
}) {
  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-[280px_1fr] lg:py-14">
      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center justify-between">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-navy">
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
              className="lucide lucide-sliders-horizontal h-4 w-4"
              aria-hidden="true"
            >
              <path d="M10 5H3" />
              <path d="M12 19H3" />
              <path d="M14 3v4" />
              <path d="M16 17v4" />
              <path d="M21 12h-9" />
              <path d="M21 19h-5" />
              <path d="M21 5h-7" />
              <path d="M8 10v4" />
              <path d="M8 12H3" />
            </svg>{" "}
            Filters
          </p>
        </div>

        <div className="rounded-xl border border-border bg-white p-4 shadow-card">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Category
          </p>
          <div className="space-y-0.5">
            {CATEGORIES.map((cat) => {
              const isActive = cat === category;
              const count =
                cat === "All categories"
                  ? categoryCounts["all categories"] ?? 0
                  : categoryCounts[cat.toLowerCase()] ?? 0;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                    isActive
                      ? "bg-primary text-white font-semibold shadow-sm"
                      : "text-navy hover:bg-secondary"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`ml-auto text-xs ${
                      isActive ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-4 shadow-card">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Location
          </p>
          <div className="space-y-0.5">
            {CITIES.map((city) => (
              <label
                key={city}
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-secondary"
              >
                <input
                  className="rounded border-input accent-primary"
                  type="checkbox"
                  checked={locations.includes(city)}
                  onChange={() => onLocationToggle(city)}
                />{" "}
                {city}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-accent p-4">
          <div className="flex items-center gap-2 text-primary">
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
              className="lucide lucide-shield-check h-4 w-4"
              aria-hidden="true"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider">
              Proofax-only
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-navy">
            Every result here has passed identity, certification, reference, and
            police clearance checks.
          </p>
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
          <div>
            <p className="text-2xl font-bold text-navy">
              {loading ? "Loading…" : `${pagination?.total ?? 0} verified profiles`}
            </p>
            <p className="text-sm text-muted-foreground">
              Press play on any card to watch the skills video.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="rounded-lg border border-input bg-white px-3 py-2 text-sm font-medium text-navy"
            >
              <option value="recent">Newest</option>
              <option value="experience">Most experienced</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {!error && !loading && talents.length === 0 && (
          <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-muted-foreground">
            No profiles match your filters yet. Try widening your search.
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {talents.map((talent) => (
            <TalentCard key={talent._id} talent={talent} />
          ))}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() => onPageChange(pagination.page - 1)}
              className="rounded-lg border border-input px-3 py-2 text-sm font-medium text-navy disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
              className="rounded-lg border border-input px-3 py-2 text-sm font-medium text-navy disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-border bg-gradient-to-br from-accent via-white to-accent p-8 text-center">
          <h3 className="text-2xl font-bold text-navy">
            Can't find the exact skill?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Tell our concierge what you need. We'll source and shortlist verified
            candidates with skills videos within 72 hours.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a href="/post-job" className="btn-primary">
              Post a job
            </a>
            <a href="/contact" className="btn-secondary">
              Talk to concierge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bt_sectionTwo;
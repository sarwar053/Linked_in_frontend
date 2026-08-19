function Bt_sectionOne({ searchInput, onSearchInputChange, onSearchSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_-10%,oklch(0.52_0.18_254/0.4),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_-10%_110%,oklch(0.74_0.13_78/0.25),transparent_60%)]" />
      </div>
      <div className="container-page relative py-14 lg:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
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
            className="lucide lucide-video h-3.5 w-3.5 text-gold"
            aria-hidden="true"
          >
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
            <rect x={2} y={6} width={14} height={12} rx={2} />
          </svg>{" "}
          Video-first discovery
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Watch them work.
          <span className="block bg-linear-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
            Then hire them.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80">
          Every profile below is Proofax-verified with a real skills video. Press
          play, see capability — before any interview.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
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
              className="lucide lucide-search pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx={11} cy={11} r={8} />
            </svg>
            <input
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
              placeholder="Search trade, skill, name, or city (e.g. welder, caregiver, Tema)"
              className="w-full rounded-xl border border-white/20 bg-white/95 pl-12 pr-4 py-4 text-base text-navy shadow-elevated placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-hover"
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
            Find talent
          </button>
        </form>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
          <span className="inline-flex items-center gap-1.5">
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
              className="lucide lucide-shield-check h-4 w-4 text-success"
              aria-hidden="true"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>{" "}
            Proofax-verified only
          </span>
        </div>
      </div>
    </section>
  );
}

export default Bt_sectionOne;
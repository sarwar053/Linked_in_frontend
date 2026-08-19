

function Hiw_sectionThree() {
  return (
   <section className="bg-surface py-16">
  <div className="container-page">
    <div className="max-w-2xl ">
      <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
        Employer Flow
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        How employers hire on Skillavy.
      </h2>
    </div>
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="card-surface relative p-6">
        <span className="absolute right-5 top-5 text-5xl font-extrabold text-accent">
          1
        </span>
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-primary">
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
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-navy">Post a job</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us the role, location, certifications, and timing.
        </p>
      </div>
      <div className="card-surface relative p-6">
        <span className="absolute right-5 top-5 text-5xl font-extrabold text-accent">
          2
        </span>
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-primary">
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
            className="lucide lucide-users h-5 w-5"
            aria-hidden="true"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <path d="M16 3.128a4 4 0 0 1 0 7.744" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <circle cx={9} cy={7} r={4} />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-navy">
          Receive a shortlist
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Curated within 72 hours by a Skillavy recruiter.
        </p>
      </div>
      <div className="card-surface relative p-6">
        <span className="absolute right-5 top-5 text-5xl font-extrabold text-accent">
          3
        </span>
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-primary">
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
            className="lucide lucide-camera h-5 w-5"
            aria-hidden="true"
          >
            <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
            <circle cx={12} cy={13} r={3} />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-navy">
          Watch skills videos
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Assess ability before scheduling an interview.
        </p>
      </div>
      <div className="card-surface relative p-6">
        <span className="absolute right-5 top-5 text-5xl font-extrabold text-accent">
          4
        </span>
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-primary">
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
            className="lucide lucide-plane h-5 w-5"
            aria-hidden="true"
          >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-navy">
          Hire &amp; deploy
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign contract; optional mobility concierge handles deployment.
        </p>
      </div>
    </div>
  </div>
</section>

  )
}

export default Hiw_sectionThree

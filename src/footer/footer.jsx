

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-navy text-white/85">
  <div className="container-page grid gap-10 py-14 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr]">
    <div className="md:col-span-3 lg:col-span-2">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-bold text-white">
          S
        </span>
        <span className="text-lg font-bold text-white">Skillavy</span>
      </div>
      <p className="mt-3 max-w-sm text-sm text-white/70">
        Verified Ghanaian Talent. Global Opportunities.
      </p>
      <p className="mt-1 max-w-sm text-sm font-medium text-primary">
        Powered by Proofax.
      </p>
      <div className="mt-5 space-y-2 text-sm">
        <span className="flex items-center gap-2 text-white/70">
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
            className="lucide lucide-map-pin h-4 w-4 text-success shrink-0"
            aria-hidden="true"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx={12} cy={10} r={3} />
          </svg>{" "}
          Accra, Ghana
        </span>
        <a
          href="https://wa.me/233241450347"
          className="flex items-center gap-2 hover:text-white transition-colors"
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
            className="lucide lucide-message-circle h-4 w-4 text-success shrink-0"
            aria-hidden="true"
          >
            <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
          </svg>{" "}
          WhatsApp: +233 24 145 0347
        </a>
        <a
          href="mailto:hello@skillavy.com"
          className="flex items-center gap-2 hover:text-white transition-colors"
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
            className="lucide lucide-mail h-4 w-4 text-success shrink-0"
            aria-hidden="true"
          >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x={2} y={4} width={20} height={16} rx={2} />
          </svg>{" "}
          hello@skillavy.com
        </a>
        <span className="flex items-center gap-2 text-white/70">
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
            className="lucide lucide-globe h-4 w-4 text-success shrink-0"
            aria-hidden="true"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>{" "}
          Serving employers across Canada, Australia, Europe, the Gulf, and
          beyond.
        </span>
      </div>
    </div>
    <div>
      <h4 className="text-sm font-semibold text-white">Company</h4>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <a
            href="/about"
            className="text-white/70 transition hover:text-white"
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="/how-it-works"
            className="text-white/70 transition hover:text-white"
          >
            How It Works
          </a>
        </li>
        <li>
          <a
            href="/pricing"
            className="text-white/70 transition hover:text-white"
          >
            Pricing
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="text-white/70 transition hover:text-white"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h4 className="text-sm font-semibold text-white">For Employers</h4>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <a
            href="/browse"
            className="text-white/70 transition hover:text-white"
          >
            Browse Talent
          </a>
        </li>
        <li>
          <a
            href="/post-job"
            className="text-white/70 transition hover:text-white"
          >
            Post a Job
          </a>
        </li>
        <li>
          <a
            href="/employers"
            className="text-white/70 transition hover:text-white"
          >
            Why Skillavy
          </a>
        </li>
        <li>
          <a
            href="/employers"
            className="text-white/70 transition hover:text-white"
          >
            Workforce Mobility Support
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h4 className="text-sm font-semibold text-white">For Workers</h4>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <a
            href="/workers"
            className="text-white/70 transition hover:text-white"
          >
            Join Skillavy
          </a>
        </li>
        <li>
          <a
            href="/workers"
            className="text-white/70 transition hover:text-white"
          >
            Skills Passport
          </a>
        </li>
        <li>
          <a
            href="/how-it-works"
            className="text-white/70 transition hover:text-white"
          >
            Verification
          </a>
        </li>
        <li>
          <a
            href="/workers"
            className="text-white/70 transition hover:text-white"
          >
            Resources
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h4 className="text-sm font-semibold text-white">Solutions</h4>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <a
            href="/browse"
            className="text-white/70 transition hover:text-white"
          >
            Heavy Equipment Operators
          </a>
        </li>
        <li>
          <a
            href="/browse"
            className="text-white/70 transition hover:text-white"
          >
            Caregivers
          </a>
        </li>
        <li>
          <a
            href="/browse"
            className="text-white/70 transition hover:text-white"
          >
            Welders
          </a>
        </li>
        <li>
          <a
            href="/browse"
            className="text-white/70 transition hover:text-white"
          >
            Drivers
          </a>
        </li>
        <li>
          <a
            href="/browse"
            className="text-white/70 transition hover:text-white"
          >
            Electricians
          </a>
        </li>
        <li>
          <a
            href="/browse"
            className="text-white/70 transition hover:text-white"
          >
            Mechanics
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h4 className="text-sm font-semibold text-white">Powered by Proofax</h4>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <span className="text-white/70 cursor-default">
            Identity Verification
          </span>
        </li>
        <li>
          <span className="text-white/70 cursor-default">
            Employment Verification
          </span>
        </li>
        <li>
          <span className="text-white/70 cursor-default">
            Reference Verification
          </span>
        </li>
        <li>
          <span className="text-white/70 cursor-default">
            Credential Verification
          </span>
        </li>
        <li>
          <span className="text-white/70 cursor-default">
            Learn More About Proofax
          </span>
        </li>
      </ul>
    </div>
  </div>
  <div className="border-t border-white/10">
    <div className="container-page flex flex-col items-start justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
        <span>© 2026 Skillavy Ghana. All Rights Reserved.</span>
        <span className="hidden sm:inline text-white/30">|</span>
        <span>Skillavy Inc. · Denver, Colorado</span>
      </div>
      <span>
        Powered by <span className="font-semibold text-white/85">Proofax</span>
      </span>
    </div>
  </div>
</footer>

  )
}

export default Footer

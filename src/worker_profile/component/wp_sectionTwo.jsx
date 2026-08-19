
function Wp_sectionTwo({ user }) {
  return (
    <>
      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-navy">About Yaw</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground">
              Mining and civil works operator with documented hours on Cat, Komatsu,
              and Volvo fleets. Proven safety record on multinational mine sites.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="card-surface p-5">
                <h3 className="text-base font-bold text-navy">Skills</h3>
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {
                      user.skills.map((skill) => (
                        <span className="rounded-md bg-secondary px-2.5 py-1 text-sm font-medium text-navy">
                          {skill}
                        </span>
                      ))
                    }

                  </div>
                </div>
              </div>
              <div className="card-surface p-5">
                <h3 className="text-base font-bold text-navy">Certifications</h3>
                <div className="mt-3">
                  <ul className="space-y-2">
                    {
                      user.certifications.map((cert) => (
                        <li className="flex items-start gap-2 text-sm">
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
                            className="lucide lucide-file-badge mt-0.5 h-4 w-4 shrink-0 text-primary"
                            aria-hidden="true"
                          >
                            <path d="M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3" />
                            <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                            <path d="m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88" />
                            <circle cx={6} cy={14} r={3} />
                          </svg>{" "}
                          {cert}
                        </li>
                      ))
                    }


                  </ul>
                </div>
              </div>
              <div className="card-surface p-5">
                <h3 className="text-base font-bold text-navy">Languages</h3>
                <div className="mt-3">
                  <ul className="space-y-2">
                    {user.languages.map((lang) => (
                      <li className="flex items-center gap-2 text-sm">

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
                          className="lucide lucide-languages h-4 w-4 text-primary"
                          aria-hidden="true"
                        >
                          <path d="m5 8 6 6" />
                          <path d="m4 14 6-6 2-3" />
                          <path d="M2 5h12" />
                          <path d="M7 2h1" />
                          <path d="m22 22-5-10-5 10" />
                          <path d="M14 18h6" />
                        </svg>{" "}
                        {lang.name}
                      </li>
                    ))}

                  </ul>
                </div>
              </div>
            </div>
          </div>
          <aside className="card-surface h-fit p-6">
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
                className="lucide lucide-shield-check h-5 w-5"
                aria-hidden="true"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-sm font-bold uppercase tracking-wider">
                Why this worker
              </span>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
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
                  className="lucide lucide-circle-check mt-0.5 h-4 w-4 shrink-0 text-success"
                  aria-hidden="true"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="m9 12 2 2 4-4" />
                </svg>{" "}
                Mandatory intro video, reviewed by Proofax
              </li>
              <li className="flex items-start gap-2">
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
                  className="lucide lucide-circle-check mt-0.5 h-4 w-4 shrink-0 text-success"
                  aria-hidden="true"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="m9 12 2 2 4-4" />
                </svg>{" "}
                Multiple skills demonstration videos
              </li>
              <li className="flex items-start gap-2">
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
                  className="lucide lucide-circle-check mt-0.5 h-4 w-4 shrink-0 text-success"
                  aria-hidden="true"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="m9 12 2 2 4-4" />
                </svg>{" "}
                Identity, certifications, and police clearance verified
              </li>
              <li className="flex items-start gap-2">
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
                  className="lucide lucide-circle-check mt-0.5 h-4 w-4 shrink-0 text-success"
                  aria-hidden="true"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="m9 12 2 2 4-4" />
                </svg>{" "}
                Ready for international placement
              </li>
            </ul>
          </aside>
        </div>
      </section>

    </>
  )
}

export default Wp_sectionTwo

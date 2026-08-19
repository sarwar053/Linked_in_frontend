import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of terms" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "accounts", title: "3. Accounts and roles" },
  { id: "responsibilities", title: "4. Your responsibilities" },
  { id: "payments", title: "5. Payments and fees" },
  { id: "conduct", title: "6. Prohibited conduct" },
  { id: "content", title: "7. Content and intellectual property" },
  { id: "termination", title: "8. Suspension and termination" },
  { id: "disclaimers", title: "9. Disclaimers and limitation of liability" },
  { id: "disputes", title: "10. Disputes and governing law" },
  { id: "changes", title: "11. Changes to these terms" },
  { id: "contact", title: "12. Contact us" },
];

const LAST_UPDATED = "June 21, 2026";

export default function TermsOfService() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [showTop, setShowTop] = useState(false);
  const sectionRefs = useRef({});

  const navigate=useNavigate()

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const onBack = () => {
    navigate("/signup")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to signup
          </button>
          <span className="text-sm font-semibold text-slate-900">Terms of Service</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-slate-500">Last updated {LAST_UPDATED}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
            These Terms of Service ("Terms") govern your access to and use of our
            platform, which connects Workers offering services with Clients looking
            to hire them (the "Service"). By creating an account, you agree to be
            bound by these Terms. If you don't agree, please don't use the Service.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          {/* Table of contents */}
          <nav className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                On this page
              </p>
              <ul className="space-y-1">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(s.id)}
                      className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition ${
                        activeId === s.id
                          ? "bg-slate-100 font-medium text-slate-900"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      }`}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Content */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <Section
              id="acceptance"
              title={SECTIONS[0].title}
              refCallback={(el) => (sectionRefs.current.acceptance = el)}
            >
              <p>
                By registering for an account, accessing, or using the Service in
                any way, you confirm that you have read, understood, and agree to
                be bound by these Terms and our Privacy Policy. We may update
                these Terms from time to time as described in Section 11, and
                your continued use of the Service after changes take effect means
                you accept the revised Terms.
              </p>
            </Section>

            <Section
              id="eligibility"
              title={SECTIONS[1].title}
              refCallback={(el) => (sectionRefs.current.eligibility = el)}
            >
              <p>
                You must be at least 18 years old and able to form a legally
                binding contract to use the Service. By signing up, you represent
                that you meet these requirements and that the information you
                provide during registration is accurate and complete. You're
                responsible for keeping your account information up to date.
              </p>
            </Section>

            <Section
              id="accounts"
              title={SECTIONS[2].title}
              refCallback={(el) => (sectionRefs.current.accounts = el)}
            >
              <p>
                When you create an account, you choose a role that determines how
                you use the Service:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <span className="font-medium text-slate-700">Workers</span>{" "}
                  offer services, complete jobs posted by Clients, and receive
                  payment for completed work.
                </li>
                <li>
                  <span className="font-medium text-slate-700">Clients</span>{" "}
                  post jobs, hire Workers, and pay for services rendered through
                  the platform.
                </li>
              </ul>
              <p className="mt-3">
                You may only hold one role per account unless we explicitly allow
                dual roles. You're responsible for all activity that occurs under
                your account and for keeping your login credentials confidential.
                Notify us immediately if you suspect unauthorized access.
              </p>
            </Section>

            <Section
              id="responsibilities"
              title={SECTIONS[3].title}
              refCallback={(el) => (sectionRefs.current.responsibilities = el)}
            >
              <p>
                You agree to use the Service honestly and in good faith. Workers
                are expected to complete agreed-upon work to a reasonable
                standard and within agreed timeframes. Clients are expected to
                provide accurate job details and pay for completed work in a
                timely manner. Both parties are responsible for communicating
                clearly and resolving disagreements professionally, using our
                dispute process when needed.
              </p>
            </Section>

            <Section
              id="payments"
              title={SECTIONS[4].title}
              refCallback={(el) => (sectionRefs.current.payments = el)}
            >
              <p>
                Payments for jobs are processed through the Service. We may
                charge a service fee on transactions, which will be disclosed
                before you confirm a job. Clients agree to fund payments for
                accepted work, and Workers agree to deliver the work described
                before payment is released. We are not a party to the underlying
                agreement between Workers and Clients and are not responsible for
                the quality, legality, or safety of jobs posted or completed
                through the Service.
              </p>
            </Section>

            <Section
              id="conduct"
              title={SECTIONS[5].title}
              refCallback={(el) => (sectionRefs.current.conduct = el)}
            >
              <p>You agree not to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Misrepresent your identity, qualifications, or the nature of a job.</li>
                <li>Attempt to circumvent the Service to avoid fees.</li>
                <li>Post unlawful, fraudulent, or harassing content.</li>
                <li>Interfere with the security or normal operation of the Service.</li>
                <li>Use the Service for any purpose that violates applicable law.</li>
              </ul>
              <p className="mt-3">
                We may investigate suspected violations and take action,
                including warning, suspending, or terminating accounts.
              </p>
            </Section>

            <Section
              id="content"
              title={SECTIONS[6].title}
              refCallback={(el) => (sectionRefs.current.content = el)}
            >
              <p>
                You retain ownership of content you submit to the Service, such
                as profile information, job listings, and messages. By
                submitting content, you grant us a non-exclusive, worldwide
                license to host, display, and distribute that content as needed
                to operate the Service. The Service itself, including its
                design, branding, and underlying software, is owned by us and
                may not be copied or reused without permission.
              </p>
            </Section>

            <Section
              id="termination"
              title={SECTIONS[7].title}
              refCallback={(el) => (sectionRefs.current.termination = el)}
            >
              <p>
                You may close your account at any time. We may suspend or
                terminate your access to the Service if you violate these Terms,
                pose a risk to other users, or for other legitimate business
                reasons, with notice where reasonably possible. Provisions that
                by their nature should survive termination, such as payment
                obligations and limitations of liability, will continue to
                apply.
              </p>
            </Section>

            <Section
              id="disclaimers"
              title={SECTIONS[8].title}
              refCallback={(el) => (sectionRefs.current.disclaimers = el)}
            >
              <p>
                The Service is provided "as is" without warranties of any kind.
                We don't guarantee that jobs posted by Clients or work performed
                by Workers will meet any particular standard, and we are not
                liable for disputes between users. To the maximum extent
                permitted by law, our liability for any claim related to the
                Service is limited to the fees you paid us in the twelve months
                before the claim arose.
              </p>
            </Section>

            <Section
              id="disputes"
              title={SECTIONS[9].title}
              refCallback={(el) => (sectionRefs.current.disputes = el)}
            >
              <p>
                If a disagreement arises between a Worker and a Client, we
                encourage direct resolution first, with our support team
                available to help mediate. Any disputes between you and us
                regarding these Terms will be governed by the laws of the
                jurisdiction in which our company is registered, without regard
                to conflict-of-law principles.
              </p>
            </Section>

            <Section
              id="changes"
              title={SECTIONS[10].title}
              refCallback={(el) => (sectionRefs.current.changes = el)}
            >
              <p>
                We may revise these Terms from time to time. If we make material
                changes, we'll notify you by email or through the Service before
                the changes take effect. Continuing to use the Service after
                changes become effective means you accept the updated Terms.
              </p>
            </Section>

            <Section
              id="contact"
              title={SECTIONS[11].title}
              refCallback={(el) => (sectionRefs.current.contact = el)}
              last
            >
              <p>
                Questions about these Terms can be sent to{" "}
                <a
                  href="mailto:support@yourplatform.com"
                  className="font-medium text-slate-900 underline underline-offset-2"
                >
                  support@yourplatform.com
                </a>
                . We're happy to help.
              </p>
            </Section>
          </div>
        </div>
      </div>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:bg-slate-800"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function Section({ id, title, children, refCallback, last }) {
  return (
    <section
      id={id}
      ref={refCallback}
      className={`scroll-mt-24 ${last ? "" : "border-b border-slate-100 pb-6 mb-6"}`}
    >
      <h2 className="mb-3 text-lg font-semibold text-slate-900">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}
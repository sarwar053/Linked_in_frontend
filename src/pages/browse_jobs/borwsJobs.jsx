import { useEffect, useState } from "react";
import Chat from "../../chat/chat";
import Footer from "../../footer/footer";
import Header from "../../header/header";
import JobCard from "../home/cards/jobCards";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/job`;

function BorwsJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJobs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/get-all`, {
          signal: controller.signal,
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load jobs");
        }

        setJobs(json.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
    return () => controller.abort();
  }, []);

  return (
    <>
      <Header />
      <section className="container-page py-14">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
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
              className="lucide lucide-briefcase h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              <rect width={20} height={14} x={2} y={6} rx={2} />
            </svg>{" "}
            Global Opportunities
          </span>
          <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
            Browse Verified Jobs
          </h1>
          <p className="mt-3 text-muted-foreground">
            Real employers across Canada, Australia, Europe, and the Gulf are
            hiring verified Ghanaian talent through Skillavy. Every role is
            reviewed before it goes live.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-56 animate-pulse rounded-xl bg-secondary"
              />
            ))}

          {!loading && error && (
            <p className="col-span-full text-sm text-destructive">
              Couldn&apos;t load jobs: {error}
            </p>
          )}

          {!loading && !error && jobs.length === 0 && (
            <p className="col-span-full text-sm text-muted-foreground">
              No jobs found.
            </p>
          )}

          {!loading &&
            !error &&
            jobs.map((job) => <JobCard key={job._id} job={job} />)}
        </div>

        <div className="mt-14 rounded-xl border border-border bg-surface p-8 text-center">
          <h2 className="text-xl font-bold text-navy">
            Can't find the right role?
          </h2>
          <p className="mt-2 mx-auto max-w-lg text-sm text-muted-foreground">
            Create your Skills Passport and get notified when matching jobs
            are posted by verified employers.
          </p>
          <div className="mt-5">
            <a href="/signin" className="btn-primary text-sm">
              Join Skillavy
            </a>
          </div>
        </div>
      </section>
      <Footer />
      <Chat />
    </>
  );
}

export default BorwsJobs;
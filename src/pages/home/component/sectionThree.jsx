import { useEffect, useState } from "react";
import JobCard from "../cards/jobCards";


const API_BASE_URL  = `${import.meta.env.VITE_BACKEND_URL}/api/job`;

function SectionThree() {

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
        console.log(json.data);
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 animate-pulse rounded-xl bg-secondary"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Couldn&apos;t load jobs: {error}
      </p>
    );
  }

  if (jobs.length === 0) {
    return <p className="text-sm text-muted-foreground">No jobs found.</p>;
  }
  return (
   <section className="bg-surface py-20">
  <div className="container-page">
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl ">
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Verified Jobs
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Global roles. Reviewed employers.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Apply through Skillavy. Employer identity is shared only after your
          application progresses to the interview or introduction stage.
        </p>
      </div>
      <a href="/jobs" className="btn-secondary text-sm">
        All verified jobs{" "}
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
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
     {jobs.slice(0, 6).map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
      
    </div>
  </div>
</section>

  )
}

export default SectionThree

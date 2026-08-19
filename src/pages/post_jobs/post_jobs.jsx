import { useState } from "react"
import axios from "axios"
import Footer from "../../footer/footer.jsx"
import Header from "../../header/header.jsx"
import Chat from "../../chat/chat.jsx"

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/job`;

const initialForm = {
  company: "",
  yourName: "",
  workEmail: "",
  roleTitle: "",
  category: "Welders",
  numberOfHires: 1,
  destinationCountry: "",
  startDate: "",
  description: "",
  conciergeMobility: true,
};

function Post_jobs() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus({ type: "", message: "" });

  // 1. Validation logic...
  if (
    !form.company || !form.yourName || !form.workEmail || 
    !form.roleTitle || !form.destinationCountry || 
    !form.startDate || !form.description
  ) {
    setStatus({ type: "error", message: "Please fill in all required fields." });
    return;
  }

  try {
    setLoading(true);

    // 2. Retrieve the token from localStorage
    const token = localStorage.getItem("token"); // Replace "token" with your actual key

    // 3. Send the request with the Authorization header
    const res = await axios.post(BASE_URL, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data?.success) {
      setStatus({ type: "success", message: "Job request submitted successfully!" });
      setForm(initialForm);
    } else {
      setStatus({ type: "error", message: res.data?.message || "Something went wrong." });
    }
  } catch (error) {
    setStatus({
      type: "error",
      message: error.response?.data?.message || "Failed to submit job request. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};

  return (
   <>
    <Header />
    
   <section className="container-page py-14">
  <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
    <div>
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
        Post a Job
      </span>
      <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
        Tell us who you need. We'll bring you verified candidates.
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Most clients receive a curated shortlist with skills videos within 72
        hours. All candidates are Proofax-verified.
      </p>
      <ul className="mt-8 space-y-3">
        <li className="flex gap-3">
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
            className="lucide lucide-circle-check mt-0.5 h-5 w-5 shrink-0 text-success"
            aria-hidden="true"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <div>
            <p className="font-semibold text-navy">
              Curated shortlist in 72 hours
            </p>
            <p className="text-sm text-muted-foreground">
              Hand-picked by a Skillavy recruiter.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
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
            className="lucide lucide-circle-check mt-0.5 h-5 w-5 shrink-0 text-success"
            aria-hidden="true"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <div>
            <p className="font-semibold text-navy">Skills videos included</p>
            <p className="text-sm text-muted-foreground">
              Watch ability before any interview.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
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
            className="lucide lucide-circle-check mt-0.5 h-5 w-5 shrink-0 text-success"
            aria-hidden="true"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <div>
            <p className="font-semibold text-navy">
              Optional concierge mobility
            </p>
            <p className="text-sm text-muted-foreground">
              Passport, visa, medical, arrival — handled.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
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
            className="lucide lucide-circle-check mt-0.5 h-5 w-5 shrink-0 text-success"
            aria-hidden="true"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <div>
            <p className="font-semibold text-navy">No charge for posting</p>
            <p className="text-sm text-muted-foreground">
              You only pay on the Hire plan to start contacting candidates.
            </p>
          </div>
        </li>
      </ul>
      <div className="mt-8 flex items-center gap-2 rounded-xl border border-primary/20 bg-accent p-4 text-sm text-navy">
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
          className="lucide lucide-shield-check h-5 w-5 text-primary"
          aria-hidden="true"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>{" "}
        Every applicant on Skillavy is Proofax-verified — no exceptions.
      </div>
    </div>
    <form className="card-surface h-fit p-7" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-navy">Job details</h2>

      {status.message && (
        <p
          className={`mt-3 rounded-lg px-3 py-2 text-sm ${
            status.type === "success"
              ? "bg-success/10 text-success"
              : "bg-red-50 text-red-600"
          }`}
        >
          {status.message}
        </p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="">
          <label className="text-sm font-medium text-navy">Company</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder="Acme Heavy Industries"
          />
        </div>
        <div className="">
          <label className="text-sm font-medium text-navy">Your name</label>
          <input
            name="yourName"
            value={form.yourName}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder="Jane Doe"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-navy">Work email</label>
          <input
            name="workEmail"
            value={form.workEmail}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder="jane@acme.com"
            type="email"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-navy">Role title</label>
          <input
            name="roleTitle"
            value={form.roleTitle}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder="Senior MIG Welder"
          />
        </div>
        <div className="">
          <label className="text-sm font-medium text-navy">
            Trade / Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          >
            <option>Welders</option>
            <option>Caregivers</option>
            <option>Heavy Equipment</option>
            <option>Electricians</option>
            <option>Drivers</option>
            <option>Mechanics</option>
            <option>Carpenters</option>
            <option>Plumbers</option>
            <option>Forklift</option>
            <option>HVAC</option>
            <option>Other</option>
          </select>
        </div>
        <div className="">
          <label className="text-sm font-medium text-navy">
            Number of hires
          </label>
          <input
            name="numberOfHires"
            value={form.numberOfHires}
            onChange={handleChange}
            min={1}
            className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            type="number"
          />
        </div>
        <div className="">
          <label className="text-sm font-medium text-navy">
            Destination country
          </label>
          <input
            name="destinationCountry"
            value={form.destinationCountry}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder="Canada"
          />
        </div>
        <div className="">
          <label className="text-sm font-medium text-navy">Start date</label>
          <input
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            type="date"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-navy">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder="Scope of work, certifications required, shift pattern, accommodation, salary..."
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-navy">
            Concierge mobility support
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              name="conciergeMobility"
              checked={form.conciergeMobility}
              onChange={handleChange}
              className="rounded border-input"
              type="checkbox"
            />{" "}
            Yes, include passport, visa, medical, and arrival support.
          </label>
        </div>
      </div>
      <button className="btn-primary mt-6 w-full" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit job request"}
      </button>
    </form>
  </div>
</section>
<Footer />
 <Chat />
   </>
  )
}

export default Post_jobs
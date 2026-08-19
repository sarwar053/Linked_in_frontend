import { useState } from "react";
import {
  MessageSquare, User, Mail, Phone, PenLine, ArrowRight,
  CheckCircle2, Hash, Copy, Check, Loader2,
} from "lucide-react";

import { useParams } from "react-router-dom";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/message`;

export default function JobRequestPage() {
  const { userId } = useParams();
  console.log(userId);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ref, setRef] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!form.email.trim()) next.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.message.trim()) next.message = "Describe the job or project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          worker_id: userId
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setRef(data.data.ref);
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || "Could not submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyRef = () => {
    navigator.clipboard?.writeText(ref).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const reset = () => {
    setForm({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setServerError("");
    setSubmitted(false);
  };

  const inputCls =
    "w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-slate-900 " +
    "placeholder:text-slate-400 transition-colors focus:outline-none focus:border-blue-600 focus:bg-white";

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-5 py-12 font-sans text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono-ref { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-7 flex items-center gap-2.5">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-amber-500">
                  <MessageSquare size={16} className="text-slate-900" strokeWidth={2.4} />
                </div>
                <span className="font-display text-[17px] font-semibold tracking-tight">
                  Skillavy
                </span>
              </div>

              <h1 className="font-display mb-1.5 text-xl font-semibold tracking-tight">
                Request a job
              </h1>
              <p className="mb-6 text-[13px] leading-relaxed text-slate-500">
                Tell us what you need done. We typically respond within one business day, and you'll get a reference number to track your request.
              </p>

              {serverError && (
                <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[12.5px] text-red-700">
                  {serverError}
                </div>
              )}

              <div className="mb-3.5 grid grid-cols-2 gap-3.5">
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
                    <User size={13} /> Full name
                  </label>
                  <input className={inputCls} placeholder="Jordan Blake" value={form.name} onChange={update("name")} />
                  {errors.name && <div className="mt-1 text-[11.5px] text-red-600">{errors.name}</div>}
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
                    <Mail size={13} /> Email
                  </label>
                  <input className={inputCls} placeholder="jordan@company.com" value={form.email} onChange={update("email")} />
                  {errors.email && <div className="mt-1 text-[11.5px] text-red-600">{errors.email}</div>}
                </div>
              </div>

              <div className="mb-3.5">
                <label className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
                  <Phone size={13} /> Phone <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input className={inputCls} placeholder="+1 (415) 555-0148" value={form.phone} onChange={update("phone")} />
              </div>

              <div className="mb-5.5">
                <label className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
                  <PenLine size={13} /> Job details
                </label>
                <textarea
                  className={`${inputCls} min-h-[120px] resize-y leading-relaxed`}
                  placeholder="Describe the job, project, or task you need help with..."
                  value={form.message}
                  onChange={update("message")}
                />
                {errors.message && <div className="mt-1 text-[11.5px] text-red-600">{errors.message}</div>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit request <ArrowRight size={15} />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-[11.5px] text-slate-400">
                We typically respond within one business day.
              </p>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 size={26} className="text-emerald-600" strokeWidth={2} />
              </div>
              <h2 className="font-display mb-2 text-lg font-semibold">
                Request submitted
              </h2>
              <p className="mb-5.5 max-w-[320px] text-[13.5px] leading-relaxed text-slate-500">
                Thanks, {form.name.split(" ")[0] || "there"}. We've received your job request and will reach out to you at {form.email}.
              </p>

              <div
                onClick={copyRef}
                className="mb-6 flex cursor-pointer items-center gap-2.5 rounded-lg border border-stone-200 bg-stone-50 px-4 py-2.5"
              >
                <Hash size={14} className="text-slate-400" />
                <span className="font-mono-ref text-sm font-medium">{ref}</span>
                <span className="h-3.5 w-px bg-stone-200" />
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-slate-400" />}
              </div>

              <p className="mb-5 text-[11.5px] text-slate-400">
                Save this reference number to track your request.
              </p>

              <button
                onClick={reset}
                className="text-sm font-medium text-blue-600 hover:opacity-80"
              >
                Submit another request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
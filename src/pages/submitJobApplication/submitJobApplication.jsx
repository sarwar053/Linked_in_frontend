"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  User,
  Mail,
  Phone,
  BookMarked,
  UploadCloud,
  FileCheck2,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/jobapplication`;

const STEPS = [
  { id: "applicant", label: "Applicant" },
  { id: "background", label: "Background" },
  { id: "documents", label: "Documents" },
  { id: "review", label: "Review" },
];

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  nationality: "",
  currentLocation: "",
  yearsExperience: "",
  currentOccupation: "",
  relevantSkills: "",
  earliestStartDate: "",
  coverNote: "",
  agreeToTerms: false,
};

function formatDate(dateStr) {
  if (!dateStr) return "TBD";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Field({ label, htmlFor, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-semibold text-navy">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      {children}
      {error && (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-destructive">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {error}
        </span>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-navy placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function JobApplicationForm() {
  const { jobId } = useParams();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [files, setFiles] = useState({ resume: null, certificates: null });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");

  // Pre-flight "already applied" check
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkStatus() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/jobs/${jobId}/application-status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          // No record found / route not ready yet — let the user proceed to apply
          if (!cancelled) setCheckingStatus(false);
          return;
        }

        const data = await res.json();
        if (!cancelled) {
          setAlreadyApplied(Boolean(data?.applied));
          setCheckingStatus(false);
        }
      } catch (err) {
        console.error("Status check failed:", err);
        // Fail open: if the check itself errors out, don't block the applicant
        if (!cancelled) setCheckingStatus(false);
      }
    }

    checkStatus();
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function updateFile(field, fileList) {
    const file = fileList?.[0] || null;
    setFiles((prev) => ({ ...prev, [field]: file }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validateStep(index) {
    const next = {};
    if (STEPS[index].id === "applicant") {
      if (!form.fullName.trim()) next.fullName = "Enter the applicant's full name.";
      if (!form.email.trim()) next.email = "Enter a contact email.";
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
      if (!form.phone.trim()) next.phone = "Enter a phone number.";
      if (!form.nationality.trim()) next.nationality = "Enter a nationality.";
    }
    if (STEPS[index].id === "background") {
      if (!form.yearsExperience.trim()) next.yearsExperience = "Enter years of relevant experience.";
      if (!form.currentOccupation.trim()) next.currentOccupation = "Enter the current occupation.";
      if (!form.earliestStartDate) next.earliestStartDate = "Select the earliest available start date.";
    }
    if (STEPS[index].id === "documents") {
      if (!files.resume) next.resume = "Upload a CV or resume.";
    }
    if (STEPS[index].id === "review") {
      if (!form.agreeToTerms) next.agreeToTerms = "Confirm the declaration to submit.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(stepIndex)) return;
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep(stepIndex)) return;
    setStatus("submitting");
    setServerError("");

    try {
      // 1. Get the auth token (assuming you store it in localStorage)
      // Adjust 'token' to whatever key you use in your project
      const token = localStorage.getItem("token");

      // 2. Prepare the FormData
      const payload = new FormData();

      // Append form text fields
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, value);
      });

      // Append files (The keys 'resume' and 'certificates' must match your Multer config)
      if (files.resume) {
        payload.append("resume", files.resume);
      }
      if (files.certificates) {
        payload.append("certificates", files.certificates);
      }

      // 3. Make the API Call
      // We use the jobId from the job object passed as a prop (_id)

      const res = await fetch(`${BASE_URL}/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          // IMPORTANT: Do NOT set 'Content-Type': 'multipart/form-data' manually.
          // The browser will automatically set it with the correct boundary.
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        // If backend sends { message: "..." }, we show that, otherwise generic error
        throw new Error(data.message || `Error ${res.status}: Submission failed`);
      }

      setStatus("success");
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("error");
      setServerError(err.message || "Something went wrong submitting the application.");
    }
  }

  // Loading state while we check prior application status
  if (checkingStatus) {
    return (
      <div className="card-surface mx-auto flex max-w-xl flex-col items-center gap-3 p-8 text-center mt-5">
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">Checking your application status…</p>
      </div>
    );
  }

  // Already applied before this session — block the form immediately
  if (alreadyApplied) {
    return (
      <div className="card-surface mx-auto flex max-w-xl flex-col items-center gap-3 p-8 text-center mt-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-bold text-navy">You've already applied</h2>
        <p className="text-sm text-muted-foreground">
          You've already submitted an application for this job. We'll be in touch if it moves forward.
        </p>
        <a
          href="/"
          className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl 
            bg-white/80 backdrop-blur-sm shadow-md 
            border border-white/40 
            text-slate-700 font-medium text-base 
            transition-all duration-300 ease-out
            hover:bg-white hover:shadow-xl hover:scale-[1.02] 
            active:scale-[0.97] active:shadow-inner
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
        >
          Go back to home
        </a>
      </div>
    );
  }

  // Just successfully submitted in this session
  if (status === "success") {
    return (
      <div className="card-surface mx-auto flex max-w-xl flex-col items-center gap-3 p-8 text-center ">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-bold text-navy">Application submitted</h2>
        <a
          href="/"
          className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl 
            bg-white/80 backdrop-blur-sm shadow-md 
            border border-white/40 
            text-slate-700 font-medium text-base 
            transition-all duration-300 ease-out
            hover:bg-white hover:shadow-xl hover:scale-[1.02] 
            active:scale-[0.97] active:shadow-inner
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2
            "
        >
          Go back to home
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 mt-5">
      {/* Journey stepper */}
      <ol className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const isDone = i < stepIndex;
          const isActive = i === stepIndex;
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2">
              <div className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${
                    isDone
                      ? "bg-success text-success-foreground"
                      : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {isDone ? <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                </span>
                <span
                  className={`text-[11px] font-semibold ${
                    isActive ? "text-navy" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  className={`mb-4 h-px flex-1 ${i < stepIndex ? "bg-success" : "bg-border"}`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Step body */}
      <div className="card-surface p-6">
        {step.id === "applicant" && (
          <div className="flex flex-col gap-4">
            <h2 className="inline-flex items-center gap-2 text-sm font-bold text-navy">
              <User className="h-4 w-4" aria-hidden="true" />
              Applicant details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" htmlFor="fullName" required error={errors.fullName}>
                <input
                  id="fullName"
                  className={inputClass}
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Applicant's full legal name"
                />
              </Field>
              <Field label="Nationality" htmlFor="nationality" required error={errors.nationality}>
                <input
                  id="nationality"
                  className={inputClass}
                  value={form.nationality}
                  onChange={(e) => update("nationality", e.target.value)}
                  placeholder="e.g. Bangladeshi"
                />
              </Field>
              <Field label="Email" htmlFor="email" required error={errors.email}>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    id="email"
                    type="email"
                    className={`${inputClass} pl-8`}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </Field>
              <Field label="Phone" htmlFor="phone" required error={errors.phone}>
                <div className="relative">
                  <Phone
                    className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    id="phone"
                    type="tel"
                    className={`${inputClass} pl-8`}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+880 1XXX XXXXXX"
                  />
                </div>
              </Field>
              <Field label="Current location" htmlFor="currentLocation">
                <input
                  id="currentLocation"
                  className={inputClass}
                  value={form.currentLocation}
                  onChange={(e) => update("currentLocation", e.target.value)}
                  placeholder="City, country"
                />
              </Field>
            </div>
          </div>
        )}

        {step.id === "background" && (
          <div className="flex flex-col gap-4">
            <h2 className="inline-flex items-center gap-2 text-sm font-bold text-navy">
              <BookMarked className="h-4 w-4" aria-hidden="true" />
              Professional background
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Current occupation" htmlFor="currentOccupation" required error={errors.currentOccupation}>
                <input
                  id="currentOccupation"
                  className={inputClass}
                  value={form.currentOccupation}
                  onChange={(e) => update("currentOccupation", e.target.value)}
                  placeholder="e.g. Site Electrician"
                />
              </Field>
              <Field label="Years of relevant experience" htmlFor="yearsExperience" required error={errors.yearsExperience}>
                <input
                  id="yearsExperience"
                  type="number"
                  min="0"
                  className={inputClass}
                  value={form.yearsExperience}
                  onChange={(e) => update("yearsExperience", e.target.value)}
                  placeholder="e.g. 4"
                />
              </Field>
              <Field label="Earliest start date" htmlFor="earliestStartDate" required error={errors.earliestStartDate}>
                <input
                  id="earliestStartDate"
                  type="date"
                  className={inputClass}
                  value={form.earliestStartDate}
                  onChange={(e) => update("earliestStartDate", e.target.value)}
                />
              </Field>
              <Field label="Relevant skills" htmlFor="relevantSkills">
                <input
                  id="relevantSkills"
                  className={inputClass}
                  value={form.relevantSkills}
                  onChange={(e) => update("relevantSkills", e.target.value)}
                  placeholder="Comma separated"
                />
              </Field>
            </div>
            <Field label="Note to the employer" htmlFor="coverNote">
              <textarea
                id="coverNote"
                rows={4}
                className={inputClass}
                value={form.coverNote}
                onChange={(e) => update("coverNote", e.target.value)}
                placeholder="Anything you'd like the employer to know."
              />
            </Field>
          </div>
        )}

        {step.id === "documents" && (
          <div className="flex flex-col gap-4">
            <h2 className="inline-flex items-center gap-2 text-sm font-bold text-navy">
              <UploadCloud className="h-4 w-4" aria-hidden="true" />
              Documents
            </h2>
            <FileDropField
              id="resume"
              label="CV / résumé"
              required
              error={errors.resume}
              file={files.resume}
              onChange={(list) => updateFile("resume", list)}
              onClear={() => updateFile("resume", null)}
              accept=".pdf,.doc,.docx"
            />
            <FileDropField
              id="certificates"
              label="Certificates (optional)"
              file={files.certificates}
              onChange={(list) => updateFile("certificates", list)}
              onClear={() => updateFile("certificates", null)}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        )}

        {step.id === "review" && (
          <div className="flex flex-col gap-4">
            <h2 className="inline-flex items-center gap-2 text-sm font-bold text-navy">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Review &amp; submit
            </h2>
            <dl className="grid gap-x-6 gap-y-3 rounded-lg bg-secondary p-4 text-sm sm:grid-cols-2">
              <ReviewRow label="Full name" value={form.fullName} />
              <ReviewRow label="Nationality" value={form.nationality} />
              <ReviewRow label="Email" value={form.email} />
              <ReviewRow label="Phone" value={form.phone} />
              <ReviewRow label="Current occupation" value={form.currentOccupation} />
              <ReviewRow label="Experience" value={form.yearsExperience && `${form.yearsExperience} years`} />
              <ReviewRow label="Earliest start" value={formatDate(form.earliestStartDate)} />
              <ReviewRow label="CV / résumé" value={files.resume?.name} />
              <ReviewRow label="Certificates" value={files.certificates?.name || "Not provided"} />
            </dl>

            <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                checked={form.agreeToTerms}
                onChange={(e) => update("agreeToTerms", e.target.checked)}
              />
              <span>
                I confirm the information above is accurate and I authorize it to be shared with
                the employer if my application advances.
              </span>
            </label>
            {errors.agreeToTerms && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-destructive">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.agreeToTerms}
              </span>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {serverError}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0 || status === "submitting"}
          className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-navy disabled:cursor-not-allowed disabled:opacity-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back
        </button>

        {!isLastStep ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === "submitting"}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                Submitting
              </>
            ) : (
              <>
                Submit application
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="font-medium text-navy">{value || "—"}</dd>
    </div>
  );
}

function FileDropField({ id, label, required, error, file, onChange, onClear, accept }) {
  return (
    <Field label={label} htmlFor={id} required={required} error={error}>
      {file ? (
        <div className="flex items-center justify-between rounded-md border border-border bg-secondary px-3 py-2 text-sm">
          <span className="inline-flex items-center gap-2 truncate text-navy">
            <FileCheck2 className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
            <span className="truncate">{file.name}</span>
          </span>
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 text-muted-foreground transition hover:text-destructive"
            aria-label={`Remove ${file.name}`}
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border px-3 py-4 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary"
        >
          <UploadCloud className="h-4 w-4" aria-hidden="true" />
          Click to upload
          <input
            id={id}
            type="file"
            accept={accept}
            className="sr-only"
            onChange={(e) => onChange(e.target.files)}
          />
        </label>
      )}
    </Field>
  );
}
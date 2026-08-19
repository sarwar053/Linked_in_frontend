import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Check, X, Mail } from "lucide-react";

import clintSvg from "../assets/clint.svg";




const CODE_LENGTH = 6;

// ─── API helpers ─────────────────────────────────────────────────────────────
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

const signupApi = async ({ name, email, password, role }) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

const verifyOtpApi = async ({ email, code, role }) => {
  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data; // { token, user: { id, name, email, role } }
};

const resendOtpApi = async ({ email, role }) => {
  const res = await fetch(`${BASE_URL}/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
    role: "worker",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [codeError, setCodeError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!submitted || verified) return;
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [submitted, verified, resendCooldown]);

  const handleCodeChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    setCodeError("");
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((char, i) => (next[i] = char));
    setCode(next);
    const lastIndex = Math.min(pasted.length, CODE_LENGTH) - 1;
    inputRefs.current[lastIndex]?.focus();
  };

  // ── Verify OTP — calls backend ──
  const handleVerify = async (e) => {
    e.preventDefault();
    const joined = code.join("");
    if (joined.length < CODE_LENGTH) {
      setCodeError("Enter the full 6-digit code.");
      return;
    }
    setIsLoading(true);
    try {
      const { token } = await verifyOtpApi({ email: form.email, code: joined, role: form.role });
      localStorage.setItem("token", token);
      setVerified(true);
    } catch (err) {
      setCodeError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Resend OTP — calls backend ──
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    try {
      await resendOtpApi({ email: form.email, role: form.role });
      setResendCooldown(30);
      setCode(Array(CODE_LENGTH).fill(""));
      setCodeError("");
      inputRefs.current[0]?.focus();
    } catch (err) {
      setCodeError(err.message);
    }
  };

  const passwordChecks = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "One number", test: (p) => /[0-9]/.test(p) },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    const failedChecks = passwordChecks.filter((c) => !c.test(form.password));
    if (!form.password) {
      next.password = "Enter a password.";
    } else if (failedChecks.length > 0) {
      next.password = "Password doesn't meet the requirements.";
    }
    if (form.confirmPassword !== form.password || !form.confirmPassword) {
      next.confirmPassword = "Passwords don't match.";
    }
    if (!form.agree) next.agree = "You must accept the terms to continue.";
    return next;
  };

  // ── Submit signup — calls backend ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length !== 0) return;

    setIsLoading(true);
    try {
      await signupApi({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      setSubmitted(true);
      setResendCooldown(30);
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const homeNavigate = () => {
    window.location.href = "/"; 
  };

  // ── Verified success screen ──────────────────────────────────────────────
  if (submitted && verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            Account verified
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Welcome aboard, {form.name.split(" ")[0]}. Your{" "}
            <span className="font-medium capitalize">{form.role}</span> account
            is ready to go.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setVerified(false);
              setCode(Array(CODE_LENGTH).fill(""));
              setForm({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                agree: false,
                role: "worker",
              });
              homeNavigate();
            }}
            className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Go to homepage
          </button>
        </div>
      </div>
    );
  }

  // ── Email verification screen ────────────────────────────────────────────
  if (submitted && !verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <Mail className="h-6 w-6 text-slate-600" />
          </div>
          <h2 className="text-center text-xl font-semibold text-slate-900">
            Check your email
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-slate-700">{form.email}</span>.
            Enter it below to verify your account.
          </p>

          <form onSubmit={handleVerify} className="mt-6">
            <div className="flex justify-center gap-2" onPaste={handleCodePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(i, e)}
                  className={`h-12 w-11 rounded-lg border text-center text-lg font-semibold text-slate-900 outline-none transition focus:ring-2 focus:ring-offset-0 ${
                    codeError
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-300 focus:border-slate-400 focus:ring-slate-200"
                  }`}
                />
              ))}
            </div>
            {codeError && (
              <p className="mt-3 text-center text-xs text-red-600">
                {codeError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying…" : "Verify email"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Didn't get a code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className={`font-medium underline underline-offset-2 ${
                resendCooldown > 0
                  ? "cursor-not-allowed text-slate-400"
                  : "text-slate-900"
              }`}
            >
              {resendCooldown > 0
                ? `Resend code (${resendCooldown}s)`
                : "Resend code"}
            </button>
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 w-full text-center text-sm text-slate-500 underline underline-offset-2"
          >
            Back to signup
          </button>
        </div>
      </div>
    );
  }

  // ── Main signup form ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-900">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Start your free trial. No credit card required.
            </p>
          </div>

          {/* ── Role selector ── */}
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            I am signing up as a
          </p>
          <div className="mb-6 grid grid-cols-2 gap-3">
            {[
              {
                value: "worker",
                label: "Worker",
                desc: "I provide services or complete jobs",
                icon: "👷",
              },
              {
                value: "client",
                label: "Client",
                desc: "I hire workers or post jobs",
                icon: <img className="max-h-15 max-w-15" src={clintSvg}></img>,
              },
            ].map(({ value, label, desc, icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, role: value }))}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-4 py-4 text-center transition ${
                  form.role === value
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <span className="text-2xl">{icon}</span>
                <span
                  className={`text-sm font-semibold ${
                    form.role === value ? "text-blue-700" : "text-slate-700"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`text-xs leading-snug ${
                    form.role === value ? "text-blue-500" : "text-slate-400"
                  }`}
                >
                  {desc}
                </span>
              </button>
            ))}
          </div>

          <div className="mb-5 border-t border-slate-100" />

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Cooper"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-offset-0 ${
                  errors.name
                    ? "border-red-300 focus:ring-red-200"
                    : "border-slate-300 focus:border-slate-400 focus:ring-slate-200"
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-offset-0 ${
                  errors.email
                    ? "border-red-300 focus:ring-red-200"
                    : "border-slate-300 focus:border-slate-400 focus:ring-slate-200"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-offset-0 ${
                    errors.password
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-300 focus:border-slate-400 focus:ring-slate-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {form.password.length > 0 && (
                <div className="mt-2 space-y-1">
                  {passwordChecks.map((check) => {
                    const passed = check.test(form.password);
                    return (
                      <div
                        key={check.label}
                        className="flex items-center gap-1.5 text-xs"
                      >
                        {passed ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-slate-300" />
                        )}
                        <span
                          className={passed ? "text-slate-500" : "text-slate-400"}
                        >
                          {check.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-offset-0 ${
                  errors.confirmPassword
                    ? "border-red-300 focus:ring-red-200"
                    : "border-slate-300 focus:border-slate-400 focus:ring-slate-200"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
                <span className="text-sm text-slate-600">
                  I agree to the{" "}
                  <a
                    href="/term_services"
                    className="font-medium text-slate-900 underline underline-offset-2"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/term_services"
                    className="font-medium text-slate-900 underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agree && (
                <p className="mt-1.5 text-xs text-red-600">{errors.agree}</p>
              )}
            </div>

            {/* Server-level error (e.g. email already registered) */}
            {errors.form && (
              <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-xs text-red-600 ring-1 ring-red-200">
                {errors.form}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Creating account…"
                : form.role === "worker"
                ? "Create worker account"
                : "Create client account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-medium text-slate-900 underline underline-offset-2"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Check, ArrowLeft, KeyRound, Loader2, Mail, ShieldCheck, Briefcase, User } from "lucide-react";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;
const CODE_LENGTH = 6;

const ACCENT = "#4338CA";
const ACCENT_HOVER = "#3730A3";



function AuthShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F8FB] flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-linear-to-br from-indigo-200/50 to-violet-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-linear-to-tr from-sky-100/50 to-indigo-100/30 blur-3xl" />
      <div className="relative w-full max-w-md animate-[fadeSlideUp_0.4s_ease both]">
        <div className="rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-sm p-8 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-8px_rgba(16,24,40,0.10)]">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function IconBadge({ icon: Icon }) {
  return (
    <div
      className="mb-4 flex h-11 w-11 items-center justify-center rounded-full"
      style={{ backgroundColor: `${ACCENT}14` }}
    >
      <Icon className="h-5 w-5" style={{ color: ACCENT }} />
    </div>
  );
}

function StepDots({ step, total = 3 }) {
  return (
    <div className="mb-6 flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="h-1 flex-1 rounded-full transition-colors duration-300"
          style={{ backgroundColor: i <= step ? ACCENT : "#E2E4ED" }}
        />
      ))}
    </div>
  );
}

function Field({ label, htmlFor, error, action, children }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium text-[#13162B]">
          {label}
        </label>
        {action}
      </div>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

const baseInputClasses =
  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#13162B] placeholder:text-slate-400 outline-none transition focus:ring-2";

function TextInput({ hasError, className = "", ...rest }) {
  return (
    <input
      {...rest}
      className={`${baseInputClasses} ${
        hasError
          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
          : "border-slate-200 focus:border-[#4338CA] focus:ring-indigo-100"
      } ${className}`}
    />
  );
}

function PasswordInput({ hasError, className = "", ...rest }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        {...rest}
        type={visible ? "text" : "password"}
        className={`${baseInputClasses} pr-10 ${
          hasError
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-slate-200 focus:border-[#4338CA] focus:ring-indigo-100"
        } ${className}`}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

function SubmitButton({ loading, children }) {
  return (
    <button
      disabled={loading}
      style={{ backgroundColor: ACCENT }}
      onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
      onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = ACCENT)}
      className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  );
}

function ErrorBanner({ children }) {
  if (!children) return null;
  return (
    <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3.5 py-2.5 text-xs text-red-600">
      {children}
    </div>
  );
}

// ── Role toggle (Client / Worker) ──────────────────────────────────────────

function RoleToggle({ role, onChange }) {
  const options = [
    { value: "client", label: "Client", icon: Briefcase },
    { value: "worker", label: "Worker", icon: User },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
      {options.map(({ value, label, icon: Icon }) => {
        const active = role === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              active ? "bg-white text-[#13162B] shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
            style={active ? { color: ACCENT } : undefined}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────

export default function LoginForm({ signupHref = "/signup" }) {
  const [view, setView] = useState("login");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("client"); // "client" | "worker"

  // Form states
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [codeError, setCodeError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPwErrors, setNewPwErrors] = useState({});

  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  // Cooldown timer for resending the OTP
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const passwordChecks = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "One number", test: (p) => /[0-9]/.test(p) },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ── API: Login ──────────────────────────────────────────────────────────
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `role` tells the backend which profile to authenticate against
        // (a single account/email may have both a client and a worker profile).
        body: JSON.stringify({ email: form.email, password: form.password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.requiresVerification) {
          alert(data.message); // Or redirect to your verification page
          return;
        }
        if (response.status === 404 && data.code === "NO_PROFILE_FOR_ROLE") {
          throw new Error(
            role === "client"
              ? "We couldn't find a client account for this email. Try logging in as a worker instead."
              : "We couldn't find a worker account for this email. Try logging in as a client instead."
          );
        }
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
      window.location.href = role === "client" ? "/clintprofile" : "/workerprofile"; // Replace with your routes
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // ── API: Forgot password (send OTP) ─────────────────────────────────────
  const sendResetCode = async (email) => {
    const response = await fetch(`${BASE_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase(), role }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
  };

  const handleSendReset = async (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return setResetEmailError("Enter your email.");

    setLoading(true);
    try {
      await sendResetCode(resetEmail);
      setResendCooldown(30);
      setCode(Array(CODE_LENGTH).fill(""));
      setCodeError("");
      setView("reset-code");
    } catch (err) {
      setResetEmailError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || loading) return;
    setLoading(true);
    try {
      await sendResetCode(resetEmail);
      setResendCooldown(30);
    } catch (err) {
      setCodeError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── API: Verify reset OTP ───────────────────────────────────────────────
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const joinedCode = code.join("");
    if (joinedCode.length < CODE_LENGTH) return setCodeError("Enter the full code.");

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail.toLowerCase(), code: joinedCode, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setView("new-password");
    } catch (err) {
      setCodeError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── API: Set new password ───────────────────────────────────────────────
  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    setNewPwErrors({});
    const failedChecks = passwordChecks.filter((c) => !c.test(newPassword));
    if (failedChecks.length > 0) return setNewPwErrors({ general: "Your password doesn't meet all requirements yet." });
    if (newPassword !== confirmNewPassword) return setNewPwErrors({ general: "Those passwords don't match." });

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail.toLowerCase(), newPassword, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setView("reset-success");
    } catch (err) {
      setNewPwErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // OTP input helpers
  const handleCodeChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    setCodeError("");
    if (digit && index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleCodePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((char, i) => (next[i] = char));
    setCode(next);
    inputRefs.current[Math.min(pasted.length, CODE_LENGTH) - 1]?.focus();
  };

  const backToLogin = () => {
    setView("login");
    setErrors({});
    setResetEmailError("");
  };

  // ── Views ────────────────────────────────────────────────────────────────

  if (view === "forgot") {
    return (
      <AuthShell>
        <button
          onClick={backToLogin}
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to log in
        </button>
        <StepDots step={0} />
        <IconBadge icon={KeyRound} />
        <h1 className="text-xl font-semibold tracking-tight text-[#13162B]">Forgot your password?</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Enter the email on your {role} account and we'll send you a 6-digit reset code.
        </p>
        <form onSubmit={handleSendReset} className="mt-6 space-y-5">
          <Field label="Email address" htmlFor="reset-email" error={resetEmailError}>
            <TextInput
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={resetEmail}
              onChange={(e) => {
                setResetEmail(e.target.value);
                if (resetEmailError) setResetEmailError("");
              }}
              hasError={!!resetEmailError}
            />
          </Field>
          <SubmitButton loading={loading}>Send reset code</SubmitButton>
        </form>
      </AuthShell>
    );
  }

  if (view === "reset-code") {
    return (
      <AuthShell>
        <button
          onClick={() => setView("forgot")}
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <StepDots step={1} />
        <IconBadge icon={Mail} />
        <h1 className="text-xl font-semibold tracking-tight text-[#13162B]">Check your email</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          We sent a 6-digit code to <span className="font-medium text-[#13162B]">{resetEmail}</span>
        </p>
        <form onSubmit={handleVerifyCode} className="mt-6">
          <div className="flex justify-center gap-2" onPaste={handleCodePaste}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                placeholder="0"
                value={digit}
                onChange={(e) => handleCodeChange(i, e.target.value)}
                onKeyDown={(e) => handleCodeKeyDown(i, e)}
                className={`h-12 w-11 rounded-xl border text-center text-lg font-semibold text-[#13162B] outline-none transition focus:ring-2 focus:ring-indigo-100 ${
                  codeError ? "border-red-300" : "border-slate-200 focus:border-[#4338CA]"
                }`}
              />
            ))}
          </div>
          {codeError && <p className="mt-3 text-center text-xs text-red-600">{codeError}</p>}

          <div className="mt-4 text-center text-xs text-slate-500">
            Didn't get it?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendCooldown > 0 || loading}
              className="font-medium disabled:cursor-not-allowed disabled:text-slate-400"
              style={{ color: resendCooldown > 0 || loading ? undefined : ACCENT }}
            >
              {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
            </button>
          </div>

          <div className="mt-6">
            <SubmitButton loading={loading}>Verify code</SubmitButton>
          </div>
        </form>
      </AuthShell>
    );
  }

  if (view === "new-password") {
    const confirmMismatch = confirmNewPassword.length > 0 && confirmNewPassword !== newPassword;
    return (
      <AuthShell>
        <StepDots step={2} />
        <IconBadge icon={ShieldCheck} />
        <h1 className="text-xl font-semibold tracking-tight text-[#13162B]">Set a new password</h1>
        <p className="mt-1.5 text-sm text-slate-500">Choose a strong password you haven't used before.</p>

        <form onSubmit={handleSetNewPassword} className="mt-6 space-y-4">
          <Field label="New password" htmlFor="new-password">
            <PasswordInput
              id="new-password"
              autoComplete="new-password"
              placeholder="Create a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <ul className="mt-2.5 space-y-1">
              {passwordChecks.map((check) => {
                const passed = check.test(newPassword);
                return (
                  <li
                    key={check.label}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      passed ? "text-emerald-600" : "text-slate-400"
                    }`}
                  >
                    <Check className={`h-3.5 w-3.5 shrink-0 ${passed ? "opacity-100" : "opacity-30"}`} />
                    {check.label}
                  </li>
                );
              })}
            </ul>
          </Field>

          <Field label="Confirm password" htmlFor="confirm-password" error={confirmMismatch ? "Passwords don't match." : undefined}>
            <PasswordInput
              id="confirm-password"
              autoComplete="new-password"
              placeholder="Re-enter your new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              hasError={confirmMismatch}
            />
          </Field>

          <ErrorBanner>{newPwErrors.general}</ErrorBanner>

          <SubmitButton loading={loading}>Reset password</SubmitButton>
        </form>
      </AuthShell>
    );
  }

  if (view === "reset-success") {
    return (
      <AuthShell>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-[#13162B]">Password reset successfully</h2>
          <p className="mt-1.5 text-sm text-slate-500">You can now log in with your new password.</p>
          <button
            onClick={backToLogin}
            style={{ backgroundColor: ACCENT }}
            className="mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Back to log in
          </button>
        </div>
      </AuthShell>
    );
  }

  // ── Main login view ───────────────────────────────────────────────────────
  return (
    <AuthShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[#13162B]">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-500">
          {role === "client"
            ? "Log in as a client to post a job and hire talent."
            : "Log in as a worker to find work and manage your gigs."}
        </p>
      </div>

      <RoleToggle role={role} onChange={setRole} />

      <ErrorBanner>{errors.general}</ErrorBanner>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <Field label="Email address" htmlFor="login-email" error={errors.email}>
          <TextInput
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            hasError={!!errors.email}
            required
          />
        </Field>

        <Field
          label="Password"
          htmlFor="login-password"
          error={errors.password}
          action={
            <button
              type="button"
              onClick={() => setView("forgot")}
              className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-700 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          }
        >
          <PasswordInput
            id="login-password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            hasError={!!errors.password}
            required
          />
        </Field>

        <SubmitButton loading={loading}>Log in as {role === "client" ? "Client" : "Worker"}</SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <a href={signupHref} className="font-medium" style={{ color: ACCENT }}>
          Sign up
        </a>
      </p>
    </AuthShell>
  );
}
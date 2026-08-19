import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Hash, Mail, Phone, CheckCircle2, MessageSquare,
  Trash2, ArrowLeft, Loader2, RefreshCcw, ExternalLink, Briefcase, LogOut,LayoutDashboard 
} from "lucide-react";


const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/message`;

const statusStyle = {
  new: { pill: "bg-amber-50 text-amber-800", label: "New" },
  open: { pill: "bg-blue-50 text-blue-800", label: "In progress" },
  resolved: { pill: "bg-emerald-50 text-emerald-800", label: "Resolved" },
};

const statusOrder = { new: 0, open: 1, resolved: 2 };



function getInitials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatTimeAndDate(createdAt) {
  const d = new Date(createdAt);
  const now = new Date();
  const isSameDay = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();

  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  if (isSameDay) return { time, date: "Today" };
  if (isYesterday) return { time, date: "Yesterday" };

  const daysAgo = Math.round((now - d) / 86400000);
  if (daysAgo < 7) {
    return { time: `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`, date: d.toLocaleDateString([], { weekday: "short" }) };
  }
  return { time: d.toLocaleDateString(), date: d.toLocaleDateString() };
}

function adaptMessage(doc) {
  const { time, date } = formatTimeAndDate(doc.createdAt);
  return {
    id: doc._id || doc.ref,
    ref: doc.ref,
    name: doc.name,
    initials: getInitials(doc.name),
    subject: doc.subject || doc.message.slice(0, 60),
    preview: doc.message,
    channel: doc.channel || "Contact form",
    time,
    date,
    status: doc.status || "new",
    phone: doc.phone || "—",
    email: doc.email,
    worker_id: doc.worker_id,
  };
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("text");
  const [selectedId, setSelectedId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");


  const navigate = useNavigate()

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  // Request Interview handler
  const Sendmessagehandler = () => {
    navigate('/messageDashboard');
    console.log("Request Interview clicked");
  };



  const fetchMessages = useCallback(async (searchQuery, searchMode) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) {
        if (searchMode === "number") params.set("ref", searchQuery.trim());
        else params.set("q", searchQuery.trim());
      }

      const res = await fetch(`${BASE_URL}?${params.toString()}`);
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not load messages.");
      }

      const adapted = data.data.map(adaptMessage);
      setMessages(adapted);
      setSelectedId((prev) =>
        adapted.some((m) => m.id === prev) ? prev : adapted[0]?.id ?? null
      );
    } catch (err) {
      setError(err.message || "Could not load messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchMessages(query, mode), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, mode]);

  const filtered = useMemo(
    () => [...messages].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]),
    [messages]
  );

  const selected = messages.find((m) => m.id === selectedId) || filtered[0];

  const selectMessage = (id) => {
    setSelectedId(id);
    setConfirmDeleteId(null);
    setMobileDetailOpen(true);
  };

  const deleteMessage = async (id) => {
    const target = messages.find((m) => m.id === id);
    if (!target) return;
    setConfirmDeleteId(null);
    setActionError("");

    const prevMessages = messages;
    const remaining = messages.filter((m) => m.id !== id);
    setMessages(remaining);
    if (selectedId === id) {
      setSelectedId(remaining.length ? remaining[0].id : null);
      if (remaining.length === 0) setMobileDetailOpen(false);
    }

    try {
      const res = await fetch(`${BASE_URL}/${target.ref}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not delete message.");
      }
    } catch (err) {
      setActionError(err.message || "Could not delete message.");
      setMessages(prevMessages);
    }
  };

  const markResolved = async (id) => {
    const target = messages.find((m) => m.id === id);
    if (!target) return;
    setActionError("");

    const prevMessages = messages;
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "resolved" } : m))
    );

    try {
      const res = await fetch(`${BASE_URL}/${target.ref}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "resolved" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not update status.");
      }
    } catch (err) {
      setActionError(err.message || "Could not update status.");
      setMessages(prevMessages);
    }
  };

  const resolvedRate = messages.length
    ? Math.round((messages.filter((m) => m.status === "resolved").length / messages.length) * 100)
    : 0;

  const stats = [
    { label: "Total messages", value: String(messages.length), delta: " " },
    { label: "New today", value: String(messages.filter((m) => m.status === "new").length), delta: " " },
    { label: "In progress", value: String(messages.filter((m) => m.status === "open").length), delta: " " },
    { label: "Resolved rate", value: `${resolvedRate}%`, delta: " " },
  ];

  return (
    <div className="min-h-screen bg-stone-100 text-slate-900 font-sans">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 border-b border-stone-200 bg-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
            <LayoutDashboard  size={16} className="text-slate-900" strokeWidth={2.4} />
          </div>
          <span className="text-base font-semibold tracking-tight">Dashboard</span>
        </div>

        <div className="order-3 sm:order-none flex w-full sm:w-auto sm:max-w-md flex-1 items-center overflow-hidden rounded-lg border border-slate-900">
          <div className="flex flex-1 items-center gap-2 px-3 py-2">
            {mode === "text" ? <Search size={16} className="text-slate-400 flex-shrink-0" /> : <Hash size={16} className="text-slate-400 flex-shrink-0" />}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={mode === "text" ? "Search messages, names, subjects" : "Search by reference, e.g. WM-2481"}
              className={`w-full min-w-0 border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 ${mode === "number" ? "font-mono" : ""}`}
            />
          </div>
          <button
            onClick={() => setMode((m) => (m === "text" ? "number" : "text"))}
            className={`flex-shrink-0 whitespace-nowrap border-l border-slate-900 px-3 py-2 text-xs font-medium sm:text-sm ${mode === "number" ? "bg-slate-900 text-white" : "bg-transparent text-slate-900"
              }`}
          >
            by number
          </button>
        </div>

        <button
          onClick={() => fetchMessages(query, mode)}
          title="Refresh"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white"
        >
          {loading ? <Loader2 size={16} className="animate-spin text-slate-400" /> : <RefreshCcw size={16} className="text-slate-900" />}
        </button>

        {/* Request Interview Button */}
        <button
          onClick={Sendmessagehandler}
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
        >
          <MessageSquare size={16} />
          <span className="hidden sm:inline">Message</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 ml-auto rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors border border-red-200"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {(error || actionError) && (
        <div className="mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 sm:mx-6 lg:mx-8">
          {error || actionError}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 px-4 pt-5 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-stone-200 bg-white p-4">
            <div className="text-xs text-slate-500">{s.label}</div>
            <div className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Content: list + detail */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 lg:flex-row lg:p-8">
        {/* List */}
        <div
          className={`flex-1 lg:max-w-[58%] flex-col overflow-hidden rounded-xl border border-stone-200 bg-white ${mobileDetailOpen ? "hidden lg:flex" : "flex"
            }`}
        >
          {/* Job Applications Button — RESTORED */}
          <div className="border-b border-stone-200 px-4 py-3">
            <button
              onClick={() => {
                console.log("Job Application button clicked");
                navigate("/jobApplicationDashboard");
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-600"
            >
              <Briefcase size={18} />
              Job Applications
            </button>
          </div>

          <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
            <span className="text-sm font-semibold">All Request Interview</span>
            <span className="font-mono text-[11px] text-slate-400">
              {loading ? "Loading…" : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
            </span>
          </div>

          <div className="overflow-y-auto">
            {!loading && filtered.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-slate-400">
                {messages.length === 0 && !query ? "No messages yet." : "No messages match that search."}
              </div>
            )}
            {filtered.map((m) => {
              const st = statusStyle[m.status];
              const active = selectedId === m.id;
              const confirming = confirmDeleteId === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => selectMessage(m.id)}
                  className={`group flex cursor-pointer gap-3 border-b border-stone-200 px-4 py-3 hover:bg-stone-50 ${active ? "bg-blue-50" : "bg-transparent"
                    }`}
                >
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${active ? "bg-blue-700 text-white" : "bg-stone-200 text-slate-900"
                      }`}
                  >
                    {m.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="whitespace-nowrap text-sm font-semibold">{m.name}</span>
                      <span className="flex-shrink-0 font-mono text-[11px] text-slate-400">{m.time}</span>
                    </div>
                    <div className="mt-0.5 text-sm font-medium">{m.subject}</div>
                    <div className="mt-0.5 truncate text-xs text-slate-500">{m.preview}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                        {m.ref}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${st.pill}`}>
                        {st.label}
                      </span>
                      <span className="text-[10px] text-slate-400">{m.channel}</span>
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 items-start">
                    {confirming ? (
                      <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5">
                        <button
                          onClick={() => deleteMessage(m.id)}
                          className="rounded-md bg-red-600 px-2 py-1 text-[11px] font-semibold text-white"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-md border border-stone-200 px-2 py-1 text-[11px] font-medium text-slate-500"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteId(m.id);
                        }}
                        title="Delete message"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 opacity-100 hover:bg-stone-100 lg:opacity-0 lg:group-hover:opacity-100"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail */}
        {selected && (
          <div
            className={`flex-1 flex-col rounded-xl border border-stone-200 bg-white p-5 sm:p-6 ${mobileDetailOpen ? "flex" : "hidden lg:flex"
              }`}
          >
            <button
              onClick={() => setMobileDetailOpen(false)}
              className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 lg:hidden"
            >
              <ArrowLeft size={15} /> Back to messages
            </button>

            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[11px] text-slate-400">{selected.ref}</span>
                <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">{selected.subject}</h2>
              </div>
              <span
                className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyle[selected.status].pill}`}
              >
                {statusStyle[selected.status].label}
              </span>
            </div>

            <div className="my-5 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                {selected.initials}
              </div>
              <div>
                <div className="text-sm font-semibold">{selected.name}</div>
                <div className="text-xs text-slate-500">
                  {selected.channel} · {selected.date}
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed">{selected.preview}</p>

            <div className="mt-5 space-y-3 border-t border-stone-200 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="flex-shrink-0 text-slate-400" />
                <span className="font-mono text-slate-500">{selected.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} className="flex-shrink-0 text-slate-400" />
                <span className="font-mono text-slate-500">{selected.phone}</span>
              </div>

              {selected.worker_id && (
                <div className="flex items-center gap-2 text-sm">
                  <ExternalLink size={14} className="flex-shrink-0 text-blue-500" />
                  <a
                    href={`/worker_details/${selected.worker_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium cursor-pointer"
                  >
                    View Worker Profile
                  </a>
                </div>
              )}
            </div>

            <div className="mt-auto flex gap-2.5 pt-5">
              <button
                onClick={() => markResolved(selected.id)}
                disabled={selected.status === "resolved"}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium ${selected.status === "resolved"
                  ? "cursor-not-allowed bg-stone-100 text-slate-400"
                  : "bg-slate-900 text-white"
                  }`}
              >
                <CheckCircle2 size={14} />
                {selected.status === "resolved" ? "Resolved" : "Mark resolved"}
              </button>

              {confirmDeleteId === selected.id ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteMessage(selected.id)}
                    className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDeleteId(selected.id)}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100"
                >
                  <Trash2 size={14} /> Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
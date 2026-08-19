

function Chat() {
  return (
    <a
  href="https://wa.me/233241450347"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat on WhatsApp"
  className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-success px-4 py-3 text-sm font-semibold text-white shadow-elevated ring-4 ring-success/15 transition hover:scale-[1.03]"
>
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
    className="lucide lucide-message-circle h-5 w-5"
    aria-hidden="true"
  >
    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
  </svg>
  <span className="hidden sm:inline">Chat on WhatsApp</span>
</a>

  )
}

export default Chat

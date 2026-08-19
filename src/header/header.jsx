import { useEffect, useState } from "react";



const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token",token);
    if (!token) return;

    fetch(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid/expired token");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          className="flex items-center gap-2 shrink-0 active"
          href="/"
          data-status="active"
          aria-current="page"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
            S
          </span>
          <span className="text-lg font-bold tracking-tight text-navy">
            Skillavy
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          <a href="/browse" className="btn-ghost">
            Browse Talent
          </a>
          <a href="/jobs" className="btn-ghost">
            Browse Jobs
          </a>
          <a href="/how-it-works" className="btn-ghost">
            How It Works
          </a>
          <a href="/pricing" className="btn-ghost">
            Pricing
          </a>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="hidden items-center gap-3 lg:flex">
  {user ? (
    user.role === "worker" ? (
      <div className="flex items-center gap-3">
        <a href="/workerprofile" className="flex items-center gap-2 text-sm font-medium text-navy hover:opacity-80">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </span>
          {user.name || "My Profile"}
        </a>
        <button onClick={handleLogout} className="btn-ghost text-sm">Logout</button>
      </div>
    ) : (
      <div className="flex items-center gap-3">
        <a href="/clintprofile" className="flex items-center gap-2 text-sm font-medium text-navy hover:opacity-80">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </span>
          {user.name || "My Profile"}
        </a>
        <button onClick={handleLogout} className="btn-ghost text-sm">Logout</button>
      </div>
    )
  ) : (
    <a href="/signin" className="btn-ghost text-sm">
      Sign In
    </a>
  )}
</div>
        
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
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
            className="lucide lucide-menu h-5 w-5"
            aria-hidden="true"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
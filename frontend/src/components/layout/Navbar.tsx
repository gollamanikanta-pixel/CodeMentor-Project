import { Highlighter, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ApiClientError, getHealth } from "../../api/client";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/playground", label: "Playground" },
  { to: "/projects", label: "Projects" },
  { to: "/quiz-history", label: "Quiz History" },
  { to: "/settings", label: "Settings" },
  { to: "/help", label: "Help" },
];

type ConnectionState = "checking" | "online" | "offline";

function ConnectionBadge() {
  const [state, setState] = useState<ConnectionState>("checking");

  useEffect(() => {
    let cancelled = false;

    getHealth()
      .then(() => {
        if (!cancelled) setState("online");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState("offline");
        if (!(err instanceof ApiClientError)) {
          console.error("Unexpected error checking backend health:", err);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const styles: Record<ConnectionState, string> = {
    checking: "bg-ink-faint",
    online: "bg-verified",
    offline: "bg-flag",
  };

  const labels: Record<ConnectionState, string> = {
    checking: "Checking backend…",
    online: "Backend connected",
    offline: "Backend offline",
  };

  return (
    <span className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink-soft sm:flex">
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${styles[state]}`}
        aria-hidden="true"
      />
      {labels[state]}
    </span>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <Highlighter className="h-6 w-6 text-highlighter" strokeWidth={2.25} aria-hidden="true" />
          <span className="font-display text-xl font-medium tracking-tight text-ink">
            CodeMentor
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-ink underline decoration-highlighter decoration-2 underline-offset-8"
                    : "text-ink-soft hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ConnectionBadge />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-md border border-line p-2 text-ink md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-surface text-ink" : "text-ink-soft"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

import { Link, useLocation } from "react-router";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/cfa", label: "CFA" },
  { to: "/frm", label: "FRM" },
  { to: "/fm", label: "FM" },
  { to: "/demo", label: "Demo Lectures" },
];

/** Minimal top nav — always visible. */
export default function Nav() {
  const { pathname } = useLocation();

  return (
    <header className="ft-nav is-visible">
      <Link to="/" aria-label="FinTree Education — home" style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
        <img
          src="/brand/fintree-logo-tab.png"
          alt="FinTree Education"
          className="ft-brand"
        />
      </Link>
      <nav className="flex items-center gap-1 md:gap-2" aria-label="Primary">
        {LINKS.map((l) => {
          const active = pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              className={`ft-nav-link${active ? " is-active" : ""}`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

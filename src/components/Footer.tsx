export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--ft-card-bg-inverse)",
        color: "var(--ft-ink-inverse)",
        padding: "1.75rem var(--ft-gutter)",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div
        style={{
          maxWidth: "var(--ft-content-max)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <img
          src="/brand/fintree-logo-white.png"
          alt="FinTree Education"
          style={{ height: 34, width: "auto", display: "block" }}
        />
        <p
          style={{
            color: "var(--ft-ink-inverse-soft)",
            fontSize: "0.75rem",
            lineHeight: 1.6,
            maxWidth: 720,
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} FinTree Education Private Limited · CFA® Institute does not
          endorse, promote, review or warrant the accuracy or quality of the products and services
          offered by FinTree. GARP does not endorse any pass rates that may be claimed by FinTree.
        </p>
      </div>
    </footer>
  );
}

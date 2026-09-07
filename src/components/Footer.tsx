import { SITE } from "../data/site";

export default function Footer() {
  return (
    <footer className="ft-footer">
      <div className="ft-footer-inner">
        <div className="ft-footer-top">
          <img
            src="/brand/fintree-logo-white.png"
            alt="FinTree Education"
            className="ft-footer-logo"
          />
          <nav className="ft-footer-socials" aria-label="FinTree social media">
            {SITE.socials.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                {social.name}
              </a>
            ))}
          </nav>
        </div>
        <p className="ft-footer-legal">
          © {new Date().getFullYear()} FinTree Education Private Limited · CFA® Institute does not
          endorse, promote, review or warrant the accuracy or quality of the products and services
          offered by FinTree. GARP does not endorse any pass rates that may be claimed by FinTree.
        </p>
      </div>
    </footer>
  );
}

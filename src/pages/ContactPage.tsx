import { CardStack, StackCard } from "../components/CardStack";
import { SITE } from "../data/site";

const contactItems = [
  {
    label: "Support",
    value: SITE.support,
    href: `tel:${SITE.support.replace(/\s/g, "")}`,
  },
  {
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
  },
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
];

export default function ContactPage() {
  return (
    <CardStack>
      <StackCard label="Contact FinTree">
        <div className="flex flex-col justify-center h-full">
          <p className="ft-label ft-reveal">Contact us</p>
          <h1
            className="ft-title ft-reveal"
            data-delay="1"
            style={{ margin: "0.75rem 0 1rem" }}
          >
            Talk to the FinTree team.
          </h1>
          <p className="ft-sub ft-reveal" data-delay="2" style={{ maxWidth: 680 }}>
            Call, email, or visit our Pune centre. We are happy to help you choose
            the right programme and learning format.
          </p>

          <div className="grid gap-4 md:grid-cols-3 mt-10 ft-reveal" data-delay="2">
            {contactItems.map((item) => (
              <a
                key={item.label}
                className="ft-tile"
                href={item.href}
                style={{ padding: "1.5rem", color: "inherit", textDecoration: "none" }}
              >
                <p className="ft-label">{item.label}</p>
                <p style={{ fontWeight: 700, marginTop: "0.5rem" }}>{item.value}</p>
              </a>
            ))}
          </div>

          <address
            className="ft-tile ft-reveal"
            data-delay="3"
            style={{ padding: "1.5rem", marginTop: "1rem", fontStyle: "normal" }}
          >
            <p className="ft-label">Visit us</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <p style={{ fontWeight: 700, lineHeight: 1.6, marginTop: "0.5rem" }}>
                {SITE.address}
              </p>
            </a>
            <p style={{ color: "var(--ft-ink-soft)", marginTop: "0.75rem" }}>{SITE.hours}</p>
          </address>
        </div>
      </StackCard>
    </CardStack>
  );
}

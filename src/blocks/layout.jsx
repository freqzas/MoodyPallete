import { Body, Button, Divider, Heading, Section } from "./primitives";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between gap-4 border-b border-mp-text/10 bg-mp-surface px-6 py-4 @2xl:px-10">
      <div className="flex items-center gap-2.5">
        <span className="h-7 w-7 rounded-lg bg-mp-primary" />
        <span className="font-['Space_Grotesk'] text-base font-semibold tracking-[-0.02em] text-mp-text">
          Northwind
        </span>
      </div>

      <div className="hidden items-center gap-7 @2xl:flex">
        {["Product", "Pricing", "Docs", "Company"].map((item) => (
          <span key={item} className="text-sm font-medium text-mp-muted">
            {item}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" className="hidden @xl:inline-block">
          Sign in
        </Button>
        <Button>Get started</Button>
      </div>
    </nav>
  );
}

export function CtaBanner() {
  return (
    <Section>
      <div className="rounded-2xl border border-mp-text/10 bg-mp-primary/10 px-6 py-10 text-center @2xl:px-12">
        <Heading size="lg">Ready to see it in your own colours?</Heading>

        <Body className="mx-auto mt-3 max-w-lg">
          Every element on this page is driven by the eight palette roles. Change
          one and the whole page moves with it.
        </Body>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button>Start free</Button>
          <Button variant="ghost">Book a demo</Button>
        </div>
      </div>
    </Section>
  );
}

export function FooterSimple() {
  const columns = [
    { title: "Product", links: ["Overview", "Pricing", "Changelog"] },
    { title: "Company", links: ["About", "Careers", "Contact"] },
    { title: "Resources", links: ["Docs", "Guides", "Support"] },
  ];

  return (
    <footer className="border-t border-mp-text/10 bg-mp-surface px-6 py-10 @2xl:px-10">
      <div className="grid gap-8 @2xl:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-7 w-7 rounded-lg bg-mp-primary" />
            <span className="font-['Space_Grotesk'] text-base font-semibold tracking-[-0.02em] text-mp-text">
              Northwind
            </span>
          </div>

          <Body className="mt-3 max-w-xs">
            A placeholder product, so the colours do the talking.
          </Body>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="mb-3 text-xs font-black uppercase tracking-wide text-mp-text">
              {column.title}
            </p>

            <ul className="grid gap-2">
              {column.links.map((link) => (
                <li key={link} className="text-sm text-mp-muted">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Divider className="my-7" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-mp-muted">
          &copy; 2026 Northwind. All rights reserved.
        </p>

        <div className="flex gap-5">
          {["Privacy", "Terms", "Status"].map((item) => (
            <span key={item} className="text-xs text-mp-muted">
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

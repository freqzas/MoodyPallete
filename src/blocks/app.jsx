import {
  Body,
  Button,
  Card,
  Divider,
  Eyebrow,
  Heading,
  Section,
} from "./primitives";

export function DashboardPanel() {
  const metrics = [
    ["Revenue", "$48.2k", "+12.4%"],
    ["Active users", "3,214", "+4.1%"],
    ["Churn", "1.8%", "-0.3%"],
  ];

  // Plain divs rather than a charting library -- the point is the palette.
  const bars = [42, 58, 37, 71, 64, 88, 76, 95, 61, 79, 84, 68];

  const nav = ["Overview", "Reports", "Customers", "Billing", "Settings"];

  return (
    <div className="grid @3xl:grid-cols-[200px_1fr]">
      <aside className="border-b border-mp-text/10 bg-mp-surface p-5 @3xl:border-b-0 @3xl:border-r">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="h-7 w-7 rounded-lg bg-mp-primary" />
          <span className="font-['Space_Grotesk'] text-sm font-semibold text-mp-text">
            Northwind
          </span>
        </div>

        <ul className="flex gap-2 overflow-x-auto @3xl:grid @3xl:gap-1 @3xl:overflow-visible">
          {nav.map((item, index) => (
            <li
              key={item}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${
                index === 0
                  ? "bg-mp-primary/15 text-mp-primary-ink"
                  : "text-mp-muted"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <div className="p-6 @2xl:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Last 30 days</Eyebrow>
            <Heading size="md">Overview</Heading>
          </div>

          <Button>Export</Button>
        </div>

        <div className="grid gap-4 @2xl:grid-cols-3">
          {metrics.map(([label, value, delta]) => (
            <Card key={label}>
              <p className="text-xs font-black uppercase tracking-wide text-mp-muted">
                {label}
              </p>

              <p className="mt-2 font-['Space_Grotesk'] text-2xl font-semibold tracking-[-0.03em] text-mp-text">
                {value}
              </p>

              <p className="mt-1 text-xs font-bold text-mp-primary-ink">
                {delta}
              </p>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-mp-text">Weekly volume</p>
            <span className="rounded-full bg-mp-primary/15 px-2.5 py-1 text-[10px] font-black uppercase text-mp-primary-ink">
              Live
            </span>
          </div>

          <div className="flex h-32 items-end gap-1.5">
            {bars.map((height, index) => (
              <div
                key={index}
                className={`flex-1 rounded-t ${
                  index === bars.length - 5 ? "bg-mp-primary" : "bg-mp-primary/30"
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          <Divider className="my-5" />

          <div className="flex items-center justify-between text-xs text-mp-muted">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function FormSignup() {
  const fields = [
    ["Full name", "Dana Whitfield"],
    ["Work email", "dana@northwind.co"],
    ["Password", "••••••••••"],
  ];

  return (
    <Section>
      <div className="mx-auto max-w-md">
        <Card className="@2xl:p-8">
          <Eyebrow>Create account</Eyebrow>
          <Heading size="md">Start your first project</Heading>

          <Body className="mt-2 text-sm">
            Free while you are trying things out. No card needed.
          </Body>

          <div className="mt-6 grid gap-4">
            {fields.map(([label, placeholder]) => (
              <div key={label}>
                <p className="mb-1.5 text-xs font-bold text-mp-text">{label}</p>

                <div className="flex h-11 items-center rounded-lg border border-mp-text/15 bg-mp-bg/40 px-3">
                  <span className="text-sm text-mp-muted">{placeholder}</span>
                </div>
              </div>
            ))}

            <label className="flex items-start gap-2.5 text-xs leading-5 text-mp-muted">
              <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-mp-text/25 bg-mp-primary/20" />
              Send me occasional product notes. No newsletters.
            </label>

            <Button className="w-full">Create account</Button>
          </div>

          <Divider className="my-6" />

          <p className="text-center text-xs text-mp-muted">
            Already have an account?{" "}
            <span className="font-bold text-mp-primary-ink">Sign in</span>
          </p>
        </Card>
      </div>
    </Section>
  );
}

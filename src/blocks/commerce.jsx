import {
  Body,
  Button,
  Card,
  Divider,
  Eyebrow,
  Heading,
  Section,
} from "./primitives";

export function PricingTiers() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      note: "For trying the idea out.",
      features: ["1 project", "Community support", "Basic export"],
      featured: false,
    },
    {
      name: "Studio",
      price: "$24",
      note: "For working designers.",
      features: ["Unlimited projects", "Priority support", "Full export", "Share links"],
      featured: true,
    },
    {
      name: "Team",
      price: "$79",
      note: "For shared systems.",
      features: ["Everything in Studio", "Shared libraries", "Roles and access"],
      featured: false,
    },
  ];

  return (
    <Section>
      <div className="mb-8 max-w-xl">
        <Eyebrow>Pricing</Eyebrow>
        <Heading>Simple plans, no surprises.</Heading>
      </div>

      <div className="grid gap-4 @3xl:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl border p-6 ${
              tier.featured
                ? "border-mp-primary bg-mp-primary/10"
                : "border-mp-text/10 bg-mp-surface"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black uppercase tracking-wide text-mp-text">
                {tier.name}
              </p>

              {tier.featured && (
                <span className="rounded-full bg-mp-primary px-2.5 py-1 text-[10px] font-black uppercase text-mp-on-primary">
                  Popular
                </span>
              )}
            </div>

            <p className="mt-4 font-['Space_Grotesk'] text-4xl font-semibold tracking-[-0.04em] text-mp-text">
              {tier.price}
              <span className="ml-1 text-sm font-medium text-mp-muted">/mo</span>
            </p>

            <p className="mt-2 text-sm text-mp-muted">{tier.note}</p>

            <Divider className="my-5" />

            <ul className="grid gap-2.5">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-mp-muted"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mp-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={tier.featured ? "primary" : "ghost"}
              className="mt-6 w-full"
            >
              Choose {tier.name}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function CardList() {
  const items = [
    ["Aurora Desk Lamp", "Warm dimmable brass", "$148"],
    ["Meridian Chair", "Oak frame, wool seat", "$390"],
    ["Halden Shelf", "Wall mounted, 90cm", "$215"],
    ["Cove Side Table", "Powder-coated steel", "$132"],
  ];

  return (
    <Section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Catalogue</Eyebrow>
          <Heading size="md">New this season</Heading>
        </div>

        <Button variant="ghost">View all</Button>
      </div>

      <div className="grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-4">
        {items.map(([name, detail, price]) => (
          <Card key={name} className="flex flex-col">
            <div className="mb-4 h-28 rounded-lg bg-mp-primary/15" />

            <p className="text-sm font-bold text-mp-text">{name}</p>
            <p className="mt-1 text-xs leading-5 text-mp-muted">{detail}</p>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="font-['Space_Grotesk'] text-lg font-semibold text-mp-text">
                {price}
              </span>

              <Button className="px-3 py-1.5 text-xs">Add</Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function CheckoutSummary() {
  const lines = [
    ["Meridian Chair", "1", "$390.00"],
    ["Aurora Desk Lamp", "2", "$296.00"],
    ["Shipping", "—", "$18.00"],
  ];

  return (
    <Section>
      <div className="grid gap-6 @4xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <Eyebrow>Order</Eyebrow>
          <Heading size="sm">Review your basket</Heading>

          <div className="mt-5 grid gap-4">
            {lines.map(([name, qty, price]) => (
              <div key={name}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="h-10 w-10 shrink-0 rounded-lg bg-mp-primary/15" />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-mp-text">
                        {name}
                      </p>
                      <p className="text-xs text-mp-muted">Qty {qty}</p>
                    </div>
                  </div>

                  <span className="shrink-0 text-sm font-bold text-mp-text">
                    {price}
                  </span>
                </div>

                <Divider className="mt-4" />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-black uppercase tracking-wide text-mp-text">
              Total
            </span>
            <span className="font-['Space_Grotesk'] text-2xl font-semibold text-mp-text">
              $704.00
            </span>
          </div>
        </Card>

        <Card>
          <Eyebrow>Payment</Eyebrow>

          <div className="mt-3 grid gap-3">
            {["Card number", "Name on card"].map((label) => (
              <div key={label}>
                <p className="mb-1.5 text-xs font-bold text-mp-text">{label}</p>
                <div className="h-10 rounded-lg border border-mp-text/15 bg-mp-bg/40" />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3">
              {["Expiry", "CVC"].map((label) => (
                <div key={label}>
                  <p className="mb-1.5 text-xs font-bold text-mp-text">{label}</p>
                  <div className="h-10 rounded-lg border border-mp-text/15 bg-mp-bg/40" />
                </div>
              ))}
            </div>
          </div>

          <Button className="mt-5 w-full">Pay $704.00</Button>

          <Body className="mt-3 text-center text-xs">
            Encrypted and refundable for 30 days.
          </Body>
        </Card>
      </div>
    </Section>
  );
}

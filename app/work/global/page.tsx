import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleDashed, Clock3 } from "lucide-react";

export const metadata: Metadata = {
  title: "GLOBAL — case study · Adam Calliste",
  description:
    "GLOBAL is an international money transfer app designed and built by Adam Calliste: research plan, design system, 28 screens in light and dark, an interactive Figma prototype and a working coded prototype. Usability testing in progress.",
};

const LIVE_URL = "/global.html";
const FIGMA_URL =
  "https://www.figma.com/proto/BoeF9E7Ug9TG1ufPnzuhEw/GLOBAL?node-id=66-13700&starting-point-node-id=66-13700&page-id=1%3A10&scaling=scale-down";

const C = {
  bg: "#0b0d13",
  page:
    "radial-gradient(1200px 800px at 20% -10%, rgba(93,97,240,0.24), transparent 60%),radial-gradient(1000px 700px at 120% 10%, rgba(237,75,214,0.10), transparent 50%),#0b0d13",
  fg: "#F3F5FA",
  body: "#DFE4F0",
  mist: "#BAC2D6",
  line: "rgba(255,255,255,0.10)",
  card: "rgba(255,255,255,0.05)",
  iris: "#5B5FEF",
  brand: "#6358FF",
  amber: "#F59E0B",
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-sm font-medium px-3.5 py-1.5 rounded-full"
      style={{ background: "rgba(245,158,11,0.14)", color: "#FCD34D", border: "1px solid rgba(245,158,11,0.35)" }}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: C.amber }} />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.amber }} />
      </span>
      {children}
    </span>
  );
}

function LinkButton({
  href,
  children,
  primary,
  external,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  external?: boolean;
}) {
  const style = primary
    ? { backgroundImage: `linear-gradient(90deg, ${C.iris}, ${C.amber})`, color: "#0b0d13" }
    : { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition hover:opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-[rgba(91,95,239,0.45)]"
      style={style}
    >
      {children}
    </a>
  );
}

function Section({ n, title, children, wide }: { n: string; title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <section className="py-14 sm:py-20 border-t" style={{ borderColor: C.line }} aria-labelledby={`s-${n}`}>
      <div className={wide ? "" : "max-w-3xl"}>
        <p className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: C.brand }}>
          {n}
        </p>
        <h2 id={`s-${n}`} className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: C.fg }}>
          {title}
        </h2>
      </div>
      <div className="mt-6 space-y-5 text-lg leading-relaxed" style={{ color: C.body }}>
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="max-w-3xl">{children}</p>;
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <CheckCircle2 size={20} className="mt-1 shrink-0" style={{ color: C.brand }} aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Stat({ value, label, source, href }: { value: string; label: string; source: string; href: string }) {
  return (
    <div className="rounded-2xl p-6 border" style={{ background: C.card, borderColor: C.line }}>
      <p className="text-4xl font-bold tracking-tight" style={{ color: C.fg }}>
        {value}
      </p>
      <p className="mt-2 text-base" style={{ color: C.body }}>
        {label}
      </p>
      <a href={href} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm underline-offset-2 hover:underline" style={{ color: C.mist }}>
        {source} <ArrowUpRight size={14} />
      </a>
    </div>
  );
}

function Phone({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <Image src={src} alt={alt} width={394} height={852} className="w-full max-w-[260px] h-auto drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]" />
      <figcaption className="text-sm text-center" style={{ color: C.mist }}>
        {caption}
      </figcaption>
    </figure>
  );
}

const sources = [
  ["World Bank — Remittance Prices Worldwide, Q1 2025", "https://remittanceprices.worldbank.org/sites/default/files/rpw_main_report_and_annex_q125_1_0.pdf"],
  ["FSB — G20 Roadmap for Cross-border Payments: progress report for 2025", "https://www.fsb.org/2025/10/g20-roadmap-for-cross-border-payments-consolidated-progress-report-for-2025/"],
  ["FXC Intelligence — G20 cross-border payments roadmap KPIs, 2025", "https://www.fxcintel.com/research/reports/ct-retail-payments-g20-cross-border-roadmap-2025"],
  ["UK Finance — Annual Fraud Report 2025", "https://www.ukfinance.org.uk/news-and-insight/press-release/fraud-report-2025-press-release"],
];

export default function GlobalCaseStudy() {
  return (
    <div className="min-h-screen" style={{ background: C.page, color: C.body }}>
      <header className="sticky top-0 z-40 backdrop-blur bg-[#101216]/75 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tight text-xl" style={{ color: C.iris }}>
            Adam <span style={{ color: C.fg }}>Calliste</span>
          </Link>
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm opacity-90 hover:opacity-100" style={{ color: C.body }}>
            <ArrowLeft size={16} /> All projects
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Hero */}
        <section className="pt-16 sm:pt-24 pb-12">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: C.mist }}>
            Case study · Fintech · 2026
          </p>
          <h1 className="mt-4 text-6xl sm:text-8xl font-extrabold tracking-tight" style={{ color: C.fg }}>
            GLOBAL
          </h1>
          <p className="mt-5 max-w-2xl text-xl sm:text-2xl leading-snug" style={{ color: C.body }}>
            An international money transfer app that shows exactly what arrives, and when.
          </p>
          <p className="mt-5 text-base" style={{ color: C.mist }}>
            Designed and built by <strong style={{ color: C.fg }}>Adam Calliste</strong> · Solo project
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Pill>Usability testing in progress</Pill>
            <span className="text-sm" style={{ color: C.mist }}>
              Research and test results will be added here once the sessions have run.
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={LIVE_URL} primary external>
              Try the live app <ArrowUpRight size={16} />
            </LinkButton>
            <LinkButton href={FIGMA_URL} external>
              Open the Figma prototype <ArrowUpRight size={16} />
            </LinkButton>
          </div>
          <div className="mt-12 overflow-hidden rounded-3xl border" style={{ borderColor: C.line }}>
            <Image
              src="/projects/global.png"
              alt="Three GLOBAL screens: the transfer breakdown, the home screen and transfer tracking in dark mode"
              width={1600}
              height={1200}
              priority
              className="w-full h-auto"
            />
          </div>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Role", "Product designer, solo project"],
              ["Platform", "iOS-sized mobile app, coded as a web prototype"],
              ["Deliverables", "Research plan, flows, wireframes, design system, UI, prototypes"],
              ["Status", "Design and build complete · usability testing in progress"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm uppercase tracking-[0.18em]" style={{ color: C.mist }}>
                  {k}
                </dt>
                <dd className="mt-1.5" style={{ color: C.fg }}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <Section n="01" title="The challenge">
          <P>
            Sending money abroad asks people to commit before they can see the whole picture. The cost is split across a
            visible fee, an exchange rate and sometimes a margin hidden inside that rate. Arrival is promised as a range of
            working days. One wrong character in an account number can send money to the wrong place, or nowhere.
          </P>
          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            <Stat value="6.49%" label="Average cost of sending $200 abroad, Q1 2025" source="World Bank" href={sources[0][1]} />
            <Stat value="35.4%" label="Share of retail cross-border payments that arrived within an hour in 2025" source="FSB, via FXC Intelligence" href={sources[2][1]} />
            <Stat value="£450.7m" label="Lost to authorised push payment scams in the UK in 2024" source="UK Finance" href={sources[3][1]} />
          </div>
          <p className="max-w-3xl text-base" style={{ color: C.mist }}>
            These published figures describe the market, not GLOBAL’s users. They frame the problem; the interviews will test it.
          </p>
        </Section>

        <Section n="02" title="Role and scope">
          <P>
            A solo project covering the whole product process: problem framing, a research plan, user flows and information
            architecture, wireframes, a design system, high-fidelity UI in light and dark mode, an interactive Figma
            prototype, a working coded prototype and accessibility testing.
          </P>
        </Section>

        <Section n="03" title="Understanding the users">
          <div className="flex items-center gap-3">
            <Pill>Interviews in progress</Pill>
          </div>
          <P>
            The research plan is ready: six to eight interviews with people who have sent, or tried to send, money abroad
            in the past year. The sessions cover how people compare providers, which fees confuse them, what makes them trust
            an app and how a delayed transfer feels.
          </P>
          <P>
            Until those sessions run, the design rests on assumptions. Each one is logged with the evidence that would change
            it and how it will be tested. None has been confirmed yet.
          </P>
          <ul className="max-w-3xl space-y-3">
            {[
              "People judge a provider by what the recipient gets, more than by the fee.",
              "The exchange-rate margin is the least understood cost.",
              "Some transfers must land as an exact amount, such as rent.",
              "Named stages with times reduce “where is my money?” worry.",
            ].map((a) => (
              <li key={a} className="flex gap-3">
                <CircleDashed size={20} className="mt-1 shrink-0" style={{ color: C.mist }} aria-hidden />
                <span>
                  {a} <span className="text-sm" style={{ color: C.mist }}>· untested</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section n="04" title="Defining the experience">
          <P>The main journey has seven steps, and five principles shape every screen in it.</P>
          <ol className="flex flex-wrap gap-2 text-base">
            {["Choose recipient", "Amount", "Quote", "Payment", "Review", "Authorise", "Track"].map((s, i) => (
              <li key={s} className="rounded-full px-4 py-2 border" style={{ borderColor: C.line, background: C.card, color: C.fg }}>
                <span style={{ color: C.mist }}>{i + 1}</span> {s}
              </li>
            ))}
          </ol>
          <Bullets
            items={[
              "Show the total cost and the amount that arrives before anyone commits.",
              "Give a date, not a range of working days.",
              "Catch mistakes while typing: IBAN format and checksum, plus a name check with the recipient’s bank.",
              "Guarantee the rate for a visible two minutes, and say plainly when it has expired.",
              "Interrupt with a specific scam warning when a payment looks risky.",
            ]}
          />
        </Section>

        <Section n="05" title="Exploring solutions">
          <P>
            Twelve low-fidelity wireframes map the flow before any visual design, followed by user flows for the transfer
            itself, submission and recovery, and the transfer status lifecycle. Showing what you send and what they receive
            side by side, with either one editable, came out of this stage.
          </P>
        </Section>

        <Section n="06" title="Building the interface">
          <P>
            A design system in Figma: 136 variables with light and dark modes, 54 components and a type scale. Every colour
            pair used for text is checked against WCAG 2.2 AA, and all 19 token pairs pass in both themes.
          </P>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
            <Phone src="/work/global/light-recipient.png" alt="Add a recipient screen with country, name, IBAN and BIC fields" caption="Add a recipient" />
            <Phone src="/work/global/light-amount.png" alt="Amount screen showing £250 sent and €290 received" caption="Amount" />
            <Phone src="/work/global/dark-home.png" alt="Home screen in dark mode" caption="Home, dark mode" />
            <Phone src="/work/global/dark-quote.png" alt="Transfer breakdown in dark mode" caption="Breakdown, dark mode" />
          </div>
        </Section>

        <Section n="07" title="The final experience" wide>
          <P>
            28 screens, 18 edge states and 48 sheets, dialogs and toasts. The Figma prototype wires 391 interactions across
            20 flows, and the coded prototype below is the same app running in your browser, with sample data only.
          </P>
          <div className="grid gap-10 items-start pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <Phone src="/work/global/light-home.png" alt="Home screen with balances, an active transfer and recipients" caption="Home" />
              <Phone src="/work/global/light-quote.png" alt="Transfer breakdown with a guaranteed rate timer" caption="Breakdown" />
              <Phone src="/work/global/light-review.png" alt="Review screen before confirming the transfer" caption="Review" />
              <Phone src="/work/global/light-tracking.png" alt="Tracking screen with a dated timeline" caption="Tracking" />
              <Phone src="/work/global/dark-tracking.png" alt="Tracking screen in dark mode" caption="Tracking, dark mode" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <div
                className="hidden sm:block w-[413px] max-w-full aspect-[413/872] overflow-hidden rounded-[2.75rem] border-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                style={{ borderColor: "#1d1f27", background: "#000" }}
              >
                <iframe src={LIVE_URL} title="GLOBAL working prototype" className="w-full h-full block" loading="lazy" />
              </div>
              <p className="hidden sm:block text-sm text-center max-w-[413px]" style={{ color: C.mist }}>
                Try it here, or{" "}
                <a href={LIVE_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2" style={{ color: C.fg }}>
                  open it full screen
                </a>
                . No real money moves.
              </p>
              <div className="sm:hidden flex flex-col items-center gap-3 text-center">
                <LinkButton href={LIVE_URL} primary external>
                  Open the live app <ArrowUpRight size={16} />
                </LinkButton>
                <p className="text-sm" style={{ color: C.mist }}>
                  It opens full screen on your phone. No real money moves.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section n="08" title="Testing and improvement">
          <div className="flex items-center gap-3">
            <Pill>Usability testing in progress</Pill>
          </div>
          <P>
            Round one is five moderated think-aloud sessions built on the six tasks from the brief: send £250 to France,
            make the recipient get exactly €300, explain the total cost, find the arrival date, check a transfer already
            sent, and fix a wrong account detail. Each session measures completion, time, navigation errors, help requests,
            misread fees or status, and a confidence rating. The most important changes are then retested with new people.
          </P>
          <P>Changes so far came from checking the work, not from users:</P>
          <Bullets
            items={[
              "Four colour pairs that failed WCAG AA contrast were fixed; all 19 now pass.",
              "List rows wrap instead of cutting off text at 150% text size.",
              "A full 27-character IBAN now fits its field on a small phone.",
              "The duplicate-recipient notice scrolls into view and is announced to screen readers.",
              "The arrival date on the review screen fits on one line.",
            ]}
          />
          <p className="max-w-3xl flex gap-2 text-base" style={{ color: C.mist }}>
            <Clock3 size={18} className="mt-1 shrink-0" aria-hidden /> Results from the sessions, including any change that
            didn’t help, will be added here.
          </p>
        </Section>

        <Section n="09" title="Outcomes">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl p-6 border" style={{ background: C.card, borderColor: C.line }}>
              <h3 className="text-xl font-semibold" style={{ color: C.fg }}>
                Measured so far
              </h3>
              <ul className="mt-4 space-y-2 text-base">
                <li>axe-core: 0 accessibility violations on 13 screens, light and dark</li>
                <li>Contrast: 19 of 19 token pairs meet WCAG AA in both themes</li>
                <li>No clipped text or sideways scrolling at 150% text size</li>
                <li>End-to-end scripts pass for the main flow, offline sending, a dropped connection, a declined card and an expired quote</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 border" style={{ background: C.card, borderColor: C.line }}>
              <h3 className="text-xl font-semibold" style={{ color: C.fg }}>
                Hypotheses, not results
              </h3>
              <ul className="mt-4 space-y-2 text-base">
                <li>Fewer “where is my money?” contacts, because of dated stages</li>
                <li>Fewer transfers to wrong accounts, because of inline checks and name matching</li>
                <li>More quotes turning into transfers, because the total is clear up front</li>
                <li style={{ color: C.mist }}>None of these has been measured; they would need a live product.</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section n="10" title="Next steps">
          <Bullets
            items={[
              "Run six to eight interviews and turn the findings into a revised problem statement.",
              "Run round one of usability testing with five people.",
              "Fix the most severe issues first, then retest the changed screens with three to five new people.",
              "Update this case study with what was observed.",
            ]}
          />
        </Section>

        <section className="py-14 border-t" style={{ borderColor: C.line }}>
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: C.mist }}>
            Sources
          </h2>
          <ul className="mt-4 space-y-2 text-base">
            {sources.map(([label, href]) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline-offset-2 hover:underline" style={{ color: C.body }}>
                  {label} <ArrowUpRight size={14} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="py-12 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: C.line }}>
          <p style={{ color: C.mist }}>GLOBAL · designed and built by Adam Calliste</p>
          <Link href="/#projects" className="inline-flex items-center gap-2" style={{ color: C.fg }}>
            <ArrowLeft size={16} /> Back to all projects
          </Link>
        </footer>
      </main>
    </div>
  );
}

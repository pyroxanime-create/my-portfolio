import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleDashed, Clock3 } from "lucide-react";

export const metadata: Metadata = {
  title: "KIVO — case study · Adam Calliste",
  description:
    "KIVO is a subscription management app designed and built by Adam Calliste: a working coded prototype on demo data, a design system, 237 screens, sheets and dialogs in light and dark, and a fully wired Figma prototype. Not yet tested with users.",
};

const LIVE_URL = "/kivo.html";
const FIGMA_URL =
  "https://www.figma.com/proto/QVzt4ygQoITrjWHEIAM5Sq/KIVO?node-id=14-2&starting-point-node-id=14-2&page-id=2%3A2&scaling=scale-down";

const C = {
  page:
    "radial-gradient(1200px 800px at 15% -10%, rgba(101,71,245,0.42), transparent 60%),radial-gradient(900px 700px at 115% 5%, rgba(185,168,255,0.12), transparent 55%),#0E0B1F",
  fg: "#F5F3FF",
  body: "#DEDAF5",
  mist: "#ADA7D3",
  line: "rgba(255,255,255,0.10)",
  card: "rgba(255,255,255,0.05)",
  lilac: "#C4B5FF",
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-sm font-medium px-3.5 py-1.5 rounded-full"
      style={{ background: "rgba(196,181,255,0.12)", color: "#E2DAFF", border: "1px solid rgba(196,181,255,0.35)" }}
    >
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.lilac }} aria-hidden />
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
    ? { background: C.lilac, color: "#170F45" }
    : { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition hover:opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-[rgba(196,181,255,0.55)]"
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
        <p className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: C.lilac }}>
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
          <CheckCircle2 size={20} className="mt-1 shrink-0" style={{ color: C.lilac }} aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Phone({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <Image src={src} alt={alt} width={393} height={852} className="w-full max-w-[260px] h-auto drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]" />
      <figcaption className="text-sm text-center" style={{ color: C.mist }}>
        {caption}
      </figcaption>
    </figure>
  );
}

const hypotheses = [
  "The first number people want is a monthly total that counts annual plans as a twelfth, with the yearly figure next to it.",
  "A countdown with the expected first charge gets people to deal with a free trial before it turns into a paid plan.",
  "Step-by-step guidance that saves progress helps people finish cancelling with the provider.",
  "Keeping expected charges visibly apart from recorded ones makes the calendar easier to trust.",
  "People trust detection more when KIVO asks before adding anything it found.",
  "A what-if scenario helps people decide what to keep without feeling pushed either way.",
];

const journeys = [
  "See what you pay each month",
  "Deal with a trial before it charges",
  "Start cancelling a subscription",
  "Check what’s due this month",
  "Look into a possible duplicate",
  "Try cancelling something, as a what-if",
];

export default function KivoCaseStudy() {
  return (
    <div className="min-h-screen" style={{ background: C.page, color: C.body }}>
      <header className="sticky top-0 z-40 backdrop-blur bg-[#0E0B1F]/75 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tight text-xl" style={{ color: C.lilac }}>
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
            Case study · Personal finance · 2026
          </p>
          <h1 className="mt-4 text-6xl sm:text-8xl font-extrabold tracking-tight" style={{ color: C.fg }}>
            KIVO
          </h1>
          <p className="mt-5 max-w-2xl text-xl sm:text-2xl leading-snug" style={{ color: C.body }}>
            A subscription manager that shows what you pay, what’s coming next and how to cancel, without pretending it can
            cancel for you.
          </p>
          <p className="mt-5 text-base" style={{ color: C.mist }}>
            Designed and built by <strong style={{ color: C.fg }}>Adam Calliste</strong> · Solo project
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Pill>Not yet tested with users</Pill>
            <span className="text-sm" style={{ color: C.mist }}>
              Findings will be added here once usability sessions have run.
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
              src="/projects/kivo.png"
              alt="Three KIVO screens: the subscriptions list, Home with £101.82 a month across 11 active subscriptions, and spending by category in dark mode"
              width={1600}
              height={1200}
              priority
              className="w-full h-auto"
            />
          </div>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Role", "Product designer, solo project"],
              ["Platform", "Phone-first web app, with a desktop layout"],
              ["Deliverables", "Coded prototype, design system, final UI in light and dark, interactive Figma prototype"],
              ["Status", "Design and build complete · not yet tested with users"],
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
          <p className="mt-8 max-w-3xl text-base" style={{ color: C.mist }}>
            KIVO is a fictional concept. The banks, people and amounts are made up, and the app never connects to a real
            account. Service names make the sample data realistic, but their prices are illustrative and their marks are
            original letter marks, not brand logos. KIVO can’t cancel anything for you, in the prototype or as designed.
          </p>
        </section>

        <Section n="01" title="The challenge">
          <P>
            Subscriptions are easy to start and easy to lose track of. They charge on different days, on different cards and
            sometimes in different currencies. Free trials turn into paid plans, prices creep up, the same service gets paid for
            twice, and cancelling happens somewhere else, often several screens deep in another app.
          </P>
          <P>
            KIVO’s job is to give one honest picture of what you pay and what’s coming, and to help you act on it. Honest
            means being clear about what it can’t see or do: it can’t see how much you use a service, it can’t cancel for you,
            and an expected charge is not a confirmed one.
          </P>
        </Section>

        <Section n="02" title="Role and scope">
          <P>
            A solo project, built from my own product spec: the subscription engine and demo data, a working coded prototype,
            the visual system, and the final UI rebuilt in Figma with variables, styles and components, a dark mode and a fully
            wired prototype.
          </P>
        </Section>

        <Section n="03" title="Understanding the users">
          <div className="flex items-center gap-3">
            <Pill>Research not started</Pill>
          </div>
          <P>
            No user research has run yet, so the design rests on assumptions. They are listed here so that testing can prove
            them wrong, and none has been confirmed.
          </P>
          <ul className="max-w-3xl space-y-3">
            {hypotheses.map((a) => (
              <li key={a} className="flex gap-3">
                <CircleDashed size={20} className="mt-1 shrink-0" style={{ color: C.mist }} aria-hidden />
                <span>
                  {a} <span className="text-sm" style={{ color: C.mist }}>· untested</span>
                </span>
              </li>
            ))}
          </ul>
          <P>
            The demo account gives every screen something real to show: 14 subscriptions, two of them free trials, one
            cancellation in progress, a failed payment, a possible duplicate, shared plans and a second bank whose access has
            expired.
          </P>
        </Section>

        <Section n="04" title="Defining the experience">
          <P>Six journeys set the main flows, and eight principles shape every screen.</P>
          <ol className="flex flex-wrap gap-2 text-base">
            {journeys.map((s, i) => (
              <li key={s} className="rounded-full px-4 py-2 border" style={{ borderColor: C.line, background: C.card, color: C.fg }}>
                <span style={{ color: C.mist }}>{i + 1}</span> {s}
              </li>
            ))}
          </ol>
          <Bullets
            items={[
              "KIVO never claims to cancel anything. It shows where and how, keeps your progress, and only marks a subscription as cancelled when you confirm it.",
              "Recorded and expected stay apart. Expected charges and estimates are labelled, and plans that vary show an average with a “~”.",
              "No invented links. If KIVO hasn’t checked a provider’s account page, it says so and gives general steps instead of guessing a link.",
              "Ask before acting. Detected subscriptions and possible duplicates wait for your decision, because detection can be wrong.",
              "Suggestions only use what KIVO can check: your charges, verified plan prices and anything you’ve told it. It won’t tell you what to cancel.",
              "Scenarios, not promises. The what-if calculator is labelled as a scenario, and for shared plans it shows your own share separately.",
              "Scores show their working. The check-up score is the average of four things you can see, and you can turn it off.",
              "Accessible by default: every chart has a text version, colour is never the only cue, and text size and reduced motion are settings.",
            ]}
          />
        </Section>

        <Section n="05" title="Key journeys" wide>
          <P>
            Home leads with the monthly total and anything that needs attention. Every subscription has the same detail page,
            and every one can be cancelled with the same guided steps.
          </P>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
            <Phone src="/work/kivo/light-home.png" alt="Home: £101.82 a month across 11 active subscriptions, a free trial ending in 3 days and items that need attention" caption="Home" />
            <Phone src="/work/kivo/light-subs.png" alt="Your subscriptions: 11 active, 2 trials and 1 cancelled, with search and filters" caption="Subscriptions" />
            <Phone src="/work/kivo/light-detail.png" alt="Netflix Standard at £12.99 a month, next payment Saturday 24 October, with billing details" caption="Subscription detail" />
            <Phone src="/work/kivo/light-trials.png" alt="Your free trials: Figma Professional with 3 days remaining and an expected charge of £15.00 on 17 October" caption="Free trials" />
            <Phone src="/work/kivo/light-cancel.png" alt="Manage cancellation for Stillwater: cancellation started but not confirmed, with the next renewal and how to cancel" caption="Guided cancellation" />
            <Phone src="/work/kivo/light-calendar.png" alt="Your payment calendar for October 2026, with £100.05 expected and marks on each payment day" caption="Payment calendar" />
          </div>
          <p className="max-w-3xl text-base" style={{ color: C.mist }}>
            Cancellation is tracked as a status, not a switch: started, then waiting for the provider’s confirmation. KIVO
            keeps counting the subscription until you confirm it, and looks for the next charge in your bank data so you can tell if it went through.
          </p>
        </Section>

        <Section n="06" title="Building the interface">
          <P>
            A design system in Figma: 81 colour variables, each with its own light and dark value, plus spacing variables, 86
            text styles, 7 effect styles, 92 components and 104 icons. The screens are built from instances of those
            components, and the dark mode is the same frames with the Dark mode switched on.
          </P>
          <P>
            The app’s 70 text and control colour pairings meet WCAG 2.2 AA contrast in both light and dark. Spending categories
            each have an icon and a name as well as a colour.
          </P>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
            <Phone src="/work/kivo/light-insights.png" alt="Your subscription spending: £1,221.83 a year in a donut chart across 8 categories" caption="Spending by category" />
            <Phone src="/work/kivo/light-whatif.png" alt="What if you cancelled: pick subscriptions to see how recurring costs would change, labelled as a scenario" caption="What-if calculator" />
            <Phone src="/work/kivo/dark-home.png" alt="Home in dark mode" caption="Home, dark mode" />
            <Phone src="/work/kivo/dark-calendar.png" alt="Payment calendar in dark mode" caption="Calendar, dark mode" />
          </div>
        </Section>

        <Section n="07" title="The final experience" wide>
          <P>
            237 frames in Figma: 154 screen states, 68 sheets and 15 dialogs, each in light and dark. The Figma prototype wires
            about 1,900 interactions, from tabs and back buttons to sheets, dialogs and switches. The coded prototype below is
            the same app running in your browser on demo data.
          </P>
          <div className="grid gap-10 items-start pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <Phone src="/work/kivo/light-timeline.png" alt="Coming up next: £204.57 expected in the next 30 days, with a notice about a large annual payment" caption="Coming up next" />
              <Phone src="/work/kivo/light-trends.png" alt="How your costs change: monthly commitments over time, recorded and expected" caption="Cost trends" />
              <Phone src="/work/kivo/light-savings.png" alt="Find your best value: opportunities based only on information KIVO can check" caption="Find your best value" />
              <Phone src="/work/kivo/light-shared.png" alt="Shared plans: Household Streaming with £4.33 outstanding and Family Cloud all paid" caption="Shared plans" />
              <Phone src="/work/kivo/light-review.png" alt="Your monthly review: 13 subscriptions to look at, about 3 minutes" caption="Monthly review" />
              <Phone src="/work/kivo/dark-cancel.png" alt="Guided cancellation in dark mode" caption="Cancellation, dark mode" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <div
                className="hidden sm:block w-[413px] max-w-full aspect-[413/872] overflow-hidden rounded-[2.75rem] border-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                style={{ borderColor: "#1b1636", background: "#000" }}
              >
                <iframe src={LIVE_URL} title="KIVO working prototype" className="w-full h-full block" loading="lazy" />
              </div>
              <p className="hidden sm:block text-sm text-center max-w-[413px]" style={{ color: C.mist }}>
                Try it here, or{" "}
                <a href={LIVE_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2" style={{ color: C.fg }}>
                  open it full screen
                </a>
                . Demo data only; no real bank is connected.
              </p>
              <div className="sm:hidden flex flex-col items-center gap-3 text-center">
                <LinkButton href={LIVE_URL} primary external>
                  Open the live app <ArrowUpRight size={16} />
                </LinkButton>
                <p className="text-sm" style={{ color: C.mist }}>
                  It opens full screen on your phone. Demo data only; no real bank is connected.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section n="08" title="Testing and improvement">
          <div className="flex items-center gap-3">
            <Pill>Not yet tested with users</Pill>
          </div>
          <P>
            Nothing here has been tested with users yet. What has been checked so far is the work itself:
          </P>
          <Bullets
            items={[
              "27 automated tests on the subscription engine pass, covering totals, annual and weekly plans, trials that haven’t charged yet, other currencies, plans that vary, cancellations, duplicates, shared plans and the check-up score.",
              "All 70 colour pairings meet WCAG 2.2 AA contrast in light and dark.",
              "The Figma screens were built from the finished app, state by state, and every frame in the prototype leads somewhere.",
            ]}
          />
          <p className="max-w-3xl flex gap-2 text-base" style={{ color: C.mist }}>
            <Clock3 size={18} className="mt-1 shrink-0" aria-hidden /> Results from usability sessions, including any change
            that didn’t help, will be added here.
          </p>
        </Section>

        <Section n="09" title="Next steps">
          <Bullets
            items={[
              "Write a usability test plan around the six journeys, with a task for each assumption above.",
              "Run a first round of moderated sessions with about five people who pay for several subscriptions.",
              "Fix the most severe problems the sessions find, then retest the changed screens with new people.",
              "Update this case study with what was observed.",
            ]}
          />
        </Section>

        <footer className="py-12 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: C.line }}>
          <p style={{ color: C.mist }}>KIVO · designed and built by Adam Calliste</p>
          <Link href="/#projects" className="inline-flex items-center gap-2" style={{ color: C.fg }}>
            <ArrowLeft size={16} /> Back to all projects
          </Link>
        </footer>
      </main>
    </div>
  );
}

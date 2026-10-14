import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleDashed, Clock3 } from "lucide-react";

export const metadata: Metadata = {
  title: "DAYMARK — case study · Adam Calliste",
  description:
    "DAYMARK is a budgeting and savings app designed and built by Adam Calliste: a research plan, lo-fi and mid-fi wireframes, a design system, light and dark screens for phone and desktop, a clickable Figma prototype and a working coded prototype on demo data. Usability testing planned.",
};

const LIVE_URL = "/daymark.html";
const FIGMA_URL =
  "https://www.figma.com/proto/bWCqBeiryO7JvaeEoV4YqT/DAYMARK?node-id=49-8&starting-point-node-id=49-8&page-id=3%3A13&scaling=scale-down";

const C = {
  page:
    "radial-gradient(1200px 800px at 15% -10%, rgba(23,107,87,0.38), transparent 60%),radial-gradient(900px 700px at 115% 5%, rgba(201,242,122,0.10), transparent 55%),#0c1512",
  fg: "#F2F7F3",
  body: "#DCE5DF",
  mist: "#A9B8B0",
  line: "rgba(255,255,255,0.10)",
  card: "rgba(255,255,255,0.05)",
  lime: "#C9F27A",
  green: "#2E8B6E",
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-sm font-medium px-3.5 py-1.5 rounded-full"
      style={{ background: "rgba(201,242,122,0.12)", color: "#DDF5A8", border: "1px solid rgba(201,242,122,0.35)" }}
    >
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.lime }} aria-hidden />
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
    ? { background: C.lime, color: "#0F231C" }
    : { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition hover:opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-[rgba(201,242,122,0.5)]"
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
        <p className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: C.lime }}>
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
          <CheckCircle2 size={20} className="mt-1 shrink-0" style={{ color: C.lime }} aria-hidden />
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
  "Budgets should lead with what’s left, not what’s been spent.",
  "Showing the effect of a new budget amount before saving prevents mistakes.",
  "“Before payday” is the frame people use for short-term planning.",
  "Suggesting a monthly amount makes a savings goal realistic.",
  "Fixing a wrong category has to be quick, undoable and offer to apply to future payments.",
  "People trust an estimate more when they can see how it was worked out.",
];

const tasks = [
  "What’s left for groceries",
  "Raise the eating-out budget",
  "Top category last month",
  "Create a holiday goal",
  "What’s due before payday",
  "Fix a wrong category",
  "Monthly subscription cost",
  "Explain the forecast",
];

export default function DaymarkCaseStudy() {
  return (
    <div className="min-h-screen" style={{ background: C.page, color: C.body }}>
      <header className="sticky top-0 z-40 backdrop-blur bg-[#0c1512]/75 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tight text-xl" style={{ color: C.lime }}>
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
            DAYMARK
          </h1>
          <p className="mt-5 max-w-2xl text-xl sm:text-2xl leading-snug" style={{ color: C.body }}>
            A budgeting and savings app that tells you what’s left, what’s coming before payday, and how it worked that out.
          </p>
          <p className="mt-5 text-base" style={{ color: C.mist }}>
            Designed and built by <strong style={{ color: C.fg }}>Adam Calliste</strong> · Solo project
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Pill>Usability testing planned</Pill>
            <span className="text-sm" style={{ color: C.mist }}>
              Results will be added here once the sessions have run.
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
              src="/projects/daymark.png"
              alt="Three DAYMARK screens: the budgets list, Home with the cash balance and spending this month, and Looking ahead in dark mode"
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
              ["Deliverables", "Research plan, flows, lo-fi and mid-fi wireframes, design system, UI, prototypes"],
              ["Status", "Design and build complete · usability testing planned"],
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
            DAYMARK is a fictional concept. The banks, people and amounts are made up, the app never connects to a real bank,
            and no money moves.
          </p>
        </section>

        <Section n="01" title="The challenge">
          <P>
            Banking apps are good at showing what has already happened. The questions people bring to their money are mostly
            about what happens next: how much is left this month, what is going out before payday, and whether a savings goal
            is on track.
          </P>
          <P>
            DAYMARK’s bet is that answering those questions directly, and showing the working behind every estimate, is more
            useful than another list of transactions. That means being honest when it doesn’t know: a month with no data says
            “No data” instead of £0, and an estimate is always labelled as one.
          </P>
        </Section>

        <Section n="02" title="Role and scope">
          <P>
            A solo project covering the whole product process: problem framing, research questions and hypotheses, the site
            map and task flows, lo-fi and mid-fi wireframes, a design system, high-fidelity UI in light and dark for phone and
            desktop, empty and error states, a clickable Figma prototype, a working coded prototype, an accessibility review
            and a usability test plan.
          </P>
        </Section>

        <Section n="03" title="Understanding the users">
          <div className="flex items-center gap-3">
            <Pill>Research planned</Pill>
          </div>
          <P>
            No user research has run yet, so the design rests on hypotheses. Each one is tied to a usability task that could
            prove it wrong, and none has been confirmed.
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
            Instead of personas, which would need research behind them, the screens are designed around five situations: six
            months of history, a new user with two weeks of data, nothing connected, a refresh that fails, and a bank
            connection that fails.
          </P>
        </Section>

        <Section n="04" title="Defining the experience">
          <P>Eight usability tasks set the main journeys, and seven principles shape every screen.</P>
          <ol className="flex flex-wrap gap-2 text-base">
            {tasks.map((s, i) => (
              <li key={s} className="rounded-full px-4 py-2 border" style={{ borderColor: C.line, background: C.card, color: C.fg }}>
                <span style={{ color: C.mist }}>{i + 1}</span> {s}
              </li>
            ))}
          </ol>
          <Bullets
            items={[
              "Lead with what’s left and what’s next.",
              "Keep recorded and estimated figures visibly apart: solid lines and exact amounts for what happened, dotted lines, ranges and rounding for estimates.",
              "No data is not zero.",
              "Every number can explain itself, with a “How we worked this out” that shows the actual sums.",
              "Undo instead of “Are you sure?”. Dialogs are only for things that can’t be undone.",
              "Never pretend: demo data is labelled on every screen and simulated bank screens say they are simulated.",
              "Accessible by default: WCAG 2.2 AA in both themes, larger text and reduced motion.",
            ]}
          />
        </Section>

        <Section n="05" title="Exploring solutions" wide>
          <P>
            Lo-fi wireframes compared structures before any visual design: three orders for Home, bars or rings for budgets,
            where the fixes live on a transaction, chart-first or list-first for the forecast, and a goal form with or without
            a suggested plan. Mid-fi then settled the words and numbers using the demo data, still in greyscale.
          </P>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <Phone src="/work/daymark/lofi-home.png" alt="Lo-fi wireframe of Home with grey boxes for the balance, spending and bills" caption="Lo-fi: balance first" />
            <Phone src="/work/daymark/midfi-home.png" alt="Mid-fi wireframe of Home with real figures in greyscale" caption="Mid-fi: real content, no colour" />
            <Phone src="/work/daymark/light-home.png" alt="Final Home screen with the dark green balance card and spending this month" caption="Hi-fi" />
          </div>
          <p className="max-w-3xl text-base" style={{ color: C.mist }}>
            Bars won over rings for budgets because they compare at a glance and leave room for a marker showing how far through
            the month you are. Rings were kept for savings goals, where one percentage is the point.
          </p>
        </Section>

        <Section n="06" title="Building the interface">
          <P>
            A design system in Figma: 158 variables across colour, chart and layout collections, each colour with its own
            light and dark value, plus 39 text styles, 55 components with 230 variants and 108 icons. The 12 spending
            categories were checked for colour-blind separation, and colour is never the only cue: every category also has an
            icon and a name.
          </P>
          <P>
            All 21 text and control colour pairs in the accessibility check meet WCAG 2.2 AA in both themes.
          </P>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
            <Phone src="/work/daymark/light-budget-detail.png" alt="Groceries budget with £137.65 remaining and a projection of about £326 by 31 October" caption="Budget detail" />
            <Phone src="/work/daymark/light-category.png" alt="Choose a category sheet with an option to change 11 other Tesco payments" caption="Fixing a category" />
            <Phone src="/work/daymark/dark-home.png" alt="Home screen in dark mode" caption="Home, dark mode" />
            <Phone src="/work/daymark/dark-ahead.png" alt="Looking ahead in dark mode with recorded and estimated balance lines" caption="Looking ahead, dark mode" />
          </div>
        </Section>

        <Section n="07" title="The final experience" wide>
          <P>
            33 phone screens in light and dark, 7 desktop layouts, 15 edge-state screens and 17 sheets, dialogs, toasts and
            modals. The Figma prototype covers all eight tasks across 21 screens, and the coded prototype below is the same
            app running in your browser on demo data.
          </P>
          <div className="grid gap-10 items-start pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <Phone src="/work/daymark/light-home.png" alt="Home with the total cash balance and spending this month" caption="Home" />
              <Phone src="/work/daymark/light-budgets.png" alt="Budgets with £300.18 left across five budgets" caption="Budgets" />
              <Phone src="/work/daymark/light-ahead.png" alt="Looking ahead: an estimated £973 before payday" caption="Looking ahead" />
              <Phone src="/work/daymark/light-goal.png" alt="Japan holiday goal, 62% saved" caption="Savings goal" />
              <Phone src="/work/daymark/light-insights.png" alt="Insights with links to Looking ahead, Recurring payments and Reports, and Ask about your money" caption="Insights" />
              <Phone src="/work/daymark/dark-budgets.png" alt="Budgets in dark mode" caption="Budgets, dark mode" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <div
                className="hidden sm:block w-[413px] max-w-full aspect-[413/872] overflow-hidden rounded-[2.75rem] border-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                style={{ borderColor: "#18231f", background: "#000" }}
              >
                <iframe src={LIVE_URL} title="DAYMARK working prototype" className="w-full h-full block" loading="lazy" />
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
            <Pill>Usability testing planned</Pill>
          </div>
          <P>
            The plan is a first round of about five moderated, think-aloud sessions on the coded prototype at phone size, using
            the eight tasks. Each session records whether the task was completed, time on task, wrong turns and a Single Ease
            Question rating, plus whether anything made the demo look like a real bank connection.
          </P>
          <P>Changes so far came from checking the work, not from users:</P>
          <Bullets
            items={[
              "“Coming up” moved directly under the forecast chart on phones, so the payments due before payday don’t need a long scroll.",
              "Forecast axis labels no longer collide; they are placed by priority and skipped if they would overlap.",
              "The budget estimate explanation gained a separate table of the months it uses, after the figures squeezed into one column on small screens.",
              "Testing caught switches that never looked switched on, wide tables keyboard users couldn’t scroll, and radio buttons with the wrong ARIA; all were fixed.",
              "Design review found three issues still open in the build: a settings label cut off on narrow phones, suggested questions that don’t adapt to a new user, and an error screen that shows a technical message.",
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
                <li>19 automated tests on the money engine pass: refunds, transfers, pending payments, splits, budgets, goals and the forecast</li>
                <li>23 end-to-end checks pass at phone and desktop sizes, including all eight usability tasks</li>
                <li>Contrast: 21 of 21 colour pairs meet WCAG 2.2 AA in light and dark</li>
                <li>Every screen checked at 393px and 1440px wide, in both themes, with no sideways scrolling</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 border" style={{ background: C.card, borderColor: C.line }}>
              <h3 className="text-xl font-semibold" style={{ color: C.fg }}>
                Hypotheses, not results
              </h3>
              <ul className="mt-4 space-y-2 text-base">
                <li>People find what’s left in a budget without doing their own maths</li>
                <li>People can say what’s due before payday without adding anything up</li>
                <li>Seeing the working makes people more confident in an estimate</li>
                <li style={{ color: C.mist }}>None of these has been tested yet.</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section n="10" title="Next steps">
          <Bullets
            items={[
              "Run round one of usability testing with about five people.",
              "Fix the three open issues from design review in the coded prototype.",
              "Fix the most severe problems the sessions find, then retest the changed screens with new people.",
              "Update this case study with what was observed.",
            ]}
          />
        </Section>

        <footer className="py-12 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: C.line }}>
          <p style={{ color: C.mist }}>DAYMARK · designed and built by Adam Calliste</p>
          <Link href="/#projects" className="inline-flex items-center gap-2" style={{ color: C.fg }}>
            <ArrowLeft size={16} /> Back to all projects
          </Link>
        </footer>
      </main>
    </div>
  );
}

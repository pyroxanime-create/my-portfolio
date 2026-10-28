import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleDashed, Clock3 } from "lucide-react";

export const metadata: Metadata = {
  title: "ATLAS — case study · Adam Calliste",
  description:
    "ATLAS is a travel planning and trip management app designed and built by Adam Calliste: a working coded prototype on demo data, a design system, low-fi wireframes, 123 screens, sheets and dialogs with dark versions, and a wired Figma prototype with drag to reorder. Not yet tested with users.",
};

const LIVE_URL = "/atlas.html";
const FIGMA_URL =
  "https://www.figma.com/proto/zSLpBSIlO67JMKtTmlyadM/ATLAS?node-id=54-2&starting-point-node-id=54-2&page-id=1%3A6&scaling=scale-down";

const C = {
  page:
    "radial-gradient(1200px 800px at 15% -10%, rgba(36,92,115,0.62), transparent 60%),radial-gradient(900px 700px at 115% 5%, rgba(242,140,117,0.13), transparent 55%),#0E1622",
  fg: "#F4F6F8",
  body: "#D3DCE4",
  mist: "#9DADBB",
  line: "rgba(255,255,255,0.10)",
  card: "rgba(255,255,255,0.05)",
  teal: "#7FD0C4",
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-sm font-medium px-3.5 py-1.5 rounded-full"
      style={{ background: "rgba(127,208,196,0.12)", color: "#D2F1EC", border: "1px solid rgba(127,208,196,0.35)" }}
    >
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.teal }} aria-hidden />
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
    ? { background: C.teal, color: "#0B1A1F" }
    : { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition hover:opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-[rgba(127,208,196,0.55)]"
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
        <p className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: C.teal }}>
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
          <CheckCircle2 size={20} className="mt-1 shrink-0" style={{ color: C.teal }} aria-hidden />
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
  "Seeing start times change while dragging lets people reshape a day without opening each stop.",
  "An Undo on every change makes people more willing to try a different plan.",
  "On the day itself, people want what’s next and when to leave before anything else.",
  "Showing your own share first makes shared costs easier to keep on top of than a separate expenses app.",
  "Labelling estimates, simulated alerts and illustrative photos makes the rest of the plan easier to trust.",
  "Clear roles and votes make planning with other people feel fairer.",
];

const journeys = [
  "Get started",
  "Plan a trip",
  "Reorder a day",
  "Get through the day",
  "Split a cost",
  "Handle a cancelled flight",
  "Plan with other people",
];

export default function AtlasCaseStudy() {
  return (
    <div className="min-h-screen" style={{ background: C.page, color: C.body }}>
      <header className="sticky top-0 z-40 backdrop-blur bg-[#0E1622]/75 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tight text-xl" style={{ color: C.teal }}>
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
            Case study · Travel · 2026
          </p>
          <h1 className="mt-4 text-6xl sm:text-8xl font-extrabold tracking-tight" style={{ color: C.fg }}>
            ATLAS
          </h1>
          <p className="mt-5 max-w-2xl text-xl sm:text-2xl leading-snug" style={{ color: C.body }}>
            A travel planner that keeps the whole trip in one place, from the first idea to the day itself, and is honest
            about what it can and can’t know.
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
              src="/projects/atlas.webp"
              alt="Three ATLAS screens: Explore with the upcoming Tokyo trip, a stop being dragged to a new place in day 2 with its new start time shown, and Today in Tokyo in dark mode"
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
              ["Deliverables", "Coded prototype, design system, low-fi wireframes, final UI in light and dark, interactive Figma prototype"],
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
            ATLAS is a fictional concept. The trip, people, airline, bookings and prices are made up, and nothing is ever
            booked or sent. Travel times are estimates, alerts are simulated, and the photos are illustrative images made for
            the demo and labelled as such in the app. Ward boundaries on the map come from Japan’s MLIT National Land
            Numerical Information.
          </p>
        </section>

        <Section n="01" title="The challenge">
          <P>
            A trip lives in too many places: bookings in email, ideas in notes and screenshots, the plan in a spreadsheet and
            the costs in a group chat. Plans change on the way, the time zone changes with them, and when something goes wrong,
            like a cancelled flight, it’s hard to see what it affects.
          </P>
          <P>
            ATLAS’s job is to hold the whole trip in one place and make changes feel safe: show what a change will do before
            you make it, and let you undo it if it was wrong. It also has to be honest. Travel times are estimates, and ATLAS
            keeps booking details without ever making or changing a booking.
          </P>
        </Section>

        <Section n="02" title="Role and scope">
          <P>
            A solo project, built from my own product brief: the trip engine and demo data, a working coded prototype, the
            visual system, and the final UI rebuilt in Figma with variables, text styles and components, a dark mode, low-fi
            wireframes, edge cases, desktop layouts and a wired prototype.
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
            The demo trip gives every screen something real to show: Alex and Sam’s seven days in Tokyo, 13–19 April 2027,
            with flights, a hotel and a restaurant booking, a friend in Tokyo who can view but not edit, a pending invite,
            shared costs, a vote, and stops whose opening hours need checking.
          </P>
        </Section>

        <Section n="04" title="Defining the experience">
          <P>Seven journeys set the main flows, and seven principles shape every screen.</P>
          <ol className="flex flex-wrap gap-2 text-base">
            {journeys.map((s, i) => (
              <li key={s} className="rounded-full px-4 py-2 border" style={{ borderColor: C.line, background: C.card, color: C.fg }}>
                <span style={{ color: C.mist }}>{i + 1}</span> {s}
              </li>
            ))}
          </ol>
          <Bullets
            items={[
              "Show the effect before the change. While you drag a stop, its new start time and any problem with opening hours appear on the card before you let go.",
              "Every change can be undone. The confirmation says what changed and how the day was affected, and Undo reverses exactly that change.",
              "Honest about what it knows. Travel times are marked as estimates, demo alerts and photos are labelled, and ATLAS keeps booking details but never makes or changes a booking.",
              "Time zones are explicit. Flights show the zone at each end, and Today shows local time, home time and sunset side by side.",
              "The map always has a text version. A list view gives the same stops, times and travel, and it’s the fallback when the map can’t load.",
              "The trip changes with its dates: planning before, a Today view during, and a recap after.",
              "Accessible by default. Drag and drop also works with the keyboard and is announced to screen readers, and text size and reduced motion are settings.",
            ]}
          />
        </Section>

        <Section n="05" title="Key journeys" wide>
          <P>
            Explore leads to a destination, a destination to a trip, and a trip opens on its itinerary, with the map,
            bookings, budget and people one tab away. During the trip, Today leads.
          </P>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
            <Phone src="/work/atlas/light-explore.webp" alt="Explore: Good morning, Alex, with search and the Tokyo Escape trip coming up in 173 days" caption="Explore" />
            <Phone src="/work/atlas/light-dest.webp" alt="The Tokyo, Japan destination page with an illustrative photo and a button to plan a trip" caption="Destination" />
            <Phone src="/work/atlas/light-trip.webp" alt="Tokyo Escape, 13–19 April 2027: 173 days to go, £1,420 of £2,000, 3 people and 1 thing to check" caption="Trip overview" />
            <Phone src="/work/atlas/light-itinerary.webp" alt="Day 2, Wednesday 14 April: a route map, 9 stops and a timeline starting with landing at Haneda at 7:15 AM" caption="Itinerary" />
            <Phone src="/work/atlas/light-map.webp" alt="The map for day 2, with numbered stops joined in visiting order and a list view button" caption="Map" />
            <Phone src="/work/atlas/light-today.webp" alt="Today in Tokyo during the trip: local time, London time and sunset, with Meiji Jingu up next in 50 minutes" caption="Today, during the trip" />
          </div>
        </Section>

        <Section n="06" title="Drag to reorder" wide>
          <P>
            The signature interaction. Stops move by dragging their handle, and dragging only starts after a small movement so
            taps and scrolling still work. As you drag, the other stops slide aside and the card shows its new start time: here
            10:05 AM, with a warning, because the restaurant opens at 11:00.
          </P>
          <P>
            Let go, and a message says what changed and how travel time moved, with Undo. Dropping a stop on another day’s tab
            puts it where it adds the least travel. With a keyboard, Space picks a stop up, the arrow keys move it and Space
            drops it, and each step is announced.
          </P>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
            <Phone src="/work/atlas/light-drag.webp" alt="Ramen lunch, Harajuku lifted mid-drag, labelled Starts 10:05 AM, check timing, with a striped gap where it was" caption="While dragging" />
            <Phone src="/work/atlas/light-dropped.webp" alt="After the drop: a message says Ramen lunch now starts at 10:05 AM, travel 4 minutes less, opens at 11:00 AM, with Undo" caption="After the drop, with Undo" />
            <Phone src="/work/atlas/dark-drag.webp" alt="The same drag in dark mode" caption="Dark mode" />
          </div>
        </Section>

        <Section n="07" title="Building the interface">
          <P>
            A design system in Figma: 171 colour variables, each with a light and dark value, 10 spacing variables, 109 text
            styles, 115 components (53 of them with variants) and 116 icons. The dark screens are copies of the light ones with
            the Dark mode switched on, so a change to a variable updates both.
          </P>
          <P>
            All 37 text colour pairings in the app meet WCAG 2.2 AA contrast in light and dark. Checking them for this case
            study found two greys that fell short in light mode, faint hint text at 3.8:1 and field borders at 2.9:1, so both
            were darkened in the app and in Figma.
          </P>
          <P>
            The 16 low-fi wireframes are greyscale versions of the finished layouts, made to review flow and content without
            the visual layer. They came after the high-fidelity work, not before it.
          </P>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
            <Phone src="/work/atlas/dark-explore.webp" alt="Explore in dark mode" caption="Explore, dark mode" />
            <Phone src="/work/atlas/dark-itinerary.webp" alt="Itinerary for day 2 in dark mode" caption="Itinerary, dark mode" />
            <Phone src="/work/atlas/dark-map.webp" alt="The day 2 map in dark mode" caption="Map, dark mode" />
            <Phone src="/work/atlas/dark-budget.webp" alt="Budget in dark mode: £1,420 of £2,000, with what’s paid, confirmed and still to spend" caption="Budget, dark mode" />
          </div>
        </Section>

        <Section n="08" title="The final experience" wide>
          <P>
            123 frames in Figma: screens, sheets and dialogs for the whole trip, 18 edge-case states such as being offline, a
            cancelled flight and view-only access, and six desktop layouts, plus 99 dark versions. The prototype has nine
            numbered flows and over 1,000 interactions, including drag to reorder. The coded prototype below is the same app
            running in your browser on demo data.
          </P>
          <div className="grid gap-10 items-start pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <Phone src="/work/atlas/light-planner.webp" alt="The day planner: stops on a time grid for Wednesday 14 April, with ideas to drag in" caption="Day planner" />
              <Phone src="/work/atlas/light-bookings.webp" alt="Bookings: two Meridian Air flights between London Heathrow and Tokyo Haneda, and the hotel stay" caption="Bookings" />
              <Phone src="/work/atlas/light-budget.webp" alt="Budget: your share is £1,420 of £2,000, split into paid, confirmed, estimated and refunded, with settle up" caption="Budget" />
              <Phone src="/work/atlas/light-people.webp" alt="People on the trip: Alex as owner, Sam who can edit, Mia who can view, and a pending invite" caption="People and roles" />
              <Phone src="/work/atlas/light-recap.webp" alt="The trip recap after the trip: seven unforgettable days in Tokyo, 19 places and 9 wards explored" caption="Recap, after the trip" />
              <Phone src="/work/atlas/light-welcome.webp" alt="Welcome: The world, beautifully organised, with Get started" caption="Welcome" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <div
                className="hidden sm:block w-[413px] max-w-full aspect-[413/872] overflow-hidden rounded-[2.75rem] border-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                style={{ borderColor: "#132033", background: "#000" }}
              >
                <iframe src={LIVE_URL} title="ATLAS working prototype" className="w-full h-full block" loading="lazy" />
              </div>
              <p className="hidden sm:block text-sm text-center max-w-[413px]" style={{ color: C.mist }}>
                Try it here, or{" "}
                <a href={LIVE_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2" style={{ color: C.fg }}>
                  open it full screen
                </a>
                . Demo data only; nothing is booked or sent.
              </p>
              <div className="sm:hidden flex flex-col items-center gap-3 text-center">
                <LinkButton href={LIVE_URL} primary external>
                  Open the live app <ArrowUpRight size={16} />
                </LinkButton>
                <p className="text-sm" style={{ color: C.mist }}>
                  It opens full screen on your phone. Demo data only; nothing is booked or sent.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section n="09" title="Testing and improvement">
          <div className="flex items-center gap-3">
            <Pill>Not yet tested with users</Pill>
          </div>
          <P>Nothing here has been tested with users yet. What has been checked so far is the work itself:</P>
          <Bullets
            items={[
              "120 automated checks on the trip engine pass. They cover the schedule (every stop starts after the last one ends plus travel, and set times stay put), moving and undoing stops, route optimisation, splitting and settling costs to the penny, and time zones.",
              "All 37 text colour pairings meet WCAG 2.2 AA contrast in light and dark, after two light-mode greys were darkened.",
              "The Figma screens were built from the finished app, state by state, and every link in the prototype leads to a frame.",
              "Building the Figma file turned up two small bugs, now fixed in the app: a place’s mini-map showing ‘12:00 AM–12:00 AM’, and the first day reading ‘9:30 AM–9:30 AM’.",
            ]}
          />
          <p className="max-w-3xl flex gap-2 text-base" style={{ color: C.mist }}>
            <Clock3 size={18} className="mt-1 shrink-0" aria-hidden /> Results from usability sessions, including any change
            that didn’t help, will be added here.
          </p>
        </Section>

        <Section n="10" title="Next steps">
          <Bullets
            items={[
              "Write a usability test plan around the seven journeys, with a task for each assumption above.",
              "Run a first round of moderated sessions with about five people who have planned a trip with someone else in the last year.",
              "Test drag to reorder on real phones, with a screen reader and with a keyboard as well as by touch.",
              "Fix the most severe problems, retest the changed screens with new people, and update this case study with what was observed.",
            ]}
          />
        </Section>

        <footer className="py-12 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: C.line }}>
          <p style={{ color: C.mist }}>ATLAS · designed and built by Adam Calliste</p>
          <Link href="/#projects" className="inline-flex items-center gap-2" style={{ color: C.fg }}>
            <ArrowLeft size={16} /> Back to all projects
          </Link>
        </footer>
      </main>
    </div>
  );
}

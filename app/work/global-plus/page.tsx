import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleDashed, Clock3, TriangleAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Global Plus — case study · Adam Calliste",
  description:
    "Global Plus is identity verification for the GLOBAL money transfer app, designed and built by Adam Calliste: desk research across six markets, lo-fi wireframes, a design system, 47 screens in light and dark, a wired Figma prototype and a working coded prototype. Usability testing planned.",
};

const LIVE_URL = "/global-plus.html";
const FIGMA_URL =
  "https://www.figma.com/proto/Yore8iaeYjgFaskCiINd1v/Global-Plus?node-id=11-4&starting-point-node-id=11-4&page-id=2%3A7&scaling=scale-down";
const FIGMA_FILE_URL = "https://www.figma.com/design/Yore8iaeYjgFaskCiINd1v/Global-Plus";

const C = {
  bg: "#0b0d13",
  page:
    "radial-gradient(1200px 800px at 20% -10%, rgba(93,97,240,0.24), transparent 60%),radial-gradient(1000px 700px at 120% 10%, rgba(60,203,148,0.10), transparent 50%),#0b0d13",
  fg: "#F3F5FA",
  body: "#DFE4F0",
  mist: "#BAC2D6",
  line: "rgba(255,255,255,0.10)",
  card: "rgba(255,255,255,0.05)",
  iris: "#5B5FEF",
  brand: "#8C93FF",
  amber: "#F59E0B",
  green: "#3CCB94",
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 border" style={{ background: C.card, borderColor: C.line }}>
      <h3 className="text-xl font-semibold" style={{ color: C.fg }}>
        {title}
      </h3>
      <div className="mt-3 text-base leading-relaxed" style={{ color: C.body }}>
        {children}
      </div>
    </div>
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

const markets = [
  ["United Kingdom", "Photo ID and a selfie, plus the passport chip where the phone can read it", "Explicit, with an equal alternative", "In person at a partner branch"],
  ["Germany", "ID card chip and 6-digit PIN", "None needed", "The chip route itself, or a video call"],
  ["India", "PAN, then documents shared from DigiLocker", "Explicit, time-stamped", "Video KYC with an authorised official"],
  ["Nigeria", "11-digit BVN or NIN", "Explicit, time-stamped", "Video call"],
  ["United States", "Licence front, barcode on the back, then SSN", "Written release in Illinois (BIPA)", "Check SSN, date of birth and address against records"],
  ["Brazil", "CPF, then CIN, RG or CNH", "Notice, under fraud prevention (LGPD)", "Video call"],
];

const decisions = [
  ["Germany starts with a chip, not a camera", "In the sources I found, a fully automated photo-and-selfie check isn’t one of the listed remote methods under the German AML Act. So the recommended route reads the ID card’s chip with a 6-digit PIN, with no photos or selfie, and the fallback is a video call with a trained person. A note heads off the most likely mistake: the 5-digit transport PIN from the card’s letter isn’t the one the chip needs."],
  ["Coach before you reject", "Wise’s help pages name six reasons photos get rejected, and each costs a round trip if it’s only caught after sending. The viewfinder reacts live, with amber corners and one instruction at a time (“Tilt the card slightly”), then turns green and takes the photo itself, with a manual shutter as a fallback."],
  ["One consent component, three wordings", "The UK regulator expects explicit consent with an equal alternative, Illinois needs a written release, and Brazil’s data law allows biometrics for fraud prevention on notice. Every version shows the same five facts (what, why, how long, who, your choice). Only the ask changes, and “Verify another way” sits under all of them."],
  ["Never show a stranger’s record", "A common pattern after a number lookup is “Is this you?” with a name and photo, which shows a stranger’s identity to anyone who types their number. Global Plus asks for a date of birth and matches it silently, and limits lookups to three a day to stop guessing."],
  ["Say what happens next, never why", "In the UK, telling someone a suspicious activity report has been made can be an offence, so a decline can’t give its reason. The screen reads the same whatever the cause: what happens to their money and photos, and a review by a person who wasn’t involved, with a reply date."],
  ["A face is never the only key", "Every market has at least one route with no automatic face matching: the eID chip, in person, a video call or a details check. These routes are shown with honest times and are never styled as the worse option."],
];

const sources = [
  ["Signicat via The Fintech Times — 68% of European consumers abandon financial applications during onboarding (2022)", "https://thefintechtimes.com/68-of-european-consumers-abandon-financial-applications-during-onboarding-finds-signicat/"],
  ["Entrust — 2026 Identity Fraud Report", "https://www.entrust.com/company/newsroom/deepfakes-social-engineering-and-injection-attacks-on-the-rise"],
  ["HM Treasury — Using digital identities with the Money Laundering Regulations", "https://www.gov.uk/government/publications/using-digital-identities-with-the-money-laundering-regulations/using-digital-identities-with-the-money-laundering-regulations"],
  ["Ropes & Gray — ICO publishes biometric data guidance", "https://www.ropesgray.com/en/insights/viewpoints/102j5cq/ico-publishes-biometric-data-guidance"],
  ["Bird & Bird — Possible procedures under the German Anti-Money Laundering Act", "https://www.twobirds.com/en/insights/2022/germany/possible-procedures-under-the-german-anti-money-laundering-act"],
  ["FinTech Global — What banks need to know before the EUDI Wallet deadline", "https://fintech.global/2026/09/04/what-banks-need-to-know-before-the-eudi-wallet-deadline/"],
  ["Reserve Bank of India — KYC FAQs", "https://rbi.org.in/scripts/FAQView.aspx?Id=173"],
  ["Dojah — CBN mandates BVN and NIN linkage", "https://dojah.io/blog/navigating-nigerias-new-kyc-rules-cbn-mandates-bvn-and-nin-linkage"],
  ["TechCabal — How to check your BVN", "https://techcabal.com/2021/10/05/how-to-check-bvn/"],
  ["31 CFR 1020.220 — Customer identification programs", "https://www.law.cornell.edu/cfr/text/31/1020.220"],
  ["ACLU of Illinois — Biometric Information Privacy Act", "https://www.aclu-il.org/en/biometric-information-privacy-act-bipa"],
  ["Itatiaia — How long the old RG stays valid", "https://www.itatiaia.com.br/brasil/brasil-geral/ate-quando-vale-o-rg-antigo-veja-prazo-para-tirar-a-nova-carteira-de-identidade"],
  ["The Law Society — Tipping off", "https://www.lawsociety.org.uk/topics/anti-money-laundering/tipping-off-a-client"],
  ["Wise — My document wasn’t good enough quality", "https://wise.com/help/articles/2977980/my-document-wasnt-good-enough-quality"],
  ["Monzo — Making identity verification more accessible", "https://monzo.com/blog/making-identity-verification-more-accessible"],
  ["GDS — The new in-person identity check for GOV.UK One Login", "https://gds.blog.gov.uk/2023/08/30/the-new-in-person-identity-check-for-gov-uk-one-login/"],
  ["NIST — Demographic effects in face recognition", "https://www.nist.gov/node/1603646"],
];

export default function GlobalPlusCaseStudy() {
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
            Case study · Identity verification · 2026
          </p>
          <h1 className="mt-4 text-6xl sm:text-8xl font-extrabold tracking-tight" style={{ color: C.fg }}>
            Global Plus
          </h1>
          <p className="mt-5 max-w-2xl text-xl sm:text-2xl leading-snug" style={{ color: C.body }}>
            Identity verification for GLOBAL that follows the law where you live, with a route that never needs a face scan.
          </p>
          <p className="mt-5 text-base" style={{ color: C.mist }}>
            Designed and built by <strong style={{ color: C.fg }}>Adam Calliste</strong> · Solo project · Extends{" "}
            <Link href="/work/global" className="underline underline-offset-2" style={{ color: C.fg }}>
              GLOBAL
            </Link>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Pill>Usability testing planned</Pill>
            <span className="text-sm" style={{ color: C.mist }}>
              No sessions have run yet. Results will be added here once they have.
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={LIVE_URL} primary external>
              Try the live app <ArrowUpRight size={16} />
            </LinkButton>
            <LinkButton href={FIGMA_URL} external>
              Open the Figma prototype <ArrowUpRight size={16} />
            </LinkButton>
            <LinkButton href={FIGMA_FILE_URL} external>
              Open the Figma file <ArrowUpRight size={16} />
            </LinkButton>
          </div>
          <div className="mt-12 overflow-hidden rounded-3xl border" style={{ borderColor: C.line }}>
            <Image
              src="/projects/global-plus.png"
              alt="Three Global Plus screens: the UK start screen, the selfie camera with its progress ring, and the German ID card chip being read"
              width={1600}
              height={1200}
              priority
              className="w-full h-auto"
            />
          </div>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Role", "Product designer, solo project"],
              ["Builds on", "GLOBAL, my money transfer app"],
              ["Deliverables", "Desk research, flows, lo-fi wireframes, design system, UI, prototypes"],
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
        </section>

        <Section n="01" title="The challenge">
          <P>
            Before anyone can send money with GLOBAL, the law in their country says the app has to check who they are. The
            original GLOBAL prototype had a placeholder for this: a selfie circle that always turned green.
          </P>
          <P>
            That placeholder hid the hard part. A German customer proves who they are with their ID card’s chip and a PIN.
            A Nigerian customer has an 11-digit BVN. An American is asked for a Social Security number. A single “photograph
            your ID” step is wrong in two of the six launch markets before it starts.
          </P>
          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            <Stat value="68%" label="of European consumers abandoned a financial application in the past year" source="Signicat, 2022" href={sources[0][1]} />
            <Stat value="38%" label="of those gave up because they didn’t have the right ID or digital identity" source="Same report" href={sources[0][1]} />
            <Stat value="1 in 5" label="biometric fraud attempts now use a deepfake" source="Entrust, 2026" href={sources[1][1]} />
          </div>
          <p className="max-w-3xl text-base" style={{ color: C.mist }}>
            These published figures describe the market, not Global Plus users. They frame the problem; the usability
            sessions will test it.
          </p>
          <div className="max-w-3xl rounded-2xl p-6 border" style={{ background: C.card, borderColor: C.line }}>
            <p className="text-sm uppercase tracking-[0.18em]" style={{ color: C.mist }}>
              The question
            </p>
            <p className="mt-2 text-2xl font-semibold leading-snug" style={{ color: C.fg }}>
              How does one verification flow adapt to six countries without becoming six separate products?
            </p>
          </div>
        </Section>

        <Section n="02" title="Role and scope">
          <P>
            A solo project covering the whole process: desk research into six markets’ rules, competitor teardowns, a flow
            system, low-fidelity wireframes, a design system with Light, Dark and Camera modes, high-fidelity UI, a wired
            Figma prototype, a working coded prototype and a usability test plan. Consumer onboarding on mobile only;
            business accounts are out of scope.
          </P>
        </Section>

        <Section n="03" title="Understanding the rules" wide>
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="Regulation">
              UK money-laundering guidance, Germany’s remote identification methods, RBI’s KYC rules, the CBN’s BVN mandate,
              the US identification rule and Brazil’s new ID card, read for what each rule does to a screen.
            </Card>
            <Card title="Competitors">
              Public help pages and posts from Wise, Revolut, Monzo and GOV.UK One Login: what fails, what they say, and what
              they offer instead.
            </Card>
            <Card title="Inclusion">
              Monzo’s accessibility rework, NIST’s face recognition study, the ICO’s biometric guidance and WCAG 2.2: who a
              face scan locks out, and what fixes it.
            </Card>
          </div>
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: C.line, background: C.card }}>
            <table className="w-full min-w-[720px] text-base text-left">
              <thead>
                <tr style={{ color: C.mist }}>
                  {["Market", "Strongest first step", "Face scan consent", "Route with no face scan"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {markets.map((r) => (
                  <tr key={r[0]} className="border-t" style={{ borderColor: C.line }}>
                    <th scope="row" className="px-5 py-4 font-semibold whitespace-nowrap" style={{ color: C.fg }}>
                      {r[0]}
                    </th>
                    {r.slice(1).map((c, i) => (
                      <td key={i} className="px-5 py-4 align-top">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            Across the competitors, the good products explain failures precisely and the better ones prevent them during
            capture, but none of the public material shows a flow that changes its first step by country. Global Plus is
            designed around that gap.
          </P>
          <p className="max-w-3xl text-base" style={{ color: C.mist }}>
            Desk research only; no interviews yet. Each recipe records its source and a date to review it by, because these
            rules keep moving.
          </p>
        </Section>

        <Section n="04" title="Defining the experience">
          <P>Six principles shape every screen, and one rule applies in every market.</P>
          <Bullets
            items={[
              "Start from the person’s strongest proof. The market decides the first screen: a chip in Germany, a number in Nigeria.",
              "Coach before you reject. Glare, blur, distance and cropping are caught live, then the photo takes itself.",
              "Every no comes with a next door. “I don’t have any of these” on every list; human routes are options, not errors.",
              "Say what happens next, never why. Declines can’t explain themselves by law, but they can give a date and a person.",
              "Ask clearly, check early. One consent component in three wordings; number formats checked as you type.",
              "Rules are data with an owner. Each rule records its source and review date, and the flow reads it at run time.",
            ]}
          />
          <p className="max-w-3xl rounded-2xl px-5 py-4" style={{ background: "rgba(140,147,255,0.12)", color: C.fg }}>
            A face is never the only key: every market has a route with no automatic face matching.
          </p>
        </Section>

        <Section n="05" title="One step library, six recipes">
          <P>
            Instead of six flows there is one library of steps and a short recipe per market, which picks the steps and their
            order. Thirteen routes come out of six recipes. Adding a seventh country means writing a recipe and its rules, not
            designing new screens.
          </P>
          <ol className="flex flex-wrap gap-2 text-base">
            {["Start", "Choose a route", "Number", "Choose ID", "Photos", "Chip and PIN", "DigiLocker", "Consent", "Selfie", "Video call", "Checking", "Outcome"].map((s, i) => (
              <li key={s} className="rounded-full px-4 py-2 border" style={{ borderColor: C.line, background: C.card, color: C.fg }}>
                <span style={{ color: C.mist }}>{i + 1}</span> {s}
              </li>
            ))}
          </ol>
          <P>
            Most onboarding designs show the green tick. Most of the work here went into the other endings: a retry with one
            named cause and a picture of the fix, a manual review with a date rather than “in progress”, and a decline that
            stays neutral and offers a person.
          </P>
        </Section>

        <Section n="06" title="Exploring solutions">
          <P>
            Twelve greyscale wireframes cover the screens that carry the riskiest decisions, each annotated with what was
            decided and why. Showing every route with its honest time, and keeping “Verify another way” under every consent
            screen, came out of this stage.
          </P>
        </Section>

        <Section n="07" title="Building the interface">
          <P>
            The design system in Figma has 34 colour variables in three modes and 13 layout variables, plus 34 components and
            a set of illustrations: specimen ID documents for every market, six invented people, the selfie oval and the
            card-reading stage. The third colour mode, Camera, keeps capture screens dark in both themes so documents and faces
            look the same day or night.
          </P>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
            <Phone src="/work/global-plus/light-routes.png" alt="Choose how to verify, with photo ID and a selfie recommended and in person as the alternative" caption="Choose a route" />
            <Phone src="/work/global-plus/cam-capture.png" alt="Camera screen coaching the person to tilt their licence away from glare" caption="Live coaching" />
            <Phone src="/work/global-plus/light-consent.png" alt="Face scan consent listing what is collected, why, how long it is kept, who sees it and the choice" caption="Consent, UK" />
            <Phone src="/work/global-plus/dark-start.png" alt="Start screen in dark mode" caption="Start, dark mode" />
          </div>
        </Section>

        <Section n="08" title="The final experience" wide>
          <P>
            47 screens in light and dark, eight bottom sheets, four toasts and stress tests for longer languages and larger
            text. The Figma prototype wires 103 interactions in each theme across seven flows, and the coded prototype below
            is the same app running in your browser, with specimen documents and invented people only.
          </P>
          <div className="grid gap-10 items-start pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <Phone src="/work/global-plus/light-start.png" alt="UK start screen explaining why verification is needed and what you’ll need" caption="Start, UK" />
              <Phone src="/work/global-plus/cam-selfie.png" alt="Selfie camera with a progress ring around the oval and the cue to turn left" caption="Selfie" />
              <Phone src="/work/global-plus/light-verified.png" alt="You’re verified screen showing how long it took" caption="Verified" />
              <Phone src="/work/global-plus/light-pin.png" alt="German ID card PIN entry with six dots and a keypad" caption="Card PIN, Germany" />
              <Phone src="/work/global-plus/light-chip.png" alt="Reading the German ID card chip, 62% complete" caption="Chip read, Germany" />
              <Phone src="/work/global-plus/light-bvn.png" alt="Nigeria BVN entry with the number checked" caption="BVN, Nigeria" />
              <Phone src="/work/global-plus/light-bipa.png" alt="Illinois written consent with the name typed as a signature" caption="Written consent, Illinois" />
              <Phone src="/work/global-plus/light-retry.png" alt="Retry screen explaining glare, with a bad and a good photo side by side" caption="Retry: glare" />
              <Phone src="/work/global-plus/light-review.png" alt="Manual review screen with a timeline and a date for the decision" caption="Manual review" />
              <Phone src="/work/global-plus/light-declined.png" alt="Decline screen explaining what happens to money and photos, with a review by a person" caption="Declined" />
              <Phone src="/work/global-plus/light-branch.png" alt="In-person verification with a QR code and nearby partner branches" caption="In person, no face scan" />
              <Phone src="/work/global-plus/cam-call.png" alt="Live video call with captions and call controls" caption="Video call" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <div
                className="hidden sm:block w-[413px] max-w-full aspect-[413/872] overflow-hidden rounded-[2.75rem] border-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                style={{ borderColor: "#1d1f27", background: "#000" }}
              >
                <iframe src={LIVE_URL} title="Global Plus working prototype" className="w-full h-full block" loading="lazy" />
              </div>
              <p className="hidden sm:block text-sm text-center max-w-[413px]" style={{ color: C.mist }}>
                Try it here, or{" "}
                <a href={LIVE_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2" style={{ color: C.fg }}>
                  open it full screen
                </a>{" "}
                to switch country and trigger each outcome from the reviewer console. No real documents are used.
              </p>
              <div className="sm:hidden flex flex-col items-center gap-3 text-center">
                <LinkButton href={LIVE_URL} primary external>
                  Open the live app <ArrowUpRight size={16} />
                </LinkButton>
                <p className="text-sm" style={{ color: C.mist }}>
                  It opens full screen on your phone. No real documents are used.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section n="09" title="Six decisions, and why" wide>
          <div className="grid gap-4 md:grid-cols-2">
            {decisions.map(([t, d], i) => (
              <div key={t} className="rounded-2xl p-6 border" style={{ background: C.card, borderColor: C.line }}>
                <p className="text-sm font-semibold tracking-[0.18em] uppercase" style={{ color: C.brand }}>
                  Decision {i + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold" style={{ color: C.fg }}>
                  {t}
                </h3>
                <p className="mt-3 text-base leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section n="10" title="Testing and improvement">
          <div className="flex items-center gap-3">
            <Pill>Usability testing planned</Pill>
          </div>
          <P>
            Round one is 15 moderated sessions on participants’ own phones, five each in the UK, Germany and Nigeria, recruited
            to include older people, older Android phones and screen-reader users. Six tasks: get started, recover from a
            photo with glare, find the route with no face scan, get through a German eID with a wrong PIN, fix a BVN record
            mismatch, and understand a decline. Each measures completion, time, recoveries, ease and whether people can say
            how long their face scan is kept.
          </P>
          <P>Changes so far came from checking the work, not from users:</P>
          <Bullets
            items={[
              "Grey hint text measured 3.44:1 in light and 3.88:1 in dark. It was darkened, and all 16 colour pairs now pass WCAG AA in Light, Dark and Camera.",
              "The input border on camera screens was 2.92:1 and now meets the 3:1 needed for controls.",
              "Footers gain a hairline divider whenever the content above them scrolls.",
            ]}
          />
          <ul className="max-w-3xl space-y-3">
            {[
              "At 130% text, the law tag on the consent screen runs off the edge. Logged with a fix: let it wrap to two lines.",
              "At 130% text, name-mismatch rows overlap their labels. Logged with a fix: stack the label above the value.",
            ].map((a) => (
              <li key={a} className="flex gap-3">
                <TriangleAlert size={20} className="mt-1 shrink-0" style={{ color: C.amber }} aria-hidden />
                <span>
                  {a} <span className="text-sm" style={{ color: C.mist }}>· open</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="max-w-3xl flex gap-2 text-base" style={{ color: C.mist }}>
            <Clock3 size={18} className="mt-1 shrink-0" aria-hidden /> Results from the sessions, including any change that
            didn’t help, will be added here.
          </p>
        </Section>

        <Section n="11" title="Outcomes">
          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Measured so far">
              <ul className="space-y-2">
                <li>Contrast: 16 of 16 colour pairs meet WCAG AA in Light, Dark and Camera</li>
                <li>Every one of the six markets has at least one route with no automatic face matching</li>
                <li>103 wired interactions per theme across seven playable flows</li>
                <li>Pseudo-localised copy (+35%) and 130% text run on four screens: two issues found and logged</li>
              </ul>
            </Card>
            <Card title="Hypotheses, not results">
              <ul className="space-y-2">
                <li>Fewer failed photos, because problems are caught live before anything is sent</li>
                <li>More people finishing in Germany, because no selfie is asked of them</li>
                <li>Fewer support contacts after a review or decline, because each gives a date and a person</li>
                <li style={{ color: C.mist }}>None of these has been measured; they would need a live product.</li>
              </ul>
            </Card>
          </div>
        </Section>

        <Section n="12" title="Next steps">
          <ul className="max-w-3xl space-y-3">
            {[
              "Run round one in the UK, Germany and Nigeria, then fix the most severe issues first.",
              "Confirm the open regulatory questions with a compliance specialist, starting with Germany and Brazil.",
              "Fix the two large-text issues and retest at 130% and 200%.",
              "Update this case study with what was observed.",
            ].map((a) => (
              <li key={a} className="flex gap-3">
                <CircleDashed size={20} className="mt-1 shrink-0" style={{ color: C.mist }} aria-hidden />
                <span>{a}</span>
              </li>
            ))}
          </ul>
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
          <p style={{ color: C.mist }}>Global Plus · designed and built by Adam Calliste</p>
          <Link href="/#projects" className="inline-flex items-center gap-2" style={{ color: C.fg }}>
            <ArrowLeft size={16} /> Back to all projects
          </Link>
        </footer>
      </main>
    </div>
  );
}

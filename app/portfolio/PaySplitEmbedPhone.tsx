"use client";

import React from "react";
import { CheckCircle2, Plus, X, ArrowLeft, Percent, Calculator, Divide } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types & helpers                                                     */
/* ------------------------------------------------------------------ */
type Person = { id: number; name: string; avatar: string };
type PercentMap = Record<number, number>;
type AmountMap  = Record<number, number>;
type Setter<T>  = React.Dispatch<React.SetStateAction<T>>;

function fmt(n: number) {
  return "£" + Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n || 0);
}

/* ------------------------------------------------------------------ */
/* Public entry — export this and embed in your portfolio              */
/* ------------------------------------------------------------------ */
export default function PaySplitEmbedPhone() {
  return (
    <div className="bg-[#f7f8fb] text-slate-900 w-[390px] max-w-full mx-auto h-[844px] shadow-xl rounded-[2.5rem] overflow-hidden border border-slate-200 flex flex-col">
      <div className="h-6 bg-white" style={{ paddingTop: "env(safe-area-inset-top)" }} />
      <PaySplitMobile />
      <div className="h-4" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Root flow                                                           */
/* ------------------------------------------------------------------ */
function PaySplitMobile() {
  const [step, setStep] = React.useState<0 | 1 | 2 | 3>(0);
  const [total, setTotal] = React.useState(64.5);
  const [people, setPeople] = React.useState<Person[]>([
    { id: 1, name: "Adam", avatar: "🜲" },
    { id: 2, name: "Maya", avatar: "🌙" },
    { id: 3, name: "Leo",  avatar: "🦊" },
  ]);
  const [selected, setSelected] = React.useState<number[]>([1, 2, 3]);

  // split modes
  const [mode, setMode] = React.useState<"equal" | "percent" | "custom">("percent");
  const [perc, setPerc]     = React.useState<PercentMap>({});
  const [custom, setCustom] = React.useState<AmountMap>({});
  const n = selected.length || 1;

  // auto-equalize percentages when selection changes
  React.useEffect(() => {
    if (n === 0) return;
    const eq  = +(100 / n).toFixed(2);
    const map: PercentMap = {};
    selected.forEach((id, i) => { map[id] = i === n - 1 ? +(100 - eq * (n - 1)).toFixed(2) : eq; });
    setPerc(map);
  }, [n, selected.join(",")]);

  // derive amounts per mode
  const amounts: AmountMap = React.useMemo(() => {
    if (n === 0) return {};
    if (mode === "equal") {
      const base = +(total / n).toFixed(2);
      const map: AmountMap = {};
      let sum = 0;
      selected.forEach((id, i) => {
        if (i < n - 1) { map[id] = base; sum += base; }
        else { map[id] = +(total - sum).toFixed(2); }
      });
      return map;
    }
    if (mode === "percent") {
      const map: AmountMap = {};
      let sum = 0;
      selected.forEach((id, i) => {
        if (i < n - 1) {
          const v = +((total * (perc[id] || 0)) / 100).toFixed(2);
          map[id] = v; sum += v;
        } else {
          map[id] = +(total - sum).toFixed(2);
        }
      });
      return map;
    }
    // custom
    return selected.reduce((acc, id) => { acc[id] = +(custom[id] || 0); return acc; }, {} as AmountMap);
  }, [mode, total, selected.join(","), n, perc, custom]);

  const sumAmounts = React.useMemo(() => Object.values(amounts).reduce((a, b) => a + (b || 0), 0), [amounts]);
  const remaining  = +(total - sumAmounts).toFixed(2);

  return (
    <div className="flex-1 flex flex-col">
      <Header step={step} onBack={() => setStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2 | 3) : s))} />

      <main className="flex-1 p-5 space-y-4 overflow-y-auto">
        {step === 0 && (
          <FriendsStep
            people={people}
            setPeople={setPeople}
            selected={selected}
            setSelected={setSelected}
            total={total}
            setTotal={setTotal}
            onNext={() => setStep(1)}
          />
        )}

        {step === 1 && (
          <AdjustSplitStep
            mode={mode}
            setMode={setMode}
            people={people}
            selected={selected}
            total={total}
            perc={perc}
            setPerc={setPerc}
            custom={custom}
            setCustom={setCustom}
            amounts={amounts}
            remaining={remaining}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <ReviewStep
            people={people}
            selected={selected}
            amounts={amounts}
            total={total}
            onConfirm={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <SuccessStep
            people={people}
            selected={selected}
            amounts={amounts}
            total={total}
            onDone={() => { setStep(0); setSelected(people.map((p) => p.id)); }}
          />
        )}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* UI atoms                                                            */
/* ------------------------------------------------------------------ */
function Header({ step, onBack }: { step: 0 | 1 | 2 | 3; onBack: () => void }) {
  const titles = ["New split", "Adjust split", "Review", "All set"];
  return (
    <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-slate-200 z-30">
      <div className="h-14 px-4 flex items-center justify-between">
        <button
          disabled={step === 0}
          onClick={onBack}
          className={`px-3 h-10 rounded-xl border ${step === 0 ? "opacity-0 pointer-events-none" : ""}`}
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-semibold">{titles[step]}</h1>
        <div className="w-10" />
      </div>
      <div className="px-4 pb-3">
        <Stepper step={step} />
      </div>
    </div>
  );
}
function Stepper({ step }: { step: 0 | 1 | 2 | 3 }) {
  const items = ["Friends", "Split", "Review", "Done"];
  return (
    <div className="flex items-center gap-2">
      {items.map((label, i) => (
        <div key={label} className="flex items-center gap-2 flex-1">
          <div className={`w-7 h-7 rounded-full grid place-items-center text-[11px] ${i <= step ? "bg-black text-white" : "bg-black/5 text-slate-600"}`}>{i + 1}</div>
          {i < items.length - 1 && <div className={`h-[2px] flex-1 ${i < step ? "bg-black" : "bg-black/10"}`} />}
        </div>
      ))}
    </div>
  );
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">{children}</div>;
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between py-3">{children}</div>;
}
function ModeBtn({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`h-10 rounded-xl border text-sm flex items-center justify-center gap-2 ${active ? "bg-black text-white border-black" : "bg-white border-slate-200"}`}
    >
      {icon} {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Step 0 — Friends & Total                                            */
/* ------------------------------------------------------------------ */
function FriendsStep({
  people,
  setPeople,
  selected,
  setSelected,
  total,
  setTotal,
  onNext,
}: {
  people: Person[];
  setPeople: Setter<Person[]>;
  selected: number[];
  setSelected: Setter<number[]>;
  total: number;
  setTotal: Setter<number>;
  onNext: () => void;
}) {
  const toggle = (id: number) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const add = () => {
    const id = (people.at(-1)?.id || 0) + 1;
    setPeople((prev) => [...prev, { id, name: `Guest ${id}`, avatar: "🙂" }]);
    setSelected((s) => [...s, id]);
  };

  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm font-medium">Bill total</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-semibold">£</span>
          <input
            className="text-3xl font-semibold flex-1 outline-none bg-transparent"
            inputMode="decimal"
            value={total.toFixed(2)}
            onChange={(e) => {
              const v = +e.target.value.replace(/[^0-9.]/g, "") || 0;
              setTotal(v);
            }}
          />
        </div>
        <p className="text-xs text-slate-600 mt-1">Subtotal before tips/tax.</p>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Friends in this split</p>
          <button onClick={add} className="px-3 h-9 rounded-lg bg-black text-white text-sm flex items-center gap-1">
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="mt-2 divide-y divide-slate-200">
          {people.map((p) => (
            <label key={p.id} className="py-3 flex items-center gap-3">
              <input
                type="checkbox"
                checked={selected.includes(p.id)}
                onChange={() => toggle(p.id)}
                className="accent-black w-5 h-5"
              />
              <div className="w-9 h-9 rounded-full bg-black/5 grid place-items-center text-base">{p.avatar}</div>
              <div className="flex-1 text-[15px]">{p.name}</div>
              {people.length > 1 && (
                <button
                  aria-label="remove"
                  onClick={(e) => {
                    e.preventDefault();
                    setPeople((prev) => prev.filter((x) => x.id !== p.id));
                    setSelected((s) => s.filter((i) => i !== p.id));
                  }}
                  className="p-2 rounded-lg bg-black/5"
                >
                  <X size={16} />
                </button>
              )}
            </label>
          ))}
        </div>
      </Card>

      <button
        onClick={onNext}
        disabled={selected.length === 0 || total <= 0}
        className="w-full h-12 rounded-xl bg-black text-white font-medium disabled:opacity-40"
      >
        Continue
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 — Adjust Split (Equal / Percent / Custom)                    */
/* ------------------------------------------------------------------ */
function AdjustSplitStep({
  mode,
  setMode,
  people,
  selected,
  total,
  perc,
  setPerc,
  custom,
  setCustom,
  amounts,
  remaining,
  onNext,
}: {
  mode: "equal" | "percent" | "custom";
  setMode: Setter<"equal" | "percent" | "custom">;
  people: Person[];
  selected: number[];
  total: number;
  perc: PercentMap;
  setPerc: Setter<PercentMap>;
  custom: AmountMap;
  setCustom: Setter<AmountMap>;
  amounts: AmountMap;
  remaining: number;
  onNext: () => void;
}) {
  const list = selected.map((id) => people.find((p) => p.id === id)!);

  const setPercFor = (id: number, val: number) => {
    const clamped = Math.max(0, Math.min(100, val));
    setPerc((prev) => {
      const next: PercentMap = { ...prev, [id]: clamped };
      const ids = selected;
      const sumOthers = ids.slice(0, -1).reduce((s, k) => s + (k === id ? clamped : next[k] ?? 0), 0);
      next[ids[ids.length - 1]] = +(Math.max(0, 100 - sumOthers).toFixed(2));
      return next;
    });
  };

  const setCustomFor = (id: number, val: number) => {
    const v = Math.max(0, +(val || 0));
    setCustom((prev) => ({ ...prev, [id]: v }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="grid grid-cols-3 gap-2">
          <ModeBtn icon={<Divide size={16} />}   label="Equal"   active={mode === "equal"}   onClick={() => setMode("equal")} />
          <ModeBtn icon={<Percent size={16} />}  label="Percent" active={mode === "percent"} onClick={() => setMode("percent")} />
          <ModeBtn icon={<Calculator size={16} />} label="Custom"  active={mode === "custom"}  onClick={() => setMode("custom")} />
        </div>
      </Card>

      {mode === "equal" && (
        <Card>
          <p className="text-sm text-slate-700">Split equally across {selected.length} people.</p>
          <div className="mt-2 divide-y divide-slate-200">
            {list.map((p) => (
              <Row key={p.id}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-black/5 grid place-items-center text-base">{p.avatar}</div>
                  <span className="text-[15px]">{p.name}</span>
                </div>
                <span className="font-semibold">{fmt(amounts[p.id])}</span>
              </Row>
            ))}
          </div>
        </Card>
      )}

      {mode === "percent" && (
        <Card>
          <p className="text-sm text-slate-700">
            Assign a percentage to each person (auto-balances to 100%).
          </p>
          <div className="mt-2 space-y-4">
            {list.map((p, i) => (
              <div key={p.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-black/5 grid place-items-center text-base">{p.avatar}</div>
                    <span className="text-[15px]">{p.name}</span>
                  </div>
                  <div className="text-sm text-slate-600">{(perc[p.id] ?? 0).toFixed(0)}%</div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={perc[p.id] ?? 0}
                  onChange={(e) => setPercFor(p.id, +e.target.value)}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Amount</span>
                  <span className="font-semibold">{fmt(amounts[p.id])}</span>
                </div>
                {i < list.length - 1 && <div className="h-px bg-slate-200 my-2" />}
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-600">
            Total: <strong>{fmt(total)}</strong> · Percent sum auto-kept at 100%
          </div>
        </Card>
      )}

      {mode === "custom" && (
        <Card>
          <p className="text-sm text-slate-700">Enter exact amounts. Remaining must be £0.00 to continue.</p>
          <div className="mt-2 divide-y divide-slate-200">
            {list.map((p) => (
              <Row key={p.id}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-black/5 grid place-items-center text-base">{p.avatar}</div>
                  <span className="text-[15px]">{p.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>£</span>
                  <input
                    inputMode="decimal"
                    className="w-24 text-right bg-transparent outline-none"
                    value={(custom[p.id] ?? "") as any}
                    placeholder={(amounts[p.id] || 0).toFixed(2)}
                    onChange={(e) => setCustomFor(p.id, +e.target.value.replace(/[^0-9.]/g, "") || 0)}
                  />
                </div>
              </Row>
            ))}
          </div>
          <div
            className={`mt-3 text-sm px-3 py-2 rounded-lg ${
              Math.abs(remaining) < 0.01 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            Remaining: <strong>{fmt(remaining)}</strong>
          </div>
        </Card>
      )}

      <button
        onClick={onNext}
        disabled={selected.length === 0 || total <= 0 || (mode === "custom" && Math.abs(remaining) >= 0.01)}
        className="w-full h-12 rounded-xl bg-black text-white font-medium disabled:opacity-40"
      >
        {mode === "custom" && Math.abs(remaining) >= 0.01 ? "Adjust amounts" : "Review"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — Review                                                     */
/* ------------------------------------------------------------------ */
function ReviewStep({
  people,
  selected,
  amounts,
  total,
  onConfirm,
}: {
  people: Person[];
  selected: number[];
  amounts: AmountMap;
  total: number;
  onConfirm: () => void;
}) {
  const list = selected.map((id) => people.find((p) => p.id === id)!);
  const sum = Object.values(amounts).reduce((a, b) => a + (b || 0), 0);

  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm font-medium">You’ll request</p>
        <div className="mt-2 divide-y divide-slate-200">
          {list.map((p) => (
            <Row key={p.id}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black/5 grid place-items-center text-base">{p.avatar}</div>
                <span className="text-[15px]">{p.name}</span>
              </div>
              <span className="font-semibold">{fmt(amounts[p.id])}</span>
            </Row>
          ))}
        </div>
      </Card>

      <Card>
        <div className="text-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Subtotal</span>
            <span className="font-medium">{fmt(total)}</span>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex items-center justify-between">
            <span className="font-semibold">Grand total</span>
            <span className="font-semibold">{fmt(sum)}</span>
          </div>
        </div>
      </Card>

      <button onClick={onConfirm} className="w-full h-12 rounded-xl bg-black text-white font-medium">
        Confirm & send
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Success                                                    */
/* ------------------------------------------------------------------ */
function SuccessStep({
  people,
  selected,
  amounts,
  total,
  onDone,
}: {
  people: Person[];
  selected: number[];
  amounts: AmountMap;
  total: number;
  onDone: () => void;
}) {
  const list = selected.map((id) => people.find((p) => p.id === id)!);
  const sum = Object.values(amounts).reduce((a, b) => a + (b || 0), 0);

  return (
    <div className="pt-10">
      <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-500 text-white grid place-items-center shadow-lg">
        <CheckCircle2 size={36} />
      </div>
      <h3 className="text-center text-xl font-semibold mt-4">Requests sent</h3>
      <p className="text-center text-sm text-slate-600">Total {fmt(sum)}</p>

      <Card>
        <div className="divide-y divide-slate-200">
          {list.map((p) => (
            <Row key={p.id}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black/5 grid place-items-center text-base">{p.avatar}</div>
                <span className="text-[15px]">{p.name}</span>
              </div>
              <span className="font-semibold">{fmt(amounts[p.id])}</span>
            </Row>
          ))}
        </div>
      </Card>

      <div className="px-5">
        <button onClick={onDone} className="w-full h-12 rounded-xl bg-black text-white font-medium">
          New split
        </button>
      </div>
    </div>
  );
}

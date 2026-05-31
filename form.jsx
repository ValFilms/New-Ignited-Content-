// form.jsx — multi-step booking form (shop → numbers → contact → calendar → done)
const { useState: useFormState, useMemo: useFormMemo } = React;

const SERVICE_OPTS = ["Window Tint", "Paint Protection Film", "Ceramic Coating", "Mobile Detailing", "Vinyl Wrap"];
const REV_OPTS = ["Under $25K", "$25K–50K", "$50K–100K", "$100K+"];
const BUDGET_OPTS = ["Under $1K", "$1K–3K", "$3K–7K", "$7K+"];
const CHALLENGE_OPTS = ["Slow seasons", "Inconsistent schedule", "Low-quality customers", "Ads aren't converting", "No time to market"];
const TIMELINE_OPTS = ["As soon as possible", "Within 30 days", "Just exploring"];
const TIME_SLOTS = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

const STEP_META = [
  { tag: "01", label: "Your shop" },
  { tag: "02", label: "The numbers" },
  { tag: "03", label: "Your goals" },
  { tag: "04", label: "Pick a time" },
];

function Field({ label, children, hint }) {
  return (
    <label className="field">
      <span className="field-label">{label}{hint && <span className="field-hint">{hint}</span>}</span>
      {children}
    </label>
  );
}

function ChipGroup({ options, value, onToggle, multi }) {
  const sel = multi ? value : [value];
  return (
    <div className="chips">
      {options.map((o) => (
        <button type="button" key={o}
          className={`chip${sel.includes(o) ? " on" : ""}`}
          onClick={() => onToggle(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

function buildDays() {
  const days = [];
  const d = new Date();
  while (days.length < 10) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) {
      days.push({
        key: d.toISOString().slice(0, 10),
        dow: d.toLocaleDateString("en-US", { weekday: "short" }),
        day: d.getDate(),
        mon: d.toLocaleDateString("en-US", { month: "short" }),
      });
    }
  }
  return days;
}

function BookingForm() {
  const [step, setStep] = useFormState(0);
  const [d, setD] = useFormState({
    shop: "", location: "", services: [], handle: "",
    revenue: "", budget: "", ads: "", challenge: "",
    timeline: "", name: "", phone: "", email: "",
    date: null, time: null,
  });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const toggleService = (s) => set("services", d.services.includes(s) ? d.services.filter((x) => x !== s) : [...d.services, s]);
  const days = useFormMemo(buildDays, []);

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email);
  const valid = [
    d.shop && d.location && d.services.length > 0,
    d.revenue && d.budget && d.ads && d.challenge,
    d.timeline && d.name && d.phone.length >= 7 && emailOk,
    d.date && d.time,
  ];

  const next = () => { if (valid[step]) setStep((s) => Math.min(s + 1, 4)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const selDay = days.find((x) => x.key === d.date);

  if (step === 4) {
    return (
      <div className="bf-success">
        <Ball size={72} pulse glow />
        <div className="eyebrow no-rule" style={{ marginTop: 26 }}>Call confirmed</div>
        <h3 className="bf-success-h">You're on the calendar, {d.name.split(" ")[0] || "let's go"}.</h3>
        <p className="bf-success-p">
          We'll see you <strong>{selDay ? `${selDay.dow}, ${selDay.mon} ${selDay.day}` : ""}</strong> at <strong>{d.time}</strong>.
          A confirmation is headed to <strong>{d.email}</strong> with everything you need.
        </p>
        <div className="bf-summary">
          <div><span className="mono-tag dim">Shop</span>{d.shop}</div>
          <div><span className="mono-tag dim">Services</span>{d.services.join(" · ")}</div>
          <div><span className="mono-tag dim">Focus</span>{d.challenge}</div>
        </div>
        <button className="btn btn-ghost" onClick={() => { setStep(0); }} style={{ marginTop: 8 }}>Book another shop</button>
      </div>
    );
  }

  return (
    <div className="bf">
      {/* progress */}
      <div className="bf-progress">
        {STEP_META.map((m, i) => (
          <div className={`bf-step${i === step ? " active" : ""}${i < step ? " done" : ""}`} key={i}
               onClick={() => i < step && setStep(i)}>
            <span className="bf-step-tag">{i < step ? "✓" : m.tag}</span>
            <span className="bf-step-label">{m.label}</span>
          </div>
        ))}
        <div className="bf-progress-bar"><span style={{ width: `${(step / 3) * 100}%` }} /></div>
      </div>

      <div className="bf-body">
        {step === 0 && (
          <div className="bf-grid">
            <Field label="Shop name">
              <input className="inp" value={d.shop} onChange={(e) => set("shop", e.target.value)} placeholder="e.g. Apex Auto Styling" />
            </Field>
            <Field label="Location" hint="City, State">
              <input className="inp" value={d.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Tampa, FL" />
            </Field>
            <Field label="Which services do you offer?" hint="Pick all that apply">
              <ChipGroup options={SERVICE_OPTS} value={d.services} onToggle={toggleService} multi />
            </Field>
            <Field label="Website or Instagram" hint="Optional">
              <input className="inp" value={d.handle} onChange={(e) => set("handle", e.target.value)} placeholder="@yourshop or yoursite.com" />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="bf-grid">
            <Field label="Average monthly revenue">
              <ChipGroup options={REV_OPTS} value={d.revenue} onToggle={(v) => set("revenue", v)} />
            </Field>
            <Field label="Monthly marketing budget">
              <ChipGroup options={BUDGET_OPTS} value={d.budget} onToggle={(v) => set("budget", v)} />
            </Field>
            <Field label="Are you currently running ads?">
              <ChipGroup options={["Yes", "No"]} value={d.ads} onToggle={(v) => set("ads", v)} />
            </Field>
            <Field label="Biggest challenge right now">
              <ChipGroup options={CHALLENGE_OPTS} value={d.challenge} onToggle={(v) => set("challenge", v)} />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="bf-grid">
            <Field label="How soon do you want to start?">
              <ChipGroup options={TIMELINE_OPTS} value={d.timeline} onToggle={(v) => set("timeline", v)} />
            </Field>
            <div className="bf-row">
              <Field label="Your name">
                <input className="inp" value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="First & last" />
              </Field>
              <Field label="Phone">
                <input className="inp" value={d.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(555) 123-4567" inputMode="tel" />
              </Field>
            </div>
            <Field label="Email">
              <input className={`inp${d.email && !emailOk ? " err" : ""}`} value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="you@yourshop.com" inputMode="email" />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="bf-cal">
            <div className="bf-cal-label mono-tag dim">Choose a day</div>
            <div className="cal-days no-scrollbar">
              {days.map((day) => (
                <button type="button" key={day.key}
                  className={`cal-day${d.date === day.key ? " on" : ""}`}
                  onClick={() => set("date", day.key)}>
                  <span className="cal-dow">{day.dow}</span>
                  <span className="cal-num">{day.day}</span>
                  <span className="cal-mon">{day.mon}</span>
                </button>
              ))}
            </div>
            <div className="bf-cal-label mono-tag dim" style={{ marginTop: 24 }}>Choose a time {selDay ? `· ${selDay.dow} ${selDay.mon} ${selDay.day}` : ""}</div>
            <div className={`cal-times${!d.date ? " disabled" : ""}`}>
              {TIME_SLOTS.map((t) => (
                <button type="button" key={t}
                  className={`cal-time${d.time === t ? " on" : ""}`}
                  disabled={!d.date}
                  onClick={() => set("time", t)}>{t}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bf-nav">
        {step > 0
          ? <button className="btn btn-ghost" onClick={back}>← Back</button>
          : <span className="bf-nav-note mono-tag dim">No commitment · 20-minute call</span>}
        {step < 3
          ? <button className="btn btn-primary" disabled={!valid[step]} onClick={next}>Continue<span className="arrow">→</span></button>
          : <button className="btn btn-primary" disabled={!valid[3]} onClick={() => setStep(4)}>Confirm my call<span className="arrow">→</span></button>}
      </div>
    </div>
  );
}

function BookSection() {
  return (
    <section className="sec book-sec" id="book">
      <div className="wrap book-inner">
        <div className="book-aside">
          <div className="eyebrow">Book your call</div>
          <h2 className="book-h2">A 20-minute call that<br /><span className="ig-em">pays for itself.</span></h2>
          <p className="book-p">Tell us about your shop and grab a time. On the call we'll map exactly how to keep your bays booked through every season — and what it costs.</p>
          <ul className="book-list">
            <li><span className="book-tick" />A custom plan for your market & services</li>
            <li><span className="book-tick" />Real numbers from shops like yours</li>
            <li><span className="book-tick" />Zero pressure, zero jargon</li>
          </ul>
          <div className="book-proof">
            <Ball size={40} pulse={false} />
            <div>
              <div className="book-proof-v">$200K+ managed · $2 per tint inquiry</div>
              <div className="mono-tag dim">The track record speaks first</div>
            </div>
          </div>
        </div>
        <div className="book-card">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { BookSection });

// app.jsx — composition + Tweaks
const { useEffect: useAppEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "telemetry",
  "accent": "ember",
  "typeface": "expanded",
  "ballFx": true
}/*EDITMODE-END*/;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
}

const HERO_OPTS = [{ value: "telemetry", label: "Telemetry" }, { value: "garage", label: "Garage" }, { value: "split", label: "Split" }];
const ACCENT_OPTS = [{ value: "ember", label: "Ember" }, { value: "amber", label: "Amber" }, { value: "red", label: "Red" }, { value: "lime", label: "Lime" }];
const TYPE_OPTS = [{ value: "expanded", label: "Expanded" }, { value: "grotesk", label: "Grotesk" }, { value: "mono", label: "Mono" }];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const onBook = () => scrollToId("book");

  useAppEffect(() => {
    const root = document.documentElement;
    if (t.accent && t.accent !== "ember") root.setAttribute("data-accent", t.accent);
    else root.removeAttribute("data-accent");
    if (t.typeface && t.typeface !== "expanded") root.setAttribute("data-typeface", t.typeface);
    else root.removeAttribute("data-typeface");
    root.classList.toggle("no-ballfx", !t.ballFx);
  }, [t.accent, t.typeface, t.ballFx]);

  return (
    <div id="top">
      <Nav onBook={onBook} />
      <Hero variant={t.hero} onBook={onBook} />
      <Marquee items={["Window Tint", "Paint Protection Film", "Ceramic Coating", "Mobile Detailing", "Vinyl Wrap", "Year-Round Demand"]} />
      <Results />
      <Services onBook={onBook} />
      <Process />
      <BookSection />
      <Footer onBook={onBook} />

      <TweaksPanel>
        <TweakSection label="Hero direction" />
        <TweakRadio label="Layout" value={t.hero}
          options={HERO_OPTS}
          onChange={(v) => setTweak("hero", v)} />
        <TweakSection label="Brand" />
        <TweakRadio label="Accent" value={t.accent}
          options={ACCENT_OPTS}
          onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Typeface" value={t.typeface}
          options={TYPE_OPTS}
          onChange={(v) => setTweak("typeface", v)} />
        <TweakToggle label="Ball glow / pulse" value={t.ballFx}
          onChange={(v) => setTweak("ballFx", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

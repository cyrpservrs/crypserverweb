type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
          CrypServer Legal
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3">
          {title}
        </h1>
        <p className="text-white/45 text-sm mb-10">Last updated: {updated}</p>
        <p className="text-white/75 leading-relaxed mb-12">{intro}</p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 48)}
                  className="text-white/70 leading-relaxed mb-3"
                >
                  {p}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-2 space-y-2 list-disc list-inside text-white/70">
                  {section.bullets.map((b) => (
                    <li key={b} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm">© 2026 CrypServer</p>
        </div>
      </div>
    </main>
  );
}

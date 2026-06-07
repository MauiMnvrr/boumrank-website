'use client';

import { Reveal } from './primitives';

const row1 = [
  ['🍽️', 'Restaurant'],
  ['☕', 'Café'],
  ['🍺', 'Bar'],
  ['🥐', 'Boulangerie'],
  ['🍕', 'Pizzeria'],
  ['🚚', 'Food truck'],
  ['🍰', 'Pâtisserie'],
  ['🍷', 'Caviste'],
];

const row2 = [
  ['💇', 'Salon de coiffure'],
  ['💅', 'Institut de beauté'],
  ['🪒', 'Barbier'],
  ['👗', 'Boutique de mode'],
  ['💐', 'Fleuriste'],
  ['🏋️', 'Salle de sport'],
  ['🛍️', 'Concept store'],
  ['🎨', 'Tatoueur'],
];

function Pill({ emoji, label }: { emoji: string; label: string }) {
  return (
    <span className="cmp-sector-pill">
      <span style={{ fontSize: 16 }}>{emoji}</span>
      {label}
    </span>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration = 46,
}: {
  items: string[][];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-fade" style={{ overflow: 'hidden' }}>
      <div
        className={reverse ? 'animate-marquee-rev' : 'animate-marquee'}
        style={
          {
            display: 'flex',
            gap: 12,
            width: 'max-content',
            '--marquee-duration': `${duration}s`,
          } as React.CSSProperties
        }
      >
        {doubled.map(([emoji, label], i) => (
          <Pill key={i} emoji={emoji} label={label} />
        ))}
      </div>
    </div>
  );
}

export function Sectors() {
  return (
    <section className="cmp-section marquee-paused" style={{ paddingTop: 24 }}>
      <div className="cmp-container">
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 36px' }}>
          <Reveal>
            <h2 className="cmp-h2">Si vous avez une boutique, c’est pour vous.</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="cmp-lead" style={{ marginTop: 12 }}>
              BoumRank s’adapte à tous les commerces de proximité.
            </p>
          </Reveal>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <MarqueeRow items={row1} duration={48} />
        <MarqueeRow items={row2} reverse duration={54} />
      </div>
    </section>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Reveal, SectionHeader, IcCheck } from './shared';

// Generate a fake QR pattern (deterministic)
function generateQrPattern() {
  const size = 13;
  const cells: boolean[] = [];
  const seed = 0xb00;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isCornerMark =
        (x < 3 && y < 3) ||
        (x >= size - 3 && y < 3) ||
        (x < 3 && y >= size - 3);
      const isCornerRing =
        (x < 4 && y < 4 && (x === 3 || y === 3 || x === 0 || y === 0)) ||
        (x >= size - 4 &&
          y < 4 &&
          (x === size - 4 || y === 3 || x === size - 1 || y === 0)) ||
        (x < 4 &&
          y >= size - 4 &&
          (x === 3 || y === size - 4 || x === 0 || y === size - 1));

      let on = false;
      if (isCornerMark) on = true;
      else if (isCornerRing) on = false;
      else {
        const h = (x * 31 + y * 17 + seed) % 7;
        on = h < 3;
      }
      cells.push(on);
    }
  }
  return cells;
}

function FakeQR() {
  const cells = generateQrPattern();
  return (
    <div className="fn-qr">
      <div className="fn-qr-inner">
        {cells.map((on, i) => (
          <div
            key={i}
            className="fn-qr-cell"
            style={{ background: on ? 'var(--text-primary)' : 'transparent' }}
          />
        ))}
      </div>
    </div>
  );
}

function MenuPhone({
  restaurantName,
  menuOfDay,
  categories,
  items,
}: {
  restaurantName: string;
  menuOfDay: string;
  categories: string[];
  items: Array<{ emoji: string; name: string; price: string }>;
}) {
  return (
    <div className="fn-phone" style={{ width: 240, height: 480 }}>
      <div className="fn-phone-screen" style={{ background: '#fdfbf6' }}>
        <div
          style={{
            padding: '30px 18px 16px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 18,
              color: '#1a1a1a',
              textAlign: 'center',
              marginBottom: 2,
            }}
          >
            {restaurantName}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 11,
              color: 'var(--text-muted)',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: 16,
            }}
          >
            {menuOfDay}
          </div>

          <div
            style={{
              display: 'flex',
              gap: 6,
              justifyContent: 'center',
              marginBottom: 14,
            }}
          >
            {categories.map((c, i) => (
              <span
                key={c}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '4px 9px',
                  borderRadius: 9999,
                  background: i === 0 ? '#1a1a1a' : 'transparent',
                  color: i === 0 ? '#fff' : '#5a5a5a',
                  border: i === 0 ? 'none' : '1px solid #d8d2c4',
                }}
              >
                {c}
              </span>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              overflow: 'hidden',
            }}
          >
            {items.map((it) => (
              <div
                key={it.name}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  border: '1px solid #efe9dd',
                }}
              >
                <span style={{ fontSize: 22 }}>{it.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#1a1a1a',
                    }}
                  >
                    {it.name}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-data)',
                    fontWeight: 700,
                    fontSize: 13,
                    color: '#C8463C',
                  }}
                >
                  {it.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Section5Menu = () => {
  const t = useTranslations('features.menu');
  const bullets = t.raw('bullets') as Array<{ title: string; body: string }>;
  const categories = t.raw('menuPhone.categories') as string[];
  const items = t.raw('menuPhone.items') as Array<{
    emoji: string;
    name: string;
    price: string;
  }>;

  return (
    <section className="fn-section" id="menu" style={{ background: 'var(--bg-primary)' }}>
      <div className="fn-container">
        <div className="fn-twocol">
          <div>
            <SectionHeader
              title={
                <>
                  {t('title')} <span className="hl">{t('titleGradient')}</span>
                  {t('titleSuffix')}
                </>
              }
              lead={t('lead')}
              maxLead={520}
            />

            <Reveal delay={2}>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                {bullets.map((b) => (
                  <li
                    key={b.title}
                    style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 8,
                        background: 'var(--gradient-primary)',
                        color: '#fff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <IcCheck size={13} />
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 15,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {b.title}
                      </div>
                      <div
                        style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.5 }}
                      >
                        {b.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right — QR + phone */}
          <Reveal delay={2}>
            <div
              className="s5-right"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <FakeQR />
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t('qrCaption')}
                </div>
              </div>

              <MenuPhone
                restaurantName={t('menuPhone.restaurantName')}
                menuOfDay={t('menuPhone.menuOfDay')}
                categories={categories}
                items={items}
              />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .s5-right { flex-direction: column; gap: 18px !important; }
        }
      `}</style>
    </section>
  );
};

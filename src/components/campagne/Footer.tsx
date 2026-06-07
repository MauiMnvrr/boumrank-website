import Image from 'next/image';
import { COMPANY, SITE_URL } from '@/lib/constants';

const linkStyle: React.CSSProperties = {
  color: 'var(--text-body)',
  padding: '8px 4px',
};

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-default)',
        background: 'var(--bg-surface)',
        padding: '40px 0',
      }}
    >
      <div
        className="cmp-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          textAlign: 'center',
        }}
      >
        <Image
          src="/logos/logo-horizontal-violet-cyan-gradient.png"
          alt="BoumRank"
          width={825}
          height={134}
          style={{ height: 26, width: 'auto' }}
        />
        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '4px 16px',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <a href={`${SITE_URL}/fonctionnalites`} style={linkStyle}>
            Fonctionnalités
          </a>
          <a href={`${SITE_URL}/tarifs`} style={linkStyle}>
            Tarifs
          </a>
          <a href={`${SITE_URL}/mentions-legales`} style={linkStyle}>
            Mentions légales
          </a>
          <a href={`${SITE_URL}/politique-de-confidentialite`} style={linkStyle}>
            Confidentialité
          </a>
          <a href={`mailto:${COMPANY.email}`} style={linkStyle}>
            {COMPANY.email}
          </a>
        </nav>
        <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', margin: 0 }}>
          © 2026 BoumRank. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

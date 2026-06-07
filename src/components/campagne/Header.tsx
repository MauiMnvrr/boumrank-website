import Image from 'next/image';
import { CalCta } from './primitives';

export function Header() {
  return (
    <header className="cmp-header">
      <div
        className="cmp-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          height: 64,
        }}
      >
        <a
          href="https://boumrank.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="BoumRank"
          style={{ display: 'inline-flex', flexShrink: 0 }}
        >
          <Image
            src="/logos/logo-horizontal-violet-cyan-gradient.png"
            alt=""
            width={825}
            height={134}
            priority
            style={{ height: 30, width: 'auto' }}
          />
        </a>
        <CalCta size="md" source="campagne_header">
          <span className="cmp-hide-sm">Réserver un appel</span>
          <span className="cmp-only-sm">Réserver</span>
        </CalCta>
      </div>
    </header>
  );
}

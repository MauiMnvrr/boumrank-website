import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const locale = await getLocale();
  const isEn = locale === 'en';

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] mb-6">
          404
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold uppercase text-[var(--text-primary)] mb-4">
          {isEn ? 'Page not found' : 'Page introuvable'}
        </h1>

        <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto mb-10">
          {isEn
            ? "Oops! The page you're looking for doesn't exist or has been moved."
            : "Oups ! La page que vous cherchez n'existe pas ou a été déplacée."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white px-8 py-4 rounded-full font-bold uppercase shadow-[0_0_20px_rgba(27,111,194,0.4)] hover:scale-105 transition-transform"
          >
            {isEn ? 'Back to home' : "Retour à l'accueil"}
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full font-bold text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-elevated)] uppercase transition-colors"
          >
            {isEn ? 'Contact us' : 'Nous contacter'}
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2c-.4.4 6.6-4.8 6.6-14.9 0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

const InstagramLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 264.583 264.583"
    className="w-9 h-9"
    aria-hidden="true"
  >
    <defs>
      <radialGradient
        xlinkHref="#ig-a"
        id="ig-f"
        cx="158.429"
        cy="578.088"
        r="52.352"
        fx="158.429"
        fy="578.088"
        gradientTransform="matrix(0 -4.03418 4.28018 0 -2332.227 942.236)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#ig-b"
        id="ig-g"
        cx="172.615"
        cy="600.692"
        r="65"
        fx="172.615"
        fy="600.692"
        gradientTransform="matrix(.67441 -1.16203 1.51283 .87801 -814.366 -47.835)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#ig-c"
        id="ig-h"
        cx="144.012"
        cy="51.337"
        r="67.081"
        fx="144.012"
        fy="51.337"
        gradientTransform="matrix(-2.3989 .67549 -.23008 -.81732 464.996 -26.404)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#ig-d"
        id="ig-e"
        cx="199.788"
        cy="628.438"
        r="52.352"
        fx="199.788"
        fy="628.438"
        gradientTransform="matrix(-3.10797 .87652 -.6315 -2.23914 1345.65 1374.198)"
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient id="ig-d">
        <stop offset="0" stopColor="#ff005f" />
        <stop offset="1" stopColor="#fc01d8" />
      </linearGradient>
      <linearGradient id="ig-c">
        <stop offset="0" stopColor="#780cff" />
        <stop offset="1" stopColor="#820bff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="ig-b">
        <stop offset="0" stopColor="#fc0" />
        <stop offset="1" stopColor="#fc0" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="ig-a">
        <stop offset="0" stopColor="#fc0" />
        <stop offset=".124" stopColor="#fc0" />
        <stop offset=".567" stopColor="#fe4a05" />
        <stop offset=".694" stopColor="#ff0f3f" />
        <stop offset="1" stopColor="#fe0657" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-e)" d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z" transform="translate(-71.816 -18.143)" />
    <path fill="url(#ig-f)" d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z" transform="translate(-71.816 -18.143)" />
    <path fill="url(#ig-g)" d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z" transform="translate(-71.816 -18.143)" />
    <path fill="url(#ig-h)" d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z" transform="translate(-71.816 -18.143)" />
    <path fill="#fff" d="M132.345 33.973c-26.716 0-30.07.117-40.563.594-10.472.48-17.62 2.136-23.876 4.567-6.47 2.51-11.958 5.87-17.426 11.335-5.472 5.464-8.834 10.948-11.354 17.412-2.44 6.252-4.1 13.397-4.57 23.858-.47 10.486-.593 13.838-.593 40.535 0 26.697.119 30.037.594 40.522.482 10.465 2.14 17.609 4.57 23.859 2.515 6.465 5.876 11.95 11.346 17.414 5.466 5.468 10.955 8.834 17.42 11.345 6.26 2.431 13.41 4.088 23.881 4.567 10.493.477 13.844.594 40.559.594 26.719 0 30.061-.117 40.555-.594 10.472-.48 17.63-2.136 23.888-4.567 6.468-2.51 11.948-5.877 17.414-11.345 5.472-5.464 8.834-10.949 11.354-17.412 2.419-6.252 4.079-13.398 4.57-23.858.472-10.486.595-13.828.595-40.525s-.123-30.047-.594-40.533c-.492-10.465-2.152-17.608-4.57-23.858-2.521-6.466-5.883-11.95-11.355-17.414-5.472-5.468-10.944-8.827-17.42-11.335-6.271-2.431-13.424-4.088-23.897-4.567-10.493-.477-13.834-.594-40.558-.594zm-8.825 17.715c2.62-.004 5.542 0 8.825 0 26.266 0 29.38.094 39.752.565 9.591.438 14.797 2.04 18.264 3.385 4.591 1.782 7.864 3.912 11.305 7.352 3.443 3.44 5.575 6.717 7.362 11.305 1.346 3.46 2.951 8.663 3.388 18.247.47 10.363.573 13.475.573 39.71 0 26.233-.102 29.346-.573 39.709-.44 9.584-2.042 14.786-3.388 18.247-1.783 4.587-3.919 7.854-7.362 11.292-3.443 3.441-6.712 5.57-11.305 7.352-3.463 1.352-8.673 2.95-18.264 3.388-10.37.47-13.486.573-39.752.573-26.268 0-29.38-.102-39.751-.573-9.592-.443-14.797-2.044-18.267-3.39-4.59-1.781-7.87-3.911-11.313-7.352-3.443-3.44-5.574-6.709-7.362-11.298-1.346-3.461-2.95-8.663-3.387-18.247-.472-10.363-.566-13.476-.566-39.726s.094-29.347.566-39.71c.438-9.584 2.04-14.786 3.387-18.25 1.783-4.588 3.919-7.865 7.362-11.305 3.443-3.441 6.722-5.57 11.313-7.357 3.468-1.351 8.675-2.949 18.267-3.389 9.075-.41 12.592-.532 30.926-.553zm61.337 16.322c-6.518 0-11.805 5.277-11.805 11.792 0 6.512 5.287 11.796 11.805 11.796 6.517 0 11.804-5.284 11.804-11.796 0-6.513-5.287-11.796-11.805-11.796zm-52.512 13.782c-27.9 0-50.519 22.603-50.519 50.482 0 27.879 22.62 50.471 50.52 50.471s50.51-22.592 50.51-50.471c0-27.879-22.613-50.482-50.513-50.482zm0 17.715c18.11 0 32.792 14.67 32.792 32.767 0 18.096-14.683 32.767-32.792 32.767-18.11 0-32.791-14.671-32.791-32.767 0-18.098 14.68-32.767 32.791-32.767z" />
  </svg>
);

const TikTokLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 352.28 398.67"
    className="w-9 h-9"
    aria-hidden="true"
  >
    <path fill="#25f4ee" d="M137.17 156.98v-15.56c-5.34-.73-10.76-1.18-16.29-1.18C54.23 140.24 0 194.47 0 261.13c0 40.9 20.43 77.09 51.61 98.97-20.12-21.6-32.46-50.53-32.46-82.31 0-65.7 52.69-119.28 118.03-120.81Z" />
    <path fill="#25f4ee" d="M140.02 333c29.74 0 54-23.66 55.1-53.13l.11-263.2h48.08c-1-5.41-1.55-10.97-1.55-16.67h-65.67l-.11 263.2c-1.1 29.47-25.36 53.13-55.1 53.13-9.24 0-17.95-2.31-25.61-6.34C105.3 323.9 121.6 333 140.02 333ZM333.13 106V91.37c-18.34 0-35.43-5.45-49.76-14.8 12.76 14.65 30.09 25.22 49.76 29.43Z" />
    <path fill="#fe2c55" d="M283.38 76.57c-13.98-16.05-22.47-37-22.47-59.91h-17.59c4.63 25.02 19.48 46.49 40.06 59.91ZM120.88 205.92c-30.44 0-55.21 24.77-55.21 55.21 0 21.2 12.03 39.62 29.6 48.86-6.55-9.08-10.45-20.18-10.45-32.2 0-30.44 24.77-55.21 55.21-55.21 5.68 0 11.13.94 16.29 2.55v-67.05c-5.34-.73-10.76-1.18-16.29-1.18-.96 0-1.9.05-2.85.07v51.49c-5.16-1.61-10.61-2.55-16.29-2.55Z" />
    <path fill="#fe2c55" d="M333.13 106v51.04c-34.05 0-65.61-10.89-91.37-29.38v133.47c0 66.66-54.23 120.88-120.88 120.88-25.76 0-49.64-8.12-69.28-21.91 22.08 23.71 53.54 38.57 88.42 38.57 66.66 0 120.88-54.23 120.88-120.88V144.33c25.76 18.49 57.32 29.38 91.37 29.38v-65.68c-6.57 0-12.97-.71-19.14-2.03Z" />
    <path d="M241.76 261.13V127.66c25.76 18.49 57.32 29.38 91.37 29.38V106c-19.67-4.21-37-14.77-49.76-29.43-20.58-13.42-35.43-34.88-40.06-59.91h-48.08l-.11 263.2c-1.1 29.47-25.36 53.13-55.1 53.13-18.42 0-34.72-9.1-44.75-23.01-17.57-9.25-29.6-27.67-29.6-48.86 0-30.44 24.77-55.21 55.21-55.21 5.68 0 11.13.94 16.29 2.55v-51.49C71.83 158.5 19.14 212.08 19.14 277.78c0 31.78 12.34 60.71 32.46 82.31C71.23 373.87 95.12 382 120.88 382c66.65 0 120.88-54.23 120.88-120.88Z" />
  </svg>
);

const TripadvisorLogo = () => (
  <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden="true">
    {/* Owl head (rounded square-circle hybrid in real mark, simplified to round) */}
    <circle cx="24" cy="24" r="20" fill="#000" />
    {/* Green "wing" top accent */}
    <path d="M9 14 Q24 6 39 14 L37 18 Q24 11 11 18 Z" fill="#34E0A1" />
    {/* Left eye (white outer, red inner — TripAdvisor signature) */}
    <circle cx="17" cy="27" r="6.5" fill="#fff" />
    <circle cx="17" cy="27" r="2.6" fill="#000" />
    <circle cx="17.6" cy="26.4" r="0.9" fill="#fff" />
    {/* Right eye (white outer, green inner — TripAdvisor signature) */}
    <circle cx="31" cy="27" r="6.5" fill="#fff" />
    <circle cx="31" cy="27" r="2.6" fill="#000" />
    <circle cx="31.6" cy="26.4" r="0.9" fill="#fff" />
    {/* Beak hint */}
    <circle cx="24" cy="34.5" r="1.4" fill="#34E0A1" />
  </svg>
);

const FacebookLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-9 h-9"
    aria-hidden="true"
  >
    {/* Official Facebook 2023+ rounded-square with white "f" */}
    <rect width="24" height="24" rx="6" fill="#0866FF" />
    <path
      fill="#fff"
      d="M14.5 12.7h2.2l.43-2.79H14.5V8.06c0-.77.38-1.52 1.59-1.52h1.22V4.16s-1.11-.19-2.17-.19c-2.21 0-3.66 1.34-3.66 3.77v2.17H9V12.7h2.48v6.99c.5.08 1 .12 1.51.12s1.01-.04 1.51-.12V12.7z"
    />
  </svg>
);

const LOGOS: React.ReactNode[] = [
  <GoogleLogo key="g" />,
  <InstagramLogo key="i" />,
  <TikTokLogo key="t" />,
  <TripadvisorLogo key="tr" />,
  <FacebookLogo key="f" />,
  <Mail key="m" size={36} className="text-[var(--primary-teal)]" strokeWidth={1.8} />,
];

export const Activate = () => {
  const t = useTranslations('home.activate');
  const actions = (t.raw('actions') as { label: string; sub: string }[]).map((a, i) => ({
    ...a,
    logo: LOGOS[i],
  }));

  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(46,174,109,0.10),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(27,111,194,0.10),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-12"
          >
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)] text-center">
              {t('h2Part1')}{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
                {t('h2Em1')}
              </span>
              {t('h2Part2')}{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
                {t('h2Em2')}
              </span>
              .
            </h2>
            <p className="text-lg md:text-xl text-[var(--text-body)] leading-relaxed max-w-2xl mx-auto text-center">
              {t('lead')}
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
          {actions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
              className="group rounded-2xl bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] hover:shadow-[0_16px_48px_rgba(27,111,194,0.18)] hover:-translate-y-1 hover:border-[var(--border-highlight)] transition-all duration-300 p-5 flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {action.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-base text-[var(--text-primary)] leading-tight">
                  {action.label}
                </div>
                <div className="text-sm text-[var(--text-secondary)] mt-1 leading-snug">
                  {action.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-[var(--text-muted)] font-display uppercase tracking-widest mt-12"
        >
          {t('footnote')}
        </motion.p>
      </div>
    </section>
  );
};

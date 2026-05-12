'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('contact.form');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(
      `Contact ${formData.company || formData.name}`,
    );
    const body = encodeURIComponent(
      `${t('name')}: ${formData.name}\n${t('email')}: ${formData.email}\n${t('company')}: ${formData.company}\n\n${t('message')}:\n${formData.message}`,
    );

    window.location.href = `mailto:support@boumrank.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-2xl p-8 shadow-[var(--glass-shadow)] text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-extrabold uppercase text-[var(--text-primary)] mb-2">
          {t('success')}
        </h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
        >
          {t('name')} *
        </label>
        <input
          id="contact-name"
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#1B6FC2]/40 focus:border-[#1B6FC2] transition-all"
          placeholder={t('namePlaceholder')}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-[#E74C3C]">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
        >
          {t('email')} *
        </label>
        <input
          id="contact-email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#1B6FC2]/40 focus:border-[#1B6FC2] transition-all"
          placeholder={t('emailPlaceholder')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-[#E74C3C]">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-company"
          className="block text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
        >
          {t('company')}
        </label>
        <input
          id="contact-company"
          type="text"
          value={formData.company}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#1B6FC2]/40 focus:border-[#1B6FC2] transition-all"
          placeholder={t('companyPlaceholder')}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
        >
          {t('message')} *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#1B6FC2]/40 focus:border-[#1B6FC2] transition-all resize-none"
          placeholder={t('messagePlaceholder')}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-[#E74C3C]">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white py-4 rounded-full font-extrabold uppercase text-sm tracking-widest shadow-[0_0_20px_rgba(27,111,194,0.4)] hover:shadow-[0_0_30px_rgba(27,111,194,0.6)] hover:scale-[1.02] transition-all"
      >
        {t('submit')}
      </button>
    </form>
  );
}

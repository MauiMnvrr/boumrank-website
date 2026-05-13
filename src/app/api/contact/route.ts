import { NextResponse } from 'next/server';
import { COMPANY } from '@/lib/constants';

/**
 * POST /api/contact
 *
 * Accepts { name, email, company?, message } and sends a notification to
 * the support inbox (CONTACT_TO_EMAIL, default support@boumrank.com) via Resend.
 *
 * Falls back to a console log if RESEND_API_KEY is absent (dev mode).
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_COMPANY = 160;
const MAX_MESSAGE = 5000;

type Body = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  locale?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const name = (body.name ?? '').trim().slice(0, MAX_NAME);
  const email = (body.email ?? '').trim().toLowerCase().slice(0, 200);
  const company = (body.company ?? '').trim().slice(0, MAX_COMPANY);
  const message = (body.message ?? '').trim().slice(0, MAX_MESSAGE);
  const locale = body.locale === 'en' ? 'en' : 'fr';

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: 'Champs requis manquants.' },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Email invalide.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM || `BoumRank <${COMPANY.email}>`;
  const toAddress = process.env.CONTACT_TO_EMAIL || COMPANY.email;

  if (!apiKey) {
    console.log('[contact] capture', {
      name,
      email,
      company,
      message,
      locale,
      at: new Date().toISOString(),
    });
    return NextResponse.json({
      ok: true,
      mode: 'dev',
      message: 'Message enregistré (mode dev, RESEND_API_KEY absente).',
    });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const subject =
      locale === 'en'
        ? `New contact: ${company || name}`
        : `Nouveau contact: ${company || name}`;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject,
      html: buildHtml({ name, email, company, message, locale }),
      text: buildText({ name, email, company, message, locale }),
      tags: [
        { name: 'form', value: 'contact' },
        { name: 'locale', value: locale },
      ],
    });

    if (error) {
      console.error('[contact] resend error', error);
      return NextResponse.json(
        { ok: false, error: "Envoi impossible pour l'instant." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, mode: 'email' });
  } catch (err) {
    console.error('[contact] unexpected error', err);
    return NextResponse.json(
      { ok: false, error: 'Erreur serveur. Réessayez dans un instant.' },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtml(p: {
  name: string;
  email: string;
  company: string;
  message: string;
  locale: 'fr' | 'en';
}): string {
  const L =
    p.locale === 'en'
      ? {
          title: 'New contact form submission',
          name: 'Name',
          email: 'Email',
          company: 'Company',
          message: 'Message',
        }
      : {
          title: 'Nouveau message via le formulaire de contact',
          name: 'Nom',
          email: 'Email',
          company: 'Entreprise',
          message: 'Message',
        };

  const messageHtml = escapeHtml(p.message).replace(/\n/g, '<br>');

  return `<!doctype html>
<html lang="${p.locale}">
<body style="margin:0;background:#F8FAFB;font-family:'Plus Jakarta Sans',Inter,system-ui,sans-serif;color:#1A202C;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="height:6px;background:linear-gradient(90deg,#1B6FC2 0%,#1E9DAA 50%,#2EAE6D 100%);"></td>
    </tr>
    <tr>
      <td style="padding:32px 32px 16px;">
        <h1 style="margin:0 0 16px;font-size:20px;font-weight:800;text-transform:uppercase;letter-spacing:-0.5px;">
          ${L.title}
        </h1>
        <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;color:#4A5568;line-height:1.6;">
          <tr><td style="padding:6px 0;width:120px;color:#9AA8B8;text-transform:uppercase;font-size:12px;letter-spacing:1px;">${L.name}</td><td style="padding:6px 0;color:#1A202C;font-weight:600;">${escapeHtml(p.name)}</td></tr>
          <tr><td style="padding:6px 0;color:#9AA8B8;text-transform:uppercase;font-size:12px;letter-spacing:1px;">${L.email}</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(p.email)}" style="color:#1B6FC2;text-decoration:none;font-weight:600;">${escapeHtml(p.email)}</a></td></tr>
          ${p.company ? `<tr><td style="padding:6px 0;color:#9AA8B8;text-transform:uppercase;font-size:12px;letter-spacing:1px;">${L.company}</td><td style="padding:6px 0;color:#1A202C;font-weight:600;">${escapeHtml(p.company)}</td></tr>` : ''}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px 32px;border-top:1px solid #E2E8ED;">
        <p style="margin:0 0 8px;color:#9AA8B8;text-transform:uppercase;font-size:12px;letter-spacing:1px;">${L.message}</p>
        <p style="margin:0;color:#1A202C;line-height:1.6;">${messageHtml}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(p: {
  name: string;
  email: string;
  company: string;
  message: string;
  locale: 'fr' | 'en';
}): string {
  const L =
    p.locale === 'en'
      ? { name: 'Name', email: 'Email', company: 'Company', message: 'Message' }
      : { name: 'Nom', email: 'Email', company: 'Entreprise', message: 'Message' };

  return `${L.name}: ${p.name}
${L.email}: ${p.email}
${p.company ? `${L.company}: ${p.company}\n` : ''}
${L.message}:
${p.message}`;
}

import { NextResponse } from 'next/server';
import { SITE_URL, COMPANY } from '@/lib/constants';

/**
 * POST /api/lead-magnet
 *
 * Accepts { email: string } and :
 * 1. Sends the Playbook PDF via Resend (if RESEND_API_KEY is set)
 * 2. Otherwise logs the capture and returns success (V1 fallback for dev)
 *
 * The PDF lives at /public/guides/playbook-boumrank-50-lots.pdf and is
 * linked in the email (public URL) — cheaper than attachment, easier to
 * update.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = { email?: string };

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

  const email = (body.email ?? '').trim().toLowerCase();

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Email invalide." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM || `BoumRank <${COMPANY.email}>`;
  const pdfUrl = `${SITE_URL}/guides/playbook-boumrank-50-lots.pdf`;

  // Dev / no-key fallback : log the capture and return success
  if (!apiKey) {
    console.log('[lead-magnet] capture', { email, at: new Date().toISOString() });
    return NextResponse.json({
      ok: true,
      mode: 'dev',
      message: "Capture enregistrée (mode dev — RESEND_API_KEY absente).",
    });
  }

  // Production : send via Resend
  try {
    // Dynamic import keeps Resend out of the edge bundle until needed
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: 'Votre Playbook BoumRank — 50 idées de lots',
      html: buildEmailHtml(pdfUrl),
      text: buildEmailText(pdfUrl),
      tags: [
        { name: 'magnet', value: 'playbook-50-lots' },
        { name: 'source', value: 'home-lead-magnet' },
      ],
    });

    if (error) {
      console.error('[lead-magnet] resend error', error);
      return NextResponse.json(
        { ok: false, error: "Envoi impossible pour l'instant." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, mode: 'email' });
  } catch (err) {
    console.error('[lead-magnet] unexpected error', err);
    return NextResponse.json(
      { ok: false, error: 'Erreur serveur. Réessayez dans un instant.' },
      { status: 500 }
    );
  }
}

function buildEmailHtml(pdfUrl: string): string {
  return `
<!doctype html>
<html lang="fr">
<body style="margin:0;background:#F8FAFB;font-family:'Plus Jakarta Sans',Inter,system-ui,sans-serif;color:#1A202C;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="height:6px;background:linear-gradient(90deg,#1B6FC2 0%,#1E9DAA 50%,#2EAE6D 100%);"></td>
    </tr>
    <tr>
      <td style="padding:32px 32px 16px;">
        <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;text-transform:uppercase;letter-spacing:-0.5px;">
          Votre Playbook BoumRank est arrivé 🎉
        </h1>
        <p style="margin:0;color:#4A5568;line-height:1.6;">
          Comme promis, voici le guide de 28 pages avec 50 idées de lots qui font revenir vos clients. Utilisez-le dès ce soir.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px 32px;">
        <a href="${pdfUrl}" style="display:inline-block;background:linear-gradient(135deg,#1B6FC2 0%,#1E9DAA 50%,#2EAE6D 100%);color:#FFFFFF;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;text-transform:uppercase;letter-spacing:1px;font-size:13px;">
          Télécharger le PDF →
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 32px;border-top:1px solid #E2E8ED;padding-top:24px;">
        <p style="margin:0 0 8px;color:#4A5568;line-height:1.6;font-size:14px;">
          On vous écrira tous les 15 jours avec une idée concrète pour booster vos avis Google et faire revenir vos clients — sans spam, juste du concret.
        </p>
        <p style="margin:16px 0 0;color:#9AA8B8;font-size:12px;">
          BoumRank — Conçu à Marseille · Propulsé par Pépite Aix-Marseille Université
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(pdfUrl: string): string {
  return `Votre Playbook BoumRank est arrivé 🎉

Comme promis, voici le guide de 28 pages avec 50 idées de lots qui font revenir vos clients. Utilisez-le dès ce soir.

Télécharger le PDF : ${pdfUrl}

On vous écrira tous les 15 jours avec une idée concrète pour booster vos avis Google — sans spam, juste du concret.

BoumRank — Conçu à Marseille · Propulsé par Pépite Aix-Marseille Université`;
}

# Guides PDF

Ce dossier hébergera les lead magnets téléchargeables.

## À produire

- `playbook-boumrank-50-lots.pdf` — le Playbook 50 idées de lots (28 pages)
  - Référencé depuis `/api/lead-magnet` → envoyé via Resend après capture email
  - Contenu : adapter l'article `_drafts/blog/comment-obtenir-50-avis-google-en-30-jours.md`
  - Format : A4 portrait, 28 pages avec branding BoumRank 2026
  - Taille cible : ≤ 5 MB

## Instructions génération

1. Convertir le markdown de l'article en PDF stylé (Notion export, Pandoc, ou Canva)
2. Appliquer la charte graphique (voir `/brand/logos/` pour les assets)
3. Exporter en PDF/A-1 pour longévité
4. Déposer ici : `playbook-boumrank-50-lots.pdf`

## Fallback actuel

En absence du PDF, `/api/lead-magnet` fonctionne en **mode dev** :
- Log la capture email dans la console serveur
- Retourne `{ ok: true, mode: 'dev' }`
- L'utilisateur voit l'écran de succès malgré tout

Une fois le PDF en place + `RESEND_API_KEY` configurée, l'email d'envoi sera automatique.

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/interne/'],
      },
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
      { userAgent: 'Claude-Web', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
      { userAgent: 'anthropic-ai', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
      { userAgent: 'Perplexity-User', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
      { userAgent: 'CCBot', allow: '/', disallow: ['/api/', '/_next/', '/interne/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

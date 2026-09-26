import { MetadataRoute } from 'next';
import { ALL_AIRPORTS } from '@/lib/config/airports.config';
import { siteConfig } from '@/lib/config/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    '',
    '/about',
    '/services',
    '/corporate',
    '/partners',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/airports',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const airportPages = ALL_AIRPORTS.map((airport) => ({
    url: `${baseUrl}/airports/${airport.code.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...airportPages];
}

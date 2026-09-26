import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/site.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/v1/health'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

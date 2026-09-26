import React from 'react';
import { siteConfig } from '@/lib/config/site.config';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'MM2 Terminal, Murtala Muhammed Airport',
      addressLocality: 'Ikeja',
      addressRegion: 'Lagos',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contacts.phone,
      contactType: 'customer service',
      email: siteConfig.contacts.email,
      areaServed: 'NG',
      availableLanguage: 'English',
    },
    sameAs: [siteConfig.social.twitter, siteConfig.social.linkedin, siteConfig.social.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

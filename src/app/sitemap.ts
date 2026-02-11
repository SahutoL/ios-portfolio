import type { MetadataRoute } from 'next';
import { getAllAppIds } from '@/lib/itunes';
import { hasContent } from '@/lib/content';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ios-portfolio.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const appIds = getAllAppIds();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/app`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tokushoho`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const appPages: MetadataRoute.Sitemap = appIds.flatMap((appId) => {
    const pages: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}/app/${appId}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];

    if (hasContent(appId)) {
      pages.push(
        {
          url: `${BASE_URL}/app/${appId}/privacy-policy`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.4,
        },
        {
          url: `${BASE_URL}/app/${appId}/terms`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.4,
        },
      );
    }

    return pages;
  });

  return [...staticPages, ...appPages];
}

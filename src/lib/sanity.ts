import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "qo94uidp",
  dataset: "production",
  apiVersion: "2026-07-24",
  useCdn: false,
  token: import.meta.env.SANITY_API_TOKEN
});

export type SanityProductDetail = {
  model: string;
  slug: string;
  images: { objectKey: string; alt?: string; caption?: string }[];
  specs: { key: string; value: string; unit?: string }[];
  content?: {
    title: string;
    summary: string;
    tagline?: string;
    seo?: { title?: string; description?: string };
    features?: { title: string; detail?: string }[];
    faq?: { question: string; answer?: string }[];
  };
};

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug && status == "published"][0]{
  model,
  "slug": slug.current,
  "images": images[]{objectKey, alt, caption},
  specs[]{key, value, unit},
  "content": *[_type == "productTranslation" && product._ref == ^._id && translation.language == $language][0]{
    title, summary, tagline, seo, features[]{title, detail}, faq[]{question, answer}
  }
}`;

const mediaOrigin = (import.meta.env.PUBLIC_MEDIA_ORIGIN || "https://media.guccidental.com").replace(/\/$/, "");

export function getR2MediaUrl(objectKey: string) {
  return `${mediaOrigin}/${objectKey.replace(/^\/+/, "")}`;
}

export async function getSanityProduct(slug: string, language = "en"): Promise<SanityProductDetail | null> {
  try {
    return await client.fetch<SanityProductDetail | null>(PRODUCT_QUERY, { slug, language });
  } catch (error) {
    console.warn(`Sanity product query failed for ${slug}; using local content.`, error);
    return null;
  }
}

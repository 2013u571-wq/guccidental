import { defineMiddleware } from "astro:middleware";

const chairTierRedirects = {
  economic: "/en/products/dental-chair/economic/",
  "mid-range": "/en/products/dental-chair/mid-range/",
  "high-end": "/en/products/dental-chair/high-end/"
} as const;

export const onRequest = defineMiddleware((context, next) => {
  if (context.url.pathname !== "/en/products/dental-chair/") return next();

  const tier = context.url.searchParams.get("tier") as keyof typeof chairTierRedirects | null;
  const destination = tier ? chairTierRedirects[tier] : undefined;

  return destination ? Response.redirect(new URL(destination, context.url), 301) : next();
});

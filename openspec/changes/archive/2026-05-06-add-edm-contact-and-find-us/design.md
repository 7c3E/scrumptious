## Context

The current product page is intentionally minimal: `src/app/page.tsx` renders a single linked `edm.jpg` image that sends visitors to checkout. The new content should extend that EDM-first page with practical store-contact and location information while preserving the image as the first and primary product touchpoint.

The requested layout should not copy the reference screenshots exactly. Instead, it should use a market-familiar ecommerce pattern similar to SHOPLINE merchant pages: a compact store information area that combines contact methods, service notes, and map preview in one scannable section. The page remains a static marketing/order-support surface and does not need new persistence, APIs, or admin behavior.

## Goals / Non-Goals

**Goals:**
- Keep `edm.jpg` at the top of the product page and preserve click/tap navigation to checkout.
- Add one responsive store information section below the EDM with store details, product/order inquiry information, phone and LINE guidance, and a map-like location panel.
- Keep implementation local to the product page and styles unless a small reusable helper is clearly warranted.

**Non-Goals:**
- Do not change checkout, order creation, order confirmation, admin order management, Prisma schema, or API routes.
- Do not introduce a map SDK or new package dependency for this static page update.
- Do not replace the existing EDM image or remove its checkout navigation behavior.

## Decisions

- Use static product-page markup with global CSS classes instead of adding a new component hierarchy. This matches the current minimal page and keeps the change easy to review.
- Combine contact and Find Us content into a single `store information` section. A common ecommerce layout is a two-column desktop block with details/actions on one side and map preview on the other, collapsing into a stacked mobile block; this gives the user one clear place to look for offline/order help.
- Use an iframe or browser-supported embed URL for the map-style area rather than a JavaScript map SDK. This gives users a recognizable map surface without adding dependencies, API keys, or client-side map state.
- Represent contact actions as simple page elements. Phone should use `tel:24235111`; LINE should fall back to copy/instruction text unless a confirmed public LINE account URL is supplied later.
- Keep the new section below the EDM so the page remains EDM-first. Desktop can use two-column content for details/actions and map preview; mobile should stack content in reading order.

## Risks / Trade-offs

- External map embeds can fail because of network, browser, or provider restrictions -> Provide visible address/location context so the section remains useful if the embedded map does not load.
- LINE account URL may be unavailable in existing project data -> Keep the CTA label clear and avoid hard-coding an unverified account ID unless supplied during implementation.
- Adding content below an image-only EDM changes the original page simplicity -> Preserve the EDM as the first viewport content and keep the supplemental store information section visually distinct below it.
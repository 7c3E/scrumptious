## Context

The product page in `src/app/page.tsx` is an EDM-first landing page. The EDM image already links to `/checkout`, and the page includes store contact and location information below the image. The requested change adds a more obvious persistent order action without changing checkout behavior or introducing new data flow.

## Goals / Non-Goals

**Goals:**
- Add a fixed floating order button on the product page near the right edge and approximately one-quarter down from the top of the viewport.
- Route the button directly to `/checkout` using the existing Next.js navigation approach.
- Give the button a playful, cute visual style while keeping text readable, touch targets usable, and focus states visible.
- Keep the button responsive so it does not obscure important EDM, store, or map content on smaller viewports.

**Non-Goals:**
- Change checkout form behavior, order creation, transfer information, or order persistence.
- Replace the existing EDM image link to checkout.
- Add new assets, dependencies, analytics, or backend configuration.

## Decisions

- Use a `Link` in `src/app/page.tsx` for the floating CTA so navigation remains consistent with the current EDM image link and avoids client-side event code.
- Style the CTA in `src/app/globals.css` with fixed positioning, `right` spacing, and `top: 25vh` or equivalent transform logic so it appears around the requested right-side upper one-quarter position.
- Use compact cute copy and light decorative styling through CSS rather than adding image assets, keeping the implementation small and easy to maintain.
- Include an accessible label and visible focus treatment so keyboard and assistive technology users can identify the checkout action.
- Add responsive CSS adjustments for mobile viewports so the CTA remains tappable but shifts inward or downward as needed to avoid covering core content.

## Risks / Trade-offs

- Floating controls can cover page content on narrow screens -> Mitigate with responsive sizing, safe-area-aware spacing, and placement that avoids the primary EDM and store action areas as much as practical.
- A playful visual treatment can reduce clarity if overdone -> Mitigate by keeping the label direct, contrast strong, and the checkout destination obvious.
- Fixed-position elements can feel distracting during scroll -> Mitigate by using a single small CTA without animation that changes layout or captures attention excessively.
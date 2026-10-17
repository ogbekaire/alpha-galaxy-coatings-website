# Alpha Galaxy Coatings — Pre-Publication Audit

Date: 2026-10-16

## Fixed
- Corrected the Spanish infographic footer issue by removing the erroneous tiny footer line while preserving the approved graphic.
- Added separate English (`/`) and Spanish (`/es/`) pages with language switch and hreflang metadata.
- Removed unused ZIP/timing collection from the local calculator. No personal data is collected or transmitted in this build.
- Replaced `innerHTML` result rendering with safe DOM/text operations.
- Calculator validates numeric range and avoids false precision: garage shows starting price; repair charges remain a conditional notice pending inspection.
- Video has no audio track and was recompressed from ~10.4 MB to ~1.8 MB with fast-start metadata.
- Optimized header logo to WebP.
- Added local-only asset policy: no third-party scripts, fonts, trackers, analytics, or CDNs.
- Added Content Security Policy, referrer policy, and production security-header file.
- Added clickjacking protection policy (DENY / frame-ancestors none) for production hosting.
- Added privacy and estimate-terms pages in both languages.
- Added canonical/hreflang metadata, robots.txt, sitemap.xml, image alt text, lazy loading, and dimensions.
- Removed strange customer-facing defensive copy about a “20-year guarantee”; the site simply avoids making unsupported warranty claims.
- Kept driveway chemistry intentionally non-specific until the exterior base system is finalized.

## Security posture
This build is a static website with no server-side code, database, login panel, package dependencies, public admin endpoint, or embedded secrets. That makes the attack surface much smaller than a CMS. No internet-facing system can be guaranteed impossible to hack. Security still depends on the final hosting account, GitHub account, DNS/GoDaddy account, HTTPS configuration, and the future ServiceSales AI integration.

## Required before production
1. Host only over HTTPS.
2. Enforce the included security headers at the hosting layer; do not rely only on meta CSP.
3. Enable MFA/passkeys on GitHub, hosting, GoDaddy, ServiceSales AI, email, and Meta.
4. Never place ServiceSales AI private API keys in browser JavaScript. Website-to-ServiceSales writes must use a purpose-built public lead endpoint with tenant scoping, validation, rate limiting, anti-spam, consent logging, CORS/origin checks, and idempotency.
5. Test the final domain, HTTPS, headers, 404 handling, both languages, calculator, and mobile layout after deployment.
6. Add analytics only if needed, with privacy review and CSP updates.

## Current publication status
Code/content package is ready for staging review. ServiceSales AI lead submission is intentionally NOT connected yet.

## Runtime test note
HTML links, anchors, assets, JavaScript syntax, CSS parsing, secret patterns, external-script usage, and video streams were validated in the build environment. Automated Chromium navigation to localhost/file URLs is blocked by the environment administrator, so the final real-browser desktop/mobile, HTTPS, and response-header verification must be run against the staging URL immediately after deployment and before the production domain is switched.

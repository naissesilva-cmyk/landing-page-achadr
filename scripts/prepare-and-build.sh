#!/usr/bin/env bash
set -euo pipefail

ARCHIVE="achadr-landing-page_revisado-SS4C_2026-08-31.zip"
WORKDIR=".achadr-source"

rm -rf "$WORKDIR" app public
mkdir -p "$WORKDIR"
unzip -q "$ARCHIVE" -d "$WORKDIR"
SOURCE="$WORKDIR/achadr-landing-page"

cp -R "$SOURCE/app" ./app
cp -R "$SOURCE/public" ./public

cp overrides/layout.tsx app/layout.tsx
cp overrides/InterestForm.tsx app/components/InterestForm.tsx
cp overrides/MetaPixelConsent.tsx app/components/MetaPixelConsent.tsx
cp overrides/interesse-route.ts app/api/interesse/route.ts
cp overrides/privacidade-page.tsx app/privacidade/page.tsx
cp overrides/meta-pixel.css app/meta-pixel.css

npx next build

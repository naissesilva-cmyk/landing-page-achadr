#!/usr/bin/env bash
set -euo pipefail

ARCHIVE="achadr-landing-page_revisado-SS4C_2026-08-31.zip"
WORKDIR=".achadr-source"
PATCH_COMMIT="c8d37c5a679a4e05ebb2548e5bbcd3b79f9d8f8e"
RAW_BASE="https://raw.githubusercontent.com/naissesilva-cmyk/landing-page-achadr/${PATCH_COMMIT}/overrides"

rm -rf "$WORKDIR" app public
mkdir -p "$WORKDIR"
unzip -q "$ARCHIVE" -d "$WORKDIR"
SOURCE="$WORKDIR/achadr-landing-page"

cp -R "$SOURCE/app" ./app
cp -R "$SOURCE/public" ./public

curl -fsSL "$RAW_BASE/layout.tsx" -o app/layout.tsx
curl -fsSL "$RAW_BASE/InterestForm.tsx" -o app/components/InterestForm.tsx
curl -fsSL "$RAW_BASE/MetaPixelConsent.tsx" -o app/components/MetaPixelConsent.tsx
curl -fsSL "$RAW_BASE/interesse-route.ts" -o app/api/interesse/route.ts
curl -fsSL "$RAW_BASE/privacidade-page.tsx" -o app/privacidade/page.tsx
curl -fsSL "$RAW_BASE/meta-pixel.css" -o app/meta-pixel.css

node <<'NODE'
const fs = require('fs');
const path = 'app/components/MetaPixelConsent.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content
  .replace('Cookies e mensuração', 'Preferências de cookies')
  .replace(
    'Usamos tecnologias de mensuração da Meta para entender o desempenho das campanhas.\n          Elas só são ativadas com sua autorização. Veja nossa ',
    'Usamos cookies essenciais para o funcionamento do site e cookies opcionais para análise de uso.\n          Você pode aceitar todos ou manter apenas os essenciais. Veja nossa '
  )
  .replace('Recusar', 'Somente essenciais')
  .replace('Aceitar', 'Aceitar todos');
fs.writeFileSync(path, content);
NODE

npx next build

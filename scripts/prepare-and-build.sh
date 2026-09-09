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
curl -fsSL "$RAW_BASE/interesse-route.ts" -o app/api/interesse/route.ts
curl -fsSL "$RAW_BASE/privacidade-page.tsx" -o app/privacidade/page.tsx
curl -fsSL "$RAW_BASE/meta-pixel.css" -o app/meta-pixel.css

cat > app/components/MetaPixelConsent.tsx <<'EOF'
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PIXEL_ID = "1741807800209210";

type Consent = "accepted" | "rejected" | null;

type MetaWindow = Window & {
  fbq?: ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue?: unknown[];
    loaded?: boolean;
    version?: string;
    push?: (...args: unknown[]) => void;
  };
  _fbq?: MetaWindow["fbq"];
  __achadrMetaPixelInitialized?: boolean;
};

function initializeMetaPixel() {
  const metaWindow = window as MetaWindow;
  if (metaWindow.__achadrMetaPixelInitialized) return;
  metaWindow.__achadrMetaPixelInitialized = true;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue?.push(args);
  } as NonNullable<MetaWindow["fbq"]>;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  metaWindow.fbq = fbq;
  metaWindow._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", PIXEL_ID);
  fbq("track", "PageView");

  if (window.localStorage.getItem("achadr_pending_meta_lead") === "1") {
    fbq("track", "Lead");
    window.localStorage.removeItem("achadr_pending_meta_lead");
  }
}

export default function MetaPixelConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("achadr_cookie_consent") as Consent;
    setConsent(saved === "accepted" || saved === "rejected" ? saved : null);
    setReady(true);
    if (saved === "accepted") initializeMetaPixel();
  }, []);

  const accept = () => {
    window.localStorage.setItem("achadr_cookie_consent", "accepted");
    setConsent("accepted");
    initializeMetaPixel();
  };

  const reject = () => {
    window.localStorage.setItem("achadr_cookie_consent", "rejected");
    window.localStorage.removeItem("achadr_pending_meta_lead");
    setConsent("rejected");
  };

  if (!ready || consent !== null) return null;

  if (showPreferences) {
    return (
      <aside className="cookie-banner" aria-label="Preferências de cookies">
        <div className="cookie-banner-copy">
          <strong>Preferências de cookies</strong>
          <p>
            Os cookies essenciais permanecem ativos para o funcionamento do site. Cookies opcionais de análise só são ativados com sua escolha. Veja nossa <Link href="/privacidade">Política de Privacidade</Link>.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button type="button" className="cookie-button cookie-button-secondary" onClick={reject}>
            Somente essenciais
          </button>
          <button type="button" className="cookie-button cookie-button-primary" onClick={accept}>
            Aceitar opcionais
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="cookie-banner" aria-label="Aviso de cookies">
      <div className="cookie-banner-copy">
        <strong>Aviso de cookies</strong>
        <p>
          Utilizamos cookies para melhorar sua experiência em nosso ambiente digital. Saiba mais sobre como a achaDR trata seus dados pessoais em nossa <Link href="/privacidade">Política de Privacidade</Link>.
        </p>
      </div>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-button cookie-button-secondary" onClick={() => setShowPreferences(true)}>
          Gerenciar preferências
        </button>
        <button type="button" className="cookie-button cookie-button-primary" onClick={accept}>
          Ok, entendi!
        </button>
      </div>
    </aside>
  );
}
EOF

npx next build

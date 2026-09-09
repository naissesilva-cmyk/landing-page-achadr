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
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue?.push(args);
    }
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

  useEffect(() => {
    const saved = window.localStorage.getItem("achadr_cookie_consent") as Consent;
    setConsent(saved === "accepted" || saved === "rejected" ? saved : null);
    setReady(true);

    if (saved === "accepted") {
      initializeMetaPixel();
    }
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

  return (
    <aside className="cookie-banner" aria-label="Preferências de cookies">
      <div className="cookie-banner-copy">
        <strong>Cookies e mensuração</strong>
        <p>
          Usamos tecnologias de mensuração da Meta para entender o desempenho das campanhas.
          Elas só são ativadas com sua autorização. Veja nossa <Link href="/privacidade">Política de Privacidade</Link>.
        </p>
      </div>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-button cookie-button-secondary" onClick={reject}>
          Recusar
        </button>
        <button type="button" className="cookie-button cookie-button-primary" onClick={accept}>
          Aceitar
        </button>
      </div>
    </aside>
  );
}

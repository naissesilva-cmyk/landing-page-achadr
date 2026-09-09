type LeadPayload = {
  profile?: string;
  name?: string;
  contact?: string;
  city?: string;
  state?: string;
  specialty?: string;
  profession?: string;
  councilRegistration?: string;
  consent?: boolean;
  website?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  landingPath?: string;
};

const SUPABASE_URL = "https://oqkgsicqsxoghhweesfi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_hR6ZHo8XfmZ8DFscuJShng_3ejOHSrj";

const clean = (value: unknown, maxLength = 180) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const profile = clean(payload.profile, 20);
    const name = clean(payload.name, 120);
    const contact = clean(payload.contact, 180);
    const city = clean(payload.city, 120);
    const state = clean(payload.state, 2).toUpperCase();
    const specialty = clean(payload.specialty, 140);
    const profession = clean(payload.profession, 140);
    const councilRegistration = clean(payload.councilRegistration, 80);

    if (payload.website) {
      return Response.json({ success: true }, { status: 201 });
    }

    if (profile !== "profissional") {
      return Response.json({ error: "Este cadastro é exclusivo para profissionais de saúde." }, { status: 400 });
    }

    if (name.length < 2 || contact.length < 5) {
      return Response.json({ error: "Informe seu nome e um contato válido." }, { status: 400 });
    }

    if (!profession || !specialty) {
      return Response.json({ error: "Informe sua profissão e especialidade." }, { status: 400 });
    }

    if (!councilRegistration) {
      return Response.json({ error: "Informe seu registro no conselho profissional." }, { status: 400 });
    }

    if (payload.consent !== true) {
      return Response.json({ error: "É necessário aceitar a Política de Privacidade." }, { status: 400 });
    }

    const supabaseResponse = await fetch(`${SUPABASE_URL}/rest/v1/professional_leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name,
        contact,
        city: city || null,
        state: state || null,
        specialty,
        profession,
        council_registration: councilRegistration,
        consent_at: new Date().toISOString(),
        source: "landing_page",
        utm_source: clean(payload.utmSource, 120) || null,
        utm_medium: clean(payload.utmMedium, 120) || null,
        utm_campaign: clean(payload.utmCampaign, 180) || null,
        utm_content: clean(payload.utmContent, 180) || null,
        utm_term: clean(payload.utmTerm, 180) || null,
        fbclid: clean(payload.fbclid, 255) || null,
        landing_path: clean(payload.landingPath, 500) || null,
      }),
    });

    if (!supabaseResponse.ok) {
      const details = await supabaseResponse.text();
      console.error("Supabase lead insert failed", supabaseResponse.status, details);
      return Response.json(
        { error: "Não foi possível concluir o cadastro agora. Tente novamente em instantes." },
        { status: 500 },
      );
    }

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to save interest lead", error);
    return Response.json(
      { error: "Não foi possível concluir o cadastro agora. Tente novamente em instantes." },
      { status: 500 },
    );
  }
}

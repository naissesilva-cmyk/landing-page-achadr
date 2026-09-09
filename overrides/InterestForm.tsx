"use client";

import { FormEvent, useState } from "react";

const states = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
];

type SubmitStatus = { type: "idle" | "loading" | "success" | "error"; message: string };

export default function InterestForm() {
  const [status, setStatus] = useState<SubmitStatus>({ type: "idle", message: "" });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const params = new URLSearchParams(window.location.search);

    setStatus({ type: "loading", message: "Enviando cadastro…" });

    try {
      const response = await fetch("/api/interesse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          profile: "profissional",
          consent: data.consent === "on",
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
          utmContent: params.get("utm_content") || "",
          utmTerm: params.get("utm_term") || "",
          fbclid: params.get("fbclid") || "",
          landingPath: `${window.location.pathname}${window.location.search}`,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Não foi possível concluir o cadastro.");
      }

      const metaWindow = window as Window & { fbq?: (...args: unknown[]) => void };
      if (metaWindow.fbq) {
        metaWindow.fbq("track", "Lead");
      } else if (window.localStorage.getItem("achadr_cookie_consent") !== "rejected") {
        window.localStorage.setItem("achadr_pending_meta_lead", "1");
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Cadastro concluído. Sua inscrição gratuita e a condição especial da taxa de parceria foram registradas.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Não foi possível concluir o cadastro.",
      });
    }
  };

  return (
    <div className="interest-card">
      <div className="form-profile-heading">
        <span>Cadastro profissional</span>
        <h3>Quero minha inscrição gratuita</h3>
        <p>Cadastre seu interesse sem custo e registre a redução permanente na taxa de parceria.</p>
      </div>

      <form className="interest-form" onSubmit={submit}>
        <div className="form-field">
          <label htmlFor="interest-name">Nome completo</label>
          <input id="interest-name" name="name" type="text" autoComplete="name" required placeholder="Seu nome" />
        </div>

        <div className="form-field">
          <label htmlFor="interest-contact">E-mail ou WhatsApp</label>
          <input id="interest-contact" name="contact" type="text" autoComplete="email" required placeholder="Informe um contato válido" />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="interest-city">Cidade</label>
            <input id="interest-city" name="city" type="text" autoComplete="address-level2" placeholder="Sua cidade" />
          </div>
          <div className="form-field form-field-small">
            <label htmlFor="interest-state">Estado</label>
            <select id="interest-state" name="state" autoComplete="address-level1" defaultValue="">
              <option value="">UF</option>
              {states.map((state) => <option value={state} key={state}>{state}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="professional-profession">Profissão</label>
            <input id="professional-profession" name="profession" type="text" required placeholder="Ex.: psicólogo" />
          </div>
          <div className="form-field">
            <label htmlFor="professional-specialty">Especialidade</label>
            <input id="professional-specialty" name="specialty" type="text" required placeholder="Sua especialidade" />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="professional-council">Registro no conselho profissional</label>
          <input id="professional-council" name="councilRegistration" type="text" required placeholder="Ex.: CRM/SP 123456, CRP 06/123456 ou CRN-3 12345" />
          <small className="field-helper">Informe o número e a identificação do conselho. Para médicos especialistas, o RQE poderá ser solicitado na etapa de validação.</small>
        </div>

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="interest-website">Site</label>
          <input id="interest-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="consent-field">
          <input name="consent" type="checkbox" required />
          <span>Autorizo o tratamento dos meus dados para este cadastro e confirmo que li a <a href="/privacidade" target="_blank">Política de Privacidade</a> e os <a href="/termos" target="_blank">Termos de Uso</a>.</span>
        </label>

        <button className="button button-coral form-submit" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "Enviando…" : "Cadastrar como profissional"}
        </button>

        <p className="registration-note">Nenhum valor é cobrado no pré-cadastro. A taxa de parceria incide somente sobre atendimentos realizados.</p>
        <p className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p>
      </form>
    </div>
  );
}

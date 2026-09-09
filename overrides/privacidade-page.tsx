import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Política de Privacidade | achaDR",
  description: "Política de Privacidade da achaDR e informações sobre o tratamento de dados pessoais.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Política de Privacidade"
      introduction="Esta Política explica quais dados a achaDR coleta, como eles são utilizados e quais direitos podem ser exercidos pelos titulares."
    >
      <h2>1. Dados que coletamos</h2>
      <ul>
        <li><strong>Cadastro antecipado profissional:</strong> nome, e-mail ou WhatsApp, cidade, estado, profissão, especialidade e registro no conselho profissional.</li>
        <li><strong>Cadastro na plataforma:</strong> dados de identificação e contato necessários para criação e validação da conta.</li>
        <li><strong>Atendimento:</strong> informações necessárias para viabilizar a consulta e os registros produzidos pelo profissional, conforme os recursos utilizados.</li>
        <li><strong>Pagamentos e repasses:</strong> dados necessários para processar o pagamento do paciente, ativar a conta de pagamentos do profissional e realizar os respectivos repasses.</li>
        <li><strong>Pagamento:</strong> identificadores da cobrança e da transação. Os dados completos do cartão são tratados pelo parceiro de pagamentos.</li>
        <li><strong>Uso e segurança:</strong> registros de acesso e informações técnicas necessárias à operação, prevenção de fraudes e proteção da plataforma.</li>
        <li><strong>Mensuração de campanhas:</strong> mediante autorização, dados técnicos de navegação e eventos de conversão podem ser tratados por ferramentas de mensuração, como o Pixel da Meta, para avaliar o desempenho de campanhas publicitárias.</li>
      </ul>

      <h2>2. Para que utilizamos os dados</h2>
      <p>Os dados são utilizados para registrar o cadastro antecipado e a condição de lançamento do profissional, evitar duplicidades, criar e validar a conta quando o acesso for disponibilizado, viabilizar atendimentos, processar pagamentos e repasses, cumprir obrigações legais e regulatórias, proteger os usuários e melhorar o funcionamento da plataforma.</p>

      <h2>3. Bases legais</h2>
      <p>O tratamento poderá ocorrer com fundamento no consentimento, na execução de contrato ou de procedimentos preliminares, no cumprimento de obrigações legais e regulatórias, na tutela da saúde e em outras hipóteses previstas na legislação, conforme a finalidade e a categoria do dado.</p>

      <h2>4. Compartilhamento</h2>
      <p>A achaDR compartilha somente os dados necessários com usuários envolvidos no atendimento e com fornecedores que viabilizam recursos como hospedagem, comunicação, vídeo, processamento de pagamentos, prescrição eletrônica e suporte tecnológico. Para pagamentos, ativação da conta e repasses, os dados necessários poderão ser compartilhados com o parceiro de pagamentos. Também poderá compartilhar informações quando houver obrigação legal ou determinação de autoridade competente. A achaDR não vende dados pessoais.</p>

      <h2>5. Armazenamento e segurança</h2>
      <p>São adotadas medidas técnicas e organizacionais compatíveis com a natureza dos dados tratados, como controle de acesso, proteção das comunicações e registro de operações. Nenhum ambiente é totalmente imune a incidentes, mas a achaDR trabalha para prevenir acessos indevidos e reduzir riscos.</p>

      <h2>6. Prazo de retenção</h2>
      <p>Os dados são mantidos pelo período necessário para cumprir as finalidades informadas e as obrigações legais ou regulatórias. Após esse prazo, poderão ser eliminados ou anonimizados, salvo quando a conservação for permitida ou exigida pela legislação.</p>

      <h2>7. Direitos dos titulares</h2>
      <p>O titular pode solicitar confirmação do tratamento, acesso, correção, informação sobre compartilhamentos, portabilidade, anonimização, bloqueio ou eliminação, quando aplicável, além de revogar o consentimento. Alguns dados poderão ser mantidos quando houver obrigação legal ou outra base que autorize a retenção.</p>

      <h2>8. Contato e solicitações</h2>
      <p>Dúvidas e solicitações relacionadas a dados pessoais podem ser encaminhadas pelos canais oficiais de atendimento da achaDR. A identificação do encarregado pelo tratamento de dados será mantida atualizada nesta Política ou na plataforma.</p>

      <h2>9. Cookies e mensuração</h2>
      <p>Tecnologias de mensuração e publicidade, incluindo o Pixel da Meta, somente são ativadas após autorização do visitante. A preferência fica registrada no navegador e pode ser alterada mediante limpeza dos dados locais do site. Esses recursos são usados para medir visitas e cadastros originados de campanhas, sem que a achaDR envie dados clínicos, diagnósticos ou informações de saúde para fins publicitários.</p>

      <h2>10. Alterações</h2>
      <p>Esta Política poderá ser atualizada para refletir mudanças na plataforma, na operação ou na legislação. A versão vigente ficará disponível neste endereço. Consulte também os <Link href="/termos">Termos de Uso</Link>.</p>

      <div className="legal-contact">
        <strong>Transparência desde o cadastro</strong>
        <p>O formulário coleta somente os dados apresentados nos campos e o registro do consentimento para esse tratamento. O envio não libera acesso imediato nem gera compromisso de contato individual.</p>
      </div>
    </LegalPageLayout>
  );
}

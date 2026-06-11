import AppShell from "../../components/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import coverImage from "../../assets/img/ds-higienizacao-sofa.jpg";
import professionalImage from "../../assets/img/ds-eletricista.jpg";
import watermarkLogo from "../../../DesignSystem/img/logoNewImage2.png";

const profileItems = [
  { label: "Editar informações do perfil", target: "profileEdit" },
  { label: "Perfil público", target: "professionalProfile" },
  { label: "Histórico de transações", target: "professionalAccount" },
  { label: "Meio de pagamento", target: "payment" },
  { label: "Meu plano", target: "professionalAccount" },
];

const legalItems = [
  "Termos & Condições",
  "Políticas de privacidade",
];

export default function ProfessionalAccountPage({ setScreen }) {
  return (
    <AppShell className="professional-account-shell">
      <img className="brand-watermark" src={watermarkLogo} alt="" aria-hidden="true" />

      <section className="professional-account-cover" style={{ backgroundImage: `url(${coverImage})` }}>
        <img src={professionalImage} alt="Ytn Profissional" />
      </section>

      <section className="professional-account-profile">
        <strong>Ytn Profissional</strong>
        <span>profissional@youtan.com.br</span>
        <small>São José dos Campos - SP</small>
        <em>Plano Básico</em>
      </section>

      <section className="professional-completion">
        <div className="completion-ring" aria-label="Perfil 78% completo">
          <span>78%</span>
        </div>
        <div>
          <strong>Perfil 78% completo</strong>
          <p>Complete seu perfil para receber mais propostas e se destacar</p>
        </div>
      </section>

      <nav className="professional-account-menu" aria-label="Conta do profissional">
        <h2>Perfil</h2>
        {profileItems.map((item) => (
          <button type="button" key={item.label} onClick={() => setScreen(item.target)}>
            <span>
              <Icon name="sync" />
              {item.label}
            </span>
            <Icon name="arrowRight" />
          </button>
        ))}

        <h2>Portfólio</h2>
        <button type="button" onClick={() => setScreen("professionalServices")}>
          <span>
            <Icon name="sync" />
            Meus serviços
          </span>
          <Icon name="arrowRight" />
        </button>

        <h2>Legal</h2>
        {legalItems.map((label) => (
          <button type="button" key={label}>
            <span>
              <Icon name="page" />
              {label}
            </span>
            <Icon name="arrowRight" />
          </button>
        ))}

        <button className="professional-logout" type="button" onClick={() => setScreen("home")}>
          <span>
            <Icon name="logout" />
            Desconectar
          </span>
        </button>
      </nav>

      <ProfessionalBottomNav active="professionalAccount" setScreen={setScreen} />
    </AppShell>
  );
}

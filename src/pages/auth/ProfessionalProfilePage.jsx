import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import professionalImage from "../../assets/img/ds-eletricista.jpg";
import coverImage from "../../assets/img/ds-account-cover.jpg";
import serviceOne from "../../assets/img/service-home.jpg";
import serviceTwo from "../../assets/img/ds-torneira.jpg";
import StepHeader from "../../components/StepHeader.jsx";
import watermarkLogo from "../../../DesignSystem/img/logoNewImage2.png";

const services = [
  { title: "Assentamento de piso", photos: "3 fotos", image: serviceOne },
  { title: "Reparo hidráulico residencial", photos: "5 fotos", image: serviceTwo },
];

const reviews = [
  "Gostaria de enfatizar que a complexidade dos estudos efetuados apresenta tendências no sentido de aprovar a manutenção das novas proposições.",
  "Atendimento rápido, organizado e cuidadoso durante todo o serviço.",
];

export default function ProfessionalProfilePage({ loginAudience, setScreen }) {
  const isProfessional = loginAudience === "professional";

  return (
    <AppShell className="professional-shell">
      <img className="brand-watermark professional-profile-watermark" src={watermarkLogo} alt="" aria-hidden="true" />

      <StepHeader
        className="professional-topbar"
        title="Perfil Público"
        showProgress={false}
        onBack={() => setScreen(isProfessional ? "professionalAccount" : "orderDetail")}
      />

      <section className="professional-cover" style={{ backgroundImage: `url(${coverImage})` }}>
        <img src={professionalImage} alt="Ytp Profissional" />
      </section>

      <section className="professional-profile">
        <h1>Ytp Profissional</h1>
        <p><strong>4.6</strong> (5 avaliações)</p>
        <span>Encanador e marido de aluguel</span>
      </section>

      <section className="professional-section professional-projects">
        <header>
          <h2>3 serviços</h2>
          <button type="button" onClick={() => setScreen("professionalServices")}>Ver tudo</button>
        </header>

        <div className="professional-project-grid">
          {services.map((service) => (
            <button type="button" key={service.title} onClick={() => setScreen("professionalServiceDetail")}>
              <img src={service.image} alt={service.title} />
              <strong>{service.title}</strong>
              <span>{service.photos}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="professional-section">
        <h2>Sobre mim</h2>
        <p>Profissional especializado em instalações residenciais, reparos e manutenções.</p>
      </section>

      <section className="professional-section">
        <h2>Cidades atendidas</h2>
        <p>São José dos Campos</p>
        <p>Jacareí</p>
      </section>

      <section className="professional-section professional-reviews">
        <header>
          <h2>3 avaliações</h2>
          <button type="button">Ver tudo</button>
        </header>

        <div className="review-row">
          {reviews.map((review) => (
            <article key={review}>
              <div>★ ★ ★ ★ ★</div>
              <p>“{review}”</p>
              <button type="button">Ver mais detalhes</button>
            </article>
          ))}
        </div>
      </section>

      {isProfessional ? (
        <ProfessionalBottomNav active="professionalAccount" setScreen={setScreen} />
      ) : (
        <BottomNav active="myOrders" setScreen={setScreen} />
      )}
    </AppShell>
  );
}

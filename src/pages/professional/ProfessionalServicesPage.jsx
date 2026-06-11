import AppShell from "../../components/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import defaultServiceCover from "../../assets/img/service-home.jpg";

export default function ProfessionalServicesPage({ setScreen, professionalServices = [] }) {
  return (
    <AppShell className="professional-services-shell">
      <StepHeader
        className="professional-services-topbar"
        title="Serviços"
        showProgress={false}
        onBack={() => setScreen("professionalAccount")}
      />

      {professionalServices.length ? (
        <section className="professional-services-grid">
          <button className="service-new-card" type="button" onClick={() => setScreen("serviceCreatePhotos")}>
            <Icon name="add" />
            <span>Novo Serviço</span>
          </button>

          {professionalServices.map((service) => (
            <button
              className="service-portfolio-card"
              type="button"
              key={service.id}
              onClick={() => setScreen("professionalServiceDetail")}
            >
              <img src={service.cover || defaultServiceCover} alt={service.title} />
              <strong>{service.title}</strong>
              <small>{service.photos} Fotos</small>
            </button>
          ))}
        </section>
      ) : (
        <section className="professional-services-empty">
          <strong>Você ainda não possui nenhum serviço cadastrado</strong>
          <PrimaryAction onClick={() => setScreen("serviceCreatePhotos")}>Criar Novo Serviço</PrimaryAction>
        </section>
      )}

      <ProfessionalBottomNav active="professionalAccount" setScreen={setScreen} />
    </AppShell>
  );
}

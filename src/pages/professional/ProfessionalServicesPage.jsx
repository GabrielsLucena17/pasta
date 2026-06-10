import AppShell from "../../components/AppShell.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import StepHeader from "../../components/StepHeader.jsx";

export default function ProfessionalServicesPage({ setScreen }) {
  return (
    <AppShell className="professional-services-shell">
      <StepHeader
        className="professional-services-topbar"
        title="Serviços"
        showProgress={false}
        onBack={() => setScreen("professionalAccount")}
      />

      <section className="professional-services-empty">
        <strong>Você ainda não possui nenhum serviço cadastrado</strong>
        <PrimaryAction onClick={() => setScreen("serviceCreatePhotos")}>Criar Novo Serviço</PrimaryAction>
      </section>

      <ProfessionalBottomNav active="professionalAccount" setScreen={setScreen} />
    </AppShell>
  );
}

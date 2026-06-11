import AppShell from "../components/AppShell.jsx";
import FixedAction from "../components/FixedAction.jsx";
import Icon from "../components/Icon.jsx";
import PrimaryAction from "../components/PrimaryAction.jsx";
import StepHeader from "../components/StepHeader.jsx";

const periodLabels = {
  morning: "Manha",
  afternoon: "Tarde",
  night: "Noite",
};

function SummaryItem({ label, children, onEdit }) {
  return (
    <div className="summary-item">
      <div className="summary-item-header">
        <span>{label}</span>
        <button type="button" aria-label={`Editar ${label}`} onClick={onEdit}>
          <Icon name="edit" />
        </button>
      </div>
      <strong>{children}</strong>
    </div>
  );
}

export default function SummaryPage({ order, setScreen, setEditingFromSummary, setLoginAudience }) {
  function edit(screen) {
    setEditingFromSummary(true);
    setScreen(screen);
  }

  function goToClientLogin() {
    setLoginAudience("client");
    setScreen("login");
  }

  const addressLine = order.address
    ? `${order.address.street}, ${order.number || "s/n"}`
    : "Endereco nao informado";

  const addressDetails = order.address
    ? `${order.address.neighborhood}, ${order.address.city} - ${order.address.state}`
    : "";

  const selectedPeriods = order.periods.length
    ? order.periods.map((period) => periodLabels[period]).join("; ")
    : "Nenhum periodo selecionado";

  return (
    <AppShell className="step-shell summary-shell">
      <StepHeader className="summary-topbar" showProgress={false} onBack={() => setScreen("address")} />

      <section className="summary-step">
        <h1>Revise seu pedido</h1>
        <p>Confira as informações antes de finalizar a solicitação.</p>

        <div className="summary-panel">
          <SummaryItem label="Serviço" onEdit={() => edit("categories")}>
            {order.category || "Nao selecionado"}
          </SummaryItem>

          <SummaryItem label="Urgência" onEdit={() => edit("description")}>
            {order.urgent === null ? "Nao informado" : order.urgent ? "Sim, é urgente" : "Nao é urgente"}
          </SummaryItem>

          <SummaryItem label="Fotos" onEdit={() => edit("photos")}>
            {order.photos.length ? `${order.photos.length} foto${order.photos.length > 1 ? "s" : ""} adicionada${order.photos.length > 1 ? "s" : ""}` : "Nenhuma foto adicionada"}
          </SummaryItem>

          <SummaryItem label="Descricao" onEdit={() => edit("description")}>
            {order.description || "Sem descricao"}
          </SummaryItem>

          <SummaryItem label="Disponibilidade" onEdit={() => edit("availability")}>
            {selectedPeriods}
          </SummaryItem>

          <SummaryItem label="Endereco" onEdit={() => edit("address")}>
            <>
              {addressLine}
              {addressDetails && <small>{addressDetails}</small>}
              {order.complement && <small>{order.complement}</small>}
            </>
          </SummaryItem>
        </div>
      </section>

      <FixedAction>
        <PrimaryAction onClick={goToClientLogin}>Finalizar pedido</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

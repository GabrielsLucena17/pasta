import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import { mockedServiceOrder } from "../../data/mockOrder.js";

const tabs = [
  { id: "available", label: "Disponíveis", count: 1 },
  { id: "progress", label: "Em andamento", count: 1 },
  { id: "finished", label: "Finalizados", count: 0 },
];

export default function ProfessionalOrdersPage({ setOrderDetailInitialTab, setScreen, updateOrder }) {
  const [activeTab, setActiveTab] = useState("available");

  function openAvailableOrder() {
    updateOrder({
      category: mockedServiceOrder.category,
      urgent: mockedServiceOrder.urgent,
      status: "Aguardando propostas",
    });
    setOrderDetailInitialTab("details");
    setScreen("orderDetail");
  }

  function openProgressOrder() {
    updateOrder({
      category: mockedServiceOrder.category,
      urgent: mockedServiceOrder.urgent,
      status: "Aguardando código de início",
    });
    setOrderDetailInitialTab("details");
    setScreen("orderDetail");
  }

  return (
    <AppShell className="professional-orders-shell">
      <header className="professional-simple-header">
        <strong>Pedidos</strong>
      </header>

      <div className="professional-order-tabs" role="tablist" aria-label="Status dos pedidos profissionais">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab.id ? "is-active" : ""}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <section className="professional-orders-list">
        {activeTab === "available" && (
          <button className="professional-order-card" type="button" onClick={openAvailableOrder}>
            <img src={mockedServiceOrder.photos[0].src} alt={mockedServiceOrder.photos[0].alt} />
            <span>
              <small>Novo pedido</small>
              <strong>{mockedServiceOrder.category}</strong>
              <em>{mockedServiceOrder.shortProblem} • {mockedServiceOrder.location.display}</em>
            </span>
            <Icon name="arrowRight" />
          </button>
        )}

        {activeTab === "progress" && (
          <button className="professional-order-card is-progress" type="button" onClick={openProgressOrder}>
            <img src={mockedServiceOrder.photos[1].src} alt={mockedServiceOrder.photos[1].alt} />
            <span>
              <small>Aguardando código</small>
              <strong>{mockedServiceOrder.category}</strong>
              <em>{mockedServiceOrder.shortProblem} • {mockedServiceOrder.location.display}</em>
            </span>
            <Icon name="arrowRight" />
          </button>
        )}

        {activeTab === "finished" && (
          <div className="professional-empty-orders">
            <strong>Nenhum pedido finalizado.</strong>
            <p>Serviços concluídos ficam registrados nesta aba.</p>
          </div>
        )}
      </section>

      <ProfessionalBottomNav active="professionalOrders" setScreen={setScreen} />
    </AppShell>
  );
}

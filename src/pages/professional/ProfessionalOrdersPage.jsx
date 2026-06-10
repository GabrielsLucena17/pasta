import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import repairImage from "../../assets/img/ds-torneira.jpg";

const tabs = [
  { id: "available", label: "Disponíveis", count: 1 },
  { id: "progress", label: "Em andamento", count: 0 },
  { id: "finished", label: "Finalizados", count: 0 },
];

export default function ProfessionalOrdersPage({ setScreen }) {
  const [activeTab, setActiveTab] = useState("available");

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
          <button className="professional-order-card" type="button" onClick={() => setScreen("orderDetail")}>
            <img src={repairImage} alt="Cano quebrado em banheiro" />
            <span>
              <small>Novo pedido</small>
              <strong>Conserto de cano quebrado</strong>
              <em>Jardim Satélite - São José dos Campos</em>
            </span>
            <Icon name="arrowRight" />
          </button>
        )}

        {activeTab === "progress" && (
          <div className="professional-empty-orders">
            <strong>Nenhum pedido em andamento.</strong>
            <p>Quando uma proposta for aceita, o pedido aparecerá aqui.</p>
          </div>
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

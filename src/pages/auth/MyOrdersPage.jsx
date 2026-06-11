import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import { mockedServiceOrder } from "../../data/mockOrder.js";

const tabs = [
  { id: "open", label: "Em Aberto", count: 1 },
  { id: "done", label: "Concluído", count: 1 },
  { id: "canceled", label: "Cancelado", count: 0 },
];

const completedOrder = {
  id: "#12280",
  category: "Eletricista",
  problem: "Troca de tomada da sala",
  date: "Finalizado ontem",
  place: "São José dos Campos, SP",
  image: mockedServiceOrder.photos[2].src,
};

export default function MyOrdersPage({ order, setScreen }) {
  const [activeTab, setActiveTab] = useState("open");
  const currentStatus = order.status || "Aguardando propostas";

  return (
    <AppShell className="step-shell orders-shell">
      <StepHeader className="orders-topbar" title="Meus pedidos" showProgress={false} onBack={() => setScreen("loggedHome")} />

      <section className="orders-step">
        <h1>Meus pedidos</h1>

        <div className="orders-tabs" role="tablist" aria-label="Filtrar pedidos">
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

        {activeTab === "open" && (
          <button className="order-list-card" type="button" onClick={() => setScreen("orderDetail")}>
            <img src={mockedServiceOrder.photos[0].src} alt={mockedServiceOrder.photos[0].alt} />

            <span className="order-list-content">
              <span className="order-list-top">
                <small>{mockedServiceOrder.id}</small>
                <em className={currentStatus === "Aguardando profissional" ? "is-waiting" : ""}>
                  {currentStatus}
                </em>
              </span>

              <strong>{mockedServiceOrder.category}</strong>
              <span className="order-list-meta">{mockedServiceOrder.shortProblem}</span>
              <span className="order-list-place">{mockedServiceOrder.location.short}</span>
            </span>

            <span className="order-list-arrow">
              <Icon name="chevronRight" />
            </span>
          </button>
        )}

        {activeTab === "done" && (
          <button className="order-list-card" type="button" onClick={() => setScreen("myOrders")}>
            <img src={completedOrder.image} alt={completedOrder.problem} />
            <span className="order-list-content">
              <span className="order-list-top">
                <small>{completedOrder.id}</small>
                <em className="is-done">Concluído</em>
              </span>
              <strong>{completedOrder.category}</strong>
              <span className="order-list-meta">{completedOrder.problem}</span>
              <span className="order-list-place">{completedOrder.date} • {completedOrder.place}</span>
            </span>
            <span className="order-list-arrow">
              <Icon name="chevronRight" />
            </span>
          </button>
        )}

        {activeTab === "canceled" && (
          <div className="empty-orders">
            <strong>Nenhum pedido cancelado</strong>
            <p>Pedidos cancelados ficam registrados nesta aba.</p>
          </div>
        )}
      </section>

      <BottomNav active="myOrders" setScreen={setScreen} />
    </AppShell>
  );
}

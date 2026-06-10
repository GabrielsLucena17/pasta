import { useMemo, useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import StepHeader from "../../components/StepHeader.jsx";

const initialNotifications = [
  {
    id: 1,
    type: "Pagamento",
    title: "Pagamento foi aceito",
    text: "O pagamento foi aceito e será creditado após o serviço ser concluído.",
    time: "34 min atrás",
    date: "26/05/2026",
    tone: "green",
    read: false,
  },
  {
    id: 2,
    type: "Proposta Recebida",
    title: "Proposta recebida com sucesso",
    text: "O profissional Júlio Silva enviou uma proposta para o pedido #12345.",
    time: "1 hora atrás",
    date: "26/05/2026",
    tone: "pink",
    read: false,
  },
  {
    id: 3,
    type: "Proposta Recebida",
    title: "Proposta recebida com sucesso",
    text: "O profissional Marcos Santana enviou uma proposta para o pedido #12345.",
    time: "2 horas atrás",
    date: "26/05/2026",
    tone: "pink",
    read: true,
  },
  {
    id: 4,
    type: "Em andamento",
    title: "Seu atendimento está a caminho",
    text: "O profissional já foi acionado e em breve estará no local para iniciar o serviço.",
    time: "1 dia atrás",
    date: "25/05/2026",
    tone: "orange",
    read: true,
  },
];

export default function NotificationsPage({ setScreen }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  );

  function markAsRead(notificationId) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    );
  }

  function markAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({ ...notification, read: true })),
    );
  }

  return (
    <AppShell className="step-shell notifications-shell">
      <StepHeader className="notifications-topbar" title="Notificações" showProgress={false} onBack={() => setScreen("loggedHome")} />

      <section className="notifications-step">
        <h1>Notificações</h1>

        <label className="date-field">
          <span>Data da busca</span>
          <div>
            <input type="text" value="26/05/2026" readOnly />
            <Icon name="calendar" />
          </div>
        </label>

        <div className="notification-toolbar">
          <div>
            <strong>Atualizações</strong>
            <span>
              {unreadCount > 0
                ? `${unreadCount} ${unreadCount === 1 ? "nova notificação" : "novas notificações"}`
                : "Todas visualizadas"}
            </span>
          </div>
          <button type="button" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Visualizar todas
          </button>
        </div>

        <div className="notification-list">
          {notifications.map((item) => (
            <button
              className={`notification-card ${item.tone} ${item.read ? "is-read" : "is-unread"}`}
              key={item.id}
              type="button"
              onClick={() => markAsRead(item.id)}
            >
              <span className="notification-unread-dot" aria-hidden="true" />
              <div className="notification-card-top">
                <span>{item.type}</span>
              </div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              <footer>
                <em>{item.date}</em>
                <small>
                  <Icon name="clock" />
                  {item.time}
                </small>
              </footer>
            </button>
          ))}
        </div>
      </section>

      <BottomNav active="loggedHome" setScreen={setScreen} />
    </AppShell>
  );
}

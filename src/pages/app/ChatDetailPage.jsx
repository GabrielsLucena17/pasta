import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import { mockedChatMessages, mockedServiceOrder } from "../../data/mockOrder.js";

export default function ChatDetailPage({ loginAudience, setScreen }) {
  const isProfessional = loginAudience === "professional";
  const contact = isProfessional ? mockedServiceOrder.client : mockedServiceOrder.professional;

  return (
    <AppShell className="chat-shell">
      <StepHeader className="chat-topbar" title="Chat" showProgress={false} onBack={() => setScreen("messages")} />

      <section className="chat-content">
        <header className="chat-contact">
          <span className="chat-avatar">{contact.initials}</span>
          <div>
            <strong>{contact.name}</strong>
            <small>Pedido {mockedServiceOrder.code} • {mockedServiceOrder.shortProblem}</small>
          </div>
        </header>

        <div className="chat-thread" aria-label={`Conversa com ${contact.name}`}>
          {mockedChatMessages.map((message, index) => {
            const isMine = isProfessional ? message.from === "professional" : message.from === "client";

            return (
              <article className={`chat-message ${isMine ? "is-me" : "is-other"}`} key={`${message.time}-${index}`}>
                <p>{message.text}</p>
                <span>{message.time}</span>
              </article>
            );
          })}
        </div>
      </section>

      <form className="chat-composer">
        <input type="text" placeholder="Digite sua mensagem..." />
        <button type="button" aria-label="Enviar mensagem">
          <Icon name="send" />
        </button>
      </form>

      {isProfessional ? (
        <ProfessionalBottomNav active="messages" setScreen={setScreen} />
      ) : (
        <BottomNav active="messages" setScreen={setScreen} />
      )}
    </AppShell>
  );
}

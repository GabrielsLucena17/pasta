import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import StepHeader from "../../components/StepHeader.jsx";

const messages = [
  {
    from: "me",
    text: "Olá Júlio, tudo bem? Gostaria de confirmar o prazo do serviço.",
    time: "18:18",
  },
  {
    from: "other",
    text: "Tudo bem sim, obrigado! O prazo estimado é de até 2 dias úteis, contados a partir da confirmação do pagamento.",
    time: "18:18",
  },
  {
    from: "me",
    text: "Perfeito. Outra dúvida: o material está incluso no valor?",
    time: "18:21",
  },
  {
    from: "other",
    text: "Nesse serviço, sim. O valor da proposta já inclui mão de obra e material.",
    time: "18:19",
  },
  {
    from: "me",
    text: "Entendi. Obrigado pelas informações. Vou seguir para o pagamento.",
    time: "18:22",
  },
];

export default function ChatDetailPage({ loginAudience, setScreen }) {
  const isProfessional = loginAudience === "professional";

  return (
    <AppShell className="chat-shell">
      <StepHeader className="chat-topbar" title="Chat" showProgress={false} onBack={() => setScreen("messages")} />

      <section className="chat-content">
        <header className="chat-contact">
          <span className="chat-avatar">JS</span>
          <div>
            <strong>Júlio Silva</strong>
            <small>Pedido #15450AD4121S</small>
          </div>
        </header>

        <div className="chat-thread" aria-label="Conversa com Júlio Silva">
          {messages.map((message, index) => (
            <article className={`chat-message ${message.from === "me" ? "is-me" : "is-other"}`} key={`${message.time}-${index}`}>
              <p>{message.text}</p>
              <span>{message.time}</span>
            </article>
          ))}
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

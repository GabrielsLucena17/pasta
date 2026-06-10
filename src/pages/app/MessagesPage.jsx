import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import StepHeader from "../../components/StepHeader.jsx";

const conversations = {
  recent: [
    {
      id: "15450AD4121S",
      initials: "JS",
      name: "Júlio Silva",
      time: "10:15",
      title: "Olá Júlio, tudo bem?",
      preview: "Gostaria de confirmar o prazo do serviço.",
      unread: 1,
    },
  ],
  finished: [
    {
      id: "18340BC9910",
      initials: "MS",
      name: "Marcos Santana",
      time: "Ontem",
      title: "Atendimento finalizado",
      preview: "Obrigado pela confirmação. Serviço concluído.",
      unread: 0,
    },
  ],
};

const tabs = [
  { id: "recent", label: "Recentes" },
  { id: "finished", label: "Finalizadas" },
];

export default function MessagesPage({ loginAudience, setScreen }) {
  const isProfessional = loginAudience === "professional";
  const [activeTab, setActiveTab] = useState("recent");
  const activeConversations = conversations[activeTab];

  return (
    <AppShell className="messages-shell">
      <StepHeader
        className="messages-topbar"
        title="Chat"
        showProgress={false}
        onBack={() => setScreen(isProfessional ? "professionalAccount" : "loggedHome")}
      />

      <div className="message-tabs" role="tablist" aria-label="Filtrar mensagens">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab.id ? "is-active" : ""}
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="messages-list">
        <label className="message-search">
          <input type="search" placeholder="Busque por pedido ou descrição" />
        </label>

        {activeConversations.map((conversation) => (
          <button className="message-preview" type="button" key={conversation.id} onClick={() => setScreen("chatDetail")}>
            <span className="chat-avatar">{conversation.initials}</span>
            <span className="message-preview-body">
              <span className="message-preview-top">
                <strong>{conversation.name}</strong>
                <small>#{conversation.id}</small>
                <em>{conversation.time}</em>
              </span>
              <span>{conversation.title}</span>
              <span>{conversation.preview}</span>
            </span>
            {conversation.unread > 0 && <i>{conversation.unread}</i>}
          </button>
        ))}
      </section>

      {isProfessional ? (
        <ProfessionalBottomNav active="messages" setScreen={setScreen} />
      ) : (
        <BottomNav active="messages" setScreen={setScreen} />
      )}
    </AppShell>
  );
}

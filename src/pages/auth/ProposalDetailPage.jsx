import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import professionalImage from "../../assets/img/ds-eletricista.jpg";

const clientProposal = {
  startDate: "2026-05-17",
  deadline: "2026-05-19",
  price: "R$ 452,00",
  detail:
    "O valor inclui deslocamento, avaliação do ponto elétrico, desmontagem da tomada, correção da fiação danificada e testes finais.",
};

const emptyProfessionalProposal = {
  startDate: "",
  deadline: "",
  price: "",
  detail: "",
};

export default function ProposalDetailPage({
  loginAudience,
  professionalProposal,
  setOrderDetailInitialTab,
  setProfessionalProposal,
  setScreen,
}) {
  const isProfessional = loginAudience === "professional";
  const isEditing = Boolean(isProfessional && professionalProposal);

  const [form, setForm] = useState(
    isProfessional ? professionalProposal || emptyProfessionalProposal : clientProposal,
  );

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSaveProposal() {
    setProfessionalProposal({
      ...form,
      professional: "Ytp Profissional",
      rating: "4.9",
      reviews: "(5)",
      bio: "Profissional especializado em instalações residenciais",
      services: "Instalações, reparos e manutenções",
      image: professionalImage,
    });
    setOrderDetailInitialTab?.("proposals");
    setScreen("orderDetail");
  }

  return (
    <AppShell className={`step-shell proposal-detail-shell ${isProfessional ? "professional-proposal-detail-shell" : ""}`}>
      <StepHeader
        className="proposal-detail-topbar"
        title={isProfessional ? (isEditing ? "Editar proposta" : "Criar proposta") : "Proposta"}
        showProgress={false}
        onBack={() => setScreen("orderDetail")}
      />

      <section className="proposal-detail-step">
        <label className="proposal-read-field">
          <span>Data de Início <strong>*</strong></span>
          <div className="proposal-date-input">
            <input
              type="date"
              value={form.startDate}
              readOnly={!isProfessional}
              onChange={(event) => handleChange("startDate", event.target.value)}
            />
            <Icon name="calendar" />
          </div>
        </label>

        <label className="proposal-read-field">
          <span>Prazo <strong>*</strong></span>
          <div className="proposal-date-input">
            <input
              type="date"
              value={form.deadline}
              readOnly={!isProfessional}
              onChange={(event) => handleChange("deadline", event.target.value)}
            />
            <Icon name="calendar" />
          </div>
        </label>

        <label className="proposal-read-field">
          <span>Valor <strong>*</strong></span>
          <input
            type="text"
            value={form.price}
            readOnly={!isProfessional}
            onChange={(event) => handleChange("price", event.target.value)}
            placeholder="Ex: R$ 452,00"
          />
        </label>

        <label className="proposal-read-field">
          <span>Detalhe</span>
          <textarea
            value={form.detail}
            readOnly={!isProfessional}
            maxLength={300}
            onChange={(event) => handleChange("detail", event.target.value)}
            placeholder="Descreva o que está incluso na proposta"
          />
          <small>{form.detail.length}/300</small>
        </label>

        {isProfessional ? (
          <div className="proposal-actions">
            <button className="accept" type="button" onClick={handleSaveProposal}>
              {isEditing ? "Salvar alterações" : "Criar proposta"}
              <Icon name="chevronRight" />
            </button>
          </div>
        ) : (
          <div className="proposal-actions">
            <button className="accept" type="button" onClick={() => setScreen("payment")}>
              Aceitar Proposta
              <Icon name="chevronRight" />
            </button>

            <button className="chat" type="button" onClick={() => setScreen("chatDetail")}>
              Conversar com profissional
              <Icon name="chevronRight" />
            </button>

            <button className="reject" type="button" onClick={() => setScreen("orderDetail")}>
              Recusar Proposta
              <Icon name="chevronRight" />
            </button>
          </div>
        )}
      </section>

      {isProfessional ? (
        <ProfessionalBottomNav active="professionalOrders" setScreen={setScreen} />
      ) : (
        <BottomNav active="myOrders" setScreen={setScreen} />
      )}
    </AppShell>
  );
}

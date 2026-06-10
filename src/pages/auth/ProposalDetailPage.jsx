import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import { mockedServiceOrder } from "../../data/mockOrder.js";

const clientProposal = {
  startDate: mockedServiceOrder.proposal.startDate,
  deadline: mockedServiceOrder.proposal.deadline,
  price: mockedServiceOrder.proposal.price,
  detail: mockedServiceOrder.proposal.detail,
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
      professional: mockedServiceOrder.professional.name,
      rating: mockedServiceOrder.professional.rating,
      reviews: mockedServiceOrder.professional.reviews,
      bio: mockedServiceOrder.professional.bio,
      services: mockedServiceOrder.professional.services,
      image: mockedServiceOrder.professional.image,
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
          <span>Data de início <strong>*</strong></span>
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
            placeholder="Ex: R$ 380,00"
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

        {!isProfessional && (
          <div className="proposal-actions">
            <button className="accept" type="button" onClick={() => setScreen("payment")}>
              Aceitar proposta
              <Icon name="chevronRight" />
            </button>

            <button className="chat" type="button" onClick={() => setScreen("chatDetail")}>
              Conversar com profissional
              <Icon name="chevronRight" />
            </button>

            <button className="reject" type="button" onClick={() => setScreen("orderDetail")}>
              Recusar proposta
              <Icon name="chevronRight" />
            </button>
          </div>
        )}
      </section>

      {isProfessional ? (
        <>
          <FixedAction className="proposal-fixed-action">
            <button className="primary-action" type="button" onClick={handleSaveProposal}>
              {isEditing ? "Salvar alterações" : "Criar proposta"}
            </button>
          </FixedAction>
          <ProfessionalBottomNav active="professionalOrders" setScreen={setScreen} />
        </>
      ) : (
        <BottomNav active="myOrders" setScreen={setScreen} />
      )}
    </AppShell>
  );
}

import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import Icon from "../../components/Icon.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";

export default function DescriptionStep({ order, setScreen, editingFromSummary, setEditingFromSummary, updateOrder }) {
  const maxLength = 300;
  const [error, setError] = useState("");

  function updateDescription(event) {
    setError("");
    updateOrder({ description: event.target.value.slice(0, maxLength) });
  }

  function continueToAvailability() {
    if (!order.description.trim()) {
      setError("Conte rapidamente o que precisa ser resolvido.");
      return;
    }

    setScreen(editingFromSummary ? "summary" : "availability");
    setEditingFromSummary(false);
  }

  return (
    <AppShell className="step-shell description-shell">
      <StepHeader className="description-topbar" step={3} onBack={() => setScreen("photos")} />

      <section className="description-step">
        <h1>Conte rapidamente o problema</h1>
        <p>Conte em poucas palavras o que está acontecendo para ajudarmos você.</p>

        <div className="description-urgency">
          <span>Esse pedido é urgente?</span>
          <div>
            <button
              className={order.urgent === true ? "is-selected" : ""}
              type="button"
              onClick={() => updateOrder({ urgent: true })}
            >
              <Icon name="bell" />
              Sim
            </button>
            <button
              className={order.urgent === false ? "is-selected" : ""}
              type="button"
              onClick={() => updateOrder({ urgent: false })}
            >
              <Icon name="clock" />
              Não
            </button>
          </div>
        </div>

        <label className="description-field">
          <textarea
            maxLength={maxLength}
            placeholder="Ex: Meu chuveiro queimou, preciso que troque a resistência."
            value={order.description}
            onChange={updateDescription}
          />
          <span>{order.description.length}/{maxLength}</span>
        </label>
        {error && <p className="field-error">{error}</p>}
      </section>

      <FixedAction>
        <PrimaryAction onClick={continueToAvailability}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

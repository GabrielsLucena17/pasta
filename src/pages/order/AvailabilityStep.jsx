import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import Icon from "../../components/Icon.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";

const periods = [
  { id: "morning", label: "Manhã", time: "8h00 às 12h00", icon: "sun" },
  { id: "afternoon", label: "Tarde", time: "12h00 às 18h00", icon: "cloud" },
  { id: "night", label: "Noite", time: "18h00 às 22h00", icon: "moon" },
];

export default function AvailabilityStep({ order, setScreen, editingFromSummary, setEditingFromSummary, updateOrder }) {
  const [error, setError] = useState("");

  function togglePeriod(periodId) {
    setError("");
    const isSelected = order.periods.includes(periodId);

    if (!isSelected && order.periods.length >= 3) {
      return;
    }

    updateOrder({
      periods: isSelected
        ? order.periods.filter((item) => item !== periodId)
        : [...order.periods, periodId],
    });
  }

  function continueToAddress() {
    if (!order.periods.length) {
      setError("Selecione pelo menos um período para receber o profissional.");
      return;
    }

    setScreen(editingFromSummary ? "summary" : "address");
    setEditingFromSummary(false);
  }

  return (
    <AppShell className="step-shell availability-shell">
      <StepHeader className="availability-topbar" step={4} onBack={() => setScreen("description")} />

      <section className="availability-step">
        <h1>Quando você pode receber o profissional?</h1>
        <p>Você pode selecionar mais de um período</p>

        <div className="selected-count">Selecionadas: <span>{order.periods.length}</span> de 3</div>

        <div className="period-list" aria-label="Períodos disponíveis">
          {periods.map((period) => {
            const selected = order.periods.includes(period.id);

            return (
              <button
                className={`period-item ${selected ? "is-selected" : ""}`.trim()}
                type="button"
                key={period.id}
                onClick={() => togglePeriod(period.id)}
              >
                <span className="period-icon">
                  <Icon name={period.icon} />
                </span>
                <span>
                  <strong>{period.label}</strong>
                  <small>{period.time}</small>
                </span>
                <i aria-hidden="true">{selected && <Icon name="check" />}</i>
              </button>
            );
          })}
        </div>
        {error && <p className="field-error">{error}</p>}
      </section>

      <FixedAction>
        <PrimaryAction onClick={continueToAddress}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

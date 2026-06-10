import AppShell from "../components/AppShell.jsx";
import Icon from "../components/Icon.jsx";
import StepHeader from "../components/StepHeader.jsx";

export default function UrgencyPage({ setScreen, editingFromSummary, setEditingFromSummary, updateOrder }) {
  function chooseUrgency(urgent) {
    updateOrder({ urgent });
    setScreen(editingFromSummary ? "summary" : "photos");
    setEditingFromSummary(false);
  }

  return (
    <AppShell className="step-shell">
      <StepHeader className="urgency-topbar" showProgress={false} onBack={() => setScreen("categories")} />

      <section className="question-step">
        <h1>O serviço precisa de urgência?</h1>
        <p>Isso nos ajuda a entender sua necessidade e te conectar com os profissionais certos</p>

        <div className="choice-list">
          <button className="choice-item" type="button" onClick={() => chooseUrgency(true)}>
            <span className="choice-icon choice-icon-green">
              <Icon name="check" />
            </span>
            <strong>Sim, é urgente</strong>
            <Icon className="choice-arrow" name="chevronRight" />
          </button>

          <button className="choice-item" type="button" onClick={() => chooseUrgency(false)}>
            <span className="choice-icon choice-icon-red">
              <Icon name="cancel" />
            </span>
            <strong>Não é urgente</strong>
            <Icon className="choice-arrow" name="chevronRight" />
          </button>
        </div>
      </section>
    </AppShell>
  );
}

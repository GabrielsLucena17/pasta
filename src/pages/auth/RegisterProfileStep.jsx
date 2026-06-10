import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import FormField from "../../components/FormField.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";

function formatBirthDate(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export default function RegisterProfileStep({ auth, loginAudience, setScreen, updateAuth }) {
  const [error, setError] = useState("");
  const totalSteps = loginAudience === "professional" ? 4 : 3;

  function continueToAccess() {
    if (!auth.fullName.trim() || auth.birthDate.replace(/\D/g, "").length !== 8) {
      setError("Preencha nome completo e data de nascimento para continuar.");
      return;
    }

    setError("");
    setScreen("registerAccess");
  }

  return (
    <AppShell className="step-shell auth-shell">
      <StepHeader className="auth-topbar" step={2} totalSteps={totalSteps} onBack={() => setScreen("registerContact")} />

      <section className="auth-step compact-auth-step">
        <h1>Nova Conta</h1>
        <p>Agora informe seu nome completo e data de nascimento.</p>

        {error && <div className="field-error auth-form-error">{error}</div>}

        <FormField label="Nome Completo">
          <input
            type="text"
            placeholder="Nome completo"
            value={auth.fullName}
            onChange={(event) => {
              setError("");
              updateAuth({ fullName: event.target.value });
            }}
          />
        </FormField>

        <FormField label="Data de Nascimento">
          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            placeholder="DD/MM/AAAA"
            value={auth.birthDate}
            onChange={(event) => {
              setError("");
              updateAuth({ birthDate: formatBirthDate(event.target.value) });
            }}
          />
        </FormField>
      </section>

      <FixedAction className="compact-fixed-action">
        <PrimaryAction onClick={continueToAccess}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

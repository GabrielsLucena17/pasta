import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import FormField from "../../components/FormField.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";

function formatCpf(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export default function RegisterContactStep({ auth, setScreen, updateAuth }) {
  const [error, setError] = useState("");

  function continueToProfile() {
    if ((auth.cpf || "").replace(/\D/g, "").length !== 11) {
      setError("Informe um CPF válido para continuar o cadastro.");
      return;
    }

    setError("");
    setScreen("registerProfile");
  }

  return (
    <AppShell className="step-shell auth-shell">
      <StepHeader className="auth-topbar" step={1} onBack={() => setScreen("login")} />

      <section className="auth-step compact-auth-step">
        <h1>Nova Conta</h1>
        <p>Primeiro digite seu CPF</p>

        {error && <div className="field-error auth-form-error">{error}</div>}

        <FormField label="CPF">
          <input
            type="text"
            inputMode="numeric"
            placeholder="000.000.000-00"
            value={auth.cpf}
            onChange={(event) => {
              setError("");
              updateAuth({ cpf: formatCpf(event.target.value) });
            }}
          />
        </FormField>
      </section>

      <FixedAction className="compact-fixed-action">
        <PrimaryAction onClick={continueToProfile}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

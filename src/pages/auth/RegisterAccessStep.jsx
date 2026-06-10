import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import FormField from "../../components/FormField.jsx";
import Icon from "../../components/Icon.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";

const passwordRules = [
  { label: "Ao menos 8 caracteres", test: (value) => value.length >= 8 },
  { label: "Uma letra maiúscula", test: (value) => /[A-Z]/.test(value) },
  { label: "Uma letra minúscula", test: (value) => /[a-z]/.test(value) },
  { label: "Um número", test: (value) => /\d/.test(value) },
  { label: "Um caracter especial (!@#$%*=)", test: (value) => /[!@#$%*=]/.test(value) },
];

export default function RegisterAccessStep({ auth, loginAudience, setScreen, updateAuth }) {
  const [error, setError] = useState("");
  const passwordValid = passwordRules.every((rule) => rule.test(auth.password));

  function finishRegister() {
    if (!auth.email.trim() || !passwordValid) {
      setError("Informe um email válido e uma senha que atenda aos requisitos.");
      return;
    }

    setError("");
    setScreen(loginAudience === "professional" ? "professionalAccount" : "loggedHome");
  }

  return (
    <AppShell className="step-shell auth-shell auth-access-shell">
      <StepHeader className="auth-topbar" step={3} onBack={() => setScreen("registerProfile")} />

      <section className="auth-step">
        <h1>Nova Conta</h1>
        <p>Informe seus dados de acesso</p>

        {error && <div className="field-error auth-form-error">{error}</div>}

        <FormField label="Email">
          <input
            type="email"
            placeholder="exemplo@exemplo.com"
            value={auth.email}
            onChange={(event) => {
              setError("");
              updateAuth({ email: event.target.value });
            }}
          />
        </FormField>

        <FormField label="Senha">
          <input
            type="password"
            placeholder="Digite uma senha forte"
            value={auth.password}
            onChange={(event) => {
              setError("");
              updateAuth({ password: event.target.value });
            }}
          />
        </FormField>

        <ul className="password-rules">
          {passwordRules.map((rule) => (
            <li key={rule.label} className={rule.test(auth.password) ? "is-valid" : ""}>
              <Icon name="check" />
              {rule.label}
            </li>
          ))}
        </ul>
      </section>

      <FixedAction>
        <PrimaryAction onClick={finishRegister}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

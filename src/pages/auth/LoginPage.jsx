import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import PasswordInput from "../../components/PasswordInput.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";

export default function LoginPage({ auth, loginAudience, order, setScreen, updateAuth }) {
  const [error, setError] = useState("");
  const isProfessional = loginAudience === "professional";
  const showCheckoutMessage = !isProfessional && Boolean(order?.category);

  function continueToOrders() {
    if (!auth.email.trim() || !auth.password.trim()) {
      setError("Informe e-mail e senha para acessar sua conta.");
      return;
    }

    setError("");
    setScreen(isProfessional ? "professionalAccount" : "loggedHome");
  }

  return (
    <AppShell className="login-page-shell">
      <StepHeader
        className="login-page-topbar"
        showProgress={false}
        onBack={() => setScreen("home")}
      />

      <section className="login-page-step">
        <h1>{showCheckoutMessage ? "Estamos quase lá!" : "Insira seus dados"}</h1>
        <p>
          {showCheckoutMessage
            ? "Para concluir seu pedido é necessário fazer login ou criar uma conta na Bonifácil."
            : "Entre com seu e-mail e senha."}
        </p>

        {error && <div className="field-error auth-form-error">{error}</div>}

        <label className="login-field">
          <span>E-mail</span>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={auth.email}
            onChange={(event) => {
              setError("");
              updateAuth({ email: event.target.value });
            }}
          />
        </label>

        <label className="login-field">
          <span>Senha</span>
          <PasswordInput
            value={auth.password}
            onChange={(event) => {
              setError("");
              updateAuth({ password: event.target.value });
            }}
          />
        </label>

        <p className="login-register-hint">
          {isProfessional ? "Ainda não é profissional cadastrado?" : "Ainda não é cliente?"}{" "}
          <button type="button" onClick={() => setScreen("registerContact")}>
            Cadastrar-se
          </button>
        </p>

        <button className="login-forgot" type="button">
          Esqueci minha senha! Clique aqui
        </button>

        <PrimaryAction onClick={continueToOrders}>Entrar</PrimaryAction>
      </section>
    </AppShell>
  );
}

import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import StepHeader from "../../components/StepHeader.jsx";

export default function LoginPage({ auth, loginAudience, setScreen, updateAuth }) {
  const [error, setError] = useState("");
  const isProfessional = loginAudience === "professional";

  function continueToOrders() {
    if (!auth.email.trim() || !auth.password.trim()) {
      setError("Informe email e senha para acessar sua conta.");
      return;
    }

    setError("");
    setScreen(isProfessional ? "professionalAccount" : "loggedHome");
  }

  return (
    <AppShell className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-[390px] px-6 pt-[30px] pb-6">
        <StepHeader
          className="mb-[84px] !px-0 !mx-0 [&_button]:h-[54px] [&_button]:w-[54px] [&_button]:rounded-[14px] [&_button]:border [&_button]:border-[#E7F7DF] [&_button]:bg-white [&_button]:text-[#43C414] [&_button]:shadow-none"
          showProgress={false}
          onBack={() => setScreen("home")}
        />

        <section className="w-full">
          <h1 className="mb-2 text-[28px] font-bold leading-tight text-[#0B0B0B]">
            Acessar
          </h1>

          <p className="mb-8 text-[16px] text-[#8A7474]">
            Entre com seu e-mail e senha.
          </p>

          {error && (
            <div className="field-error auth-form-error">
              {error}
            </div>
          )}

          <div className="mb-[26px]">
            <label className="mb-[10px] block text-[16px] font-semibold text-[#151827]">
              E-mail
            </label>

            <input
              type="email"
              placeholder="Digite seu E-mail"
              value={auth.email}
              onChange={(event) => {
                setError("");
                updateAuth({ email: event.target.value });
              }}
              className="h-12 w-full rounded-xl border border-[#DFE3EA] bg-white px-3 text-[16px] text-[#111827] outline-none placeholder:text-[#A5ADBB] focus:border-[#43C414] focus:ring-4 focus:ring-[#43C414]/10"
            />
          </div>

          <div className="mb-[26px]">
            <label className="mb-[10px] block text-[16px] font-semibold text-[#151827]">
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={auth.password}
              onChange={(event) => {
                setError("");
                updateAuth({ password: event.target.value });
              }}
              className="h-12 w-full rounded-xl border border-[#DFE3EA] bg-white px-3 text-[16px] text-[#111827] outline-none placeholder:text-[#A5ADBB] focus:border-[#43C414] focus:ring-4 focus:ring-[#43C414]/10"
            />
          </div>

          <p className="mt-[30px] mb-6 text-[16px] text-[#8A7474]">
            {isProfessional
              ? "Ainda não é profissional cadastrado?"
              : "Ainda não é cliente?"}{" "}
            <button
              className="font-bold text-[#7D6C6C]"
              type="button"
              onClick={() => setScreen("registerContact")}
            >
              Cadastrar-se
            </button>
          </p>

          <button
            className="mb-8 block text-left text-[16px] font-bold text-[#7D6C6C]"
            type="button"
          >
            Esqueci minha senha! Clique aqui
          </button>

          <button
            onClick={continueToOrders}
            className="h-12 w-full rounded-[10px] bg-[#43C414] text-[16px] font-bold text-white active:scale-[0.99]"
          >
            Acessar
          </button>
        </section>
      </div>
    </AppShell>
  );
}

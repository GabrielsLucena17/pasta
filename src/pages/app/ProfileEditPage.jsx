import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import FormField from "../../components/FormField.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";

export default function ProfileEditPage({ auth, loginAudience, setScreen, updateAuth }) {
  const isProfessional = loginAudience === "professional";
  const [values, setValues] = useState({
    fullName: auth.fullName || (isProfessional ? "Ytn Profissional" : "Youtan Cliente"),
    email: auth.email || (isProfessional ? "profissional@youtan.com.br" : "cliente@youtan.com.br"),
    phone: auth.phone || "",
    city: auth.city || "Sao Jose dos Campos - SP",
  });
  const [error, setError] = useState("");

  function updateField(field, value) {
    setError("");
    setValues((current) => ({ ...current, [field]: value }));
  }

  function saveProfile() {
    if (!values.fullName.trim() || !values.email.trim()) {
      setError("Preencha nome e e-mail para salvar as informações do perfil.");
      return;
    }

    updateAuth(values);
    setScreen(isProfessional ? "professionalAccount" : "account");
  }

  return (
    <AppShell className="step-shell profile-edit-shell">
      <StepHeader
        className="profile-edit-topbar"
        title="Editar perfil"
        showProgress={false}
        onBack={() => setScreen(isProfessional ? "professionalAccount" : "account")}
      />

      <section className="profile-edit-step">
        <h1>Editar informações do perfil</h1>
        <p>Atualize os dados principais da sua conta.</p>

        {error && <p className="field-error auth-form-error">{error}</p>}

        <FormField label="Nome completo">
          <input value={values.fullName} placeholder="Digite seu nome completo" onChange={(event) => updateField("fullName", event.target.value)} />
        </FormField>

        <FormField label="E-mail">
          <input type="email" value={values.email} placeholder="Digite seu e-mail" onChange={(event) => updateField("email", event.target.value)} />
        </FormField>

        <FormField label="Telefone">
          <input inputMode="tel" value={values.phone} placeholder="Digite seu telefone" onChange={(event) => updateField("phone", event.target.value)} />
        </FormField>
      </section>

      <FixedAction>
        <PrimaryAction onClick={saveProfile}>Salvar alterações</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

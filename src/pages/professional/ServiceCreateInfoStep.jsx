import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import FormField from "../../components/FormField.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";

export default function ServiceCreateInfoStep({ setScreen }) {
  const [title, setTitle] = useState("Assentamento de piso");
  const [address, setAddress] = useState("Vila Tesouro - São José dos...");

  return (
    <AppShell className="service-create-shell">
      <StepHeader className="service-create-topbar" step={2} totalSteps={4} onBack={() => setScreen("serviceCreatePhotos")} />

      <section className="service-create-step">
        <h1>Criar novo Serviço</h1>
        <p>Insira o título do serviço e localização do serviço</p>

        <FormField label="Titulo">
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </FormField>

        <FormField label="Endereço">
          <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
        </FormField>
      </section>

      <FixedAction>
        <PrimaryAction onClick={() => setScreen("professionalServices")}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

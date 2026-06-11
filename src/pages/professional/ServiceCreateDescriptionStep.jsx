import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import serviceCover from "../../assets/img/service-home.jpg";

const defaultDescription =
  "Assentamento de piso em area residencial, incluindo preparacao da superficie, nivelamento, aplicacao de argamassa, paginacao das pecas, instalacao do revestimento e acabamento com rejunte, garantindo alinhamento, resistencia e bom acabamento final.";

export default function ServiceCreateDescriptionStep({ setScreen, setProfessionalServices }) {
  const [description, setDescription] = useState(defaultDescription);

  function finishServiceCreation() {
    setProfessionalServices?.([
      {
        id: "service-floor-01",
        title: "Assentamento de piso",
        photos: 3,
        cover: serviceCover,
        location: "Vila Tesouro - Sao Jose dos Campos, SP",
        description,
      },
    ]);
    setScreen("professionalServices");
  }

  return (
    <AppShell className="service-create-shell service-description-shell">
      <StepHeader className="service-create-topbar" step={4} totalSteps={4} onBack={() => setScreen("serviceCreateCover")} />

      <section className="service-create-step service-description-step">
        <h1>Criar novo Serviço</h1>
        <p>Fale sobre o serviço</p>

        <label className="service-description-field">
          <textarea
            maxLength={300}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descreva o resultado, materiais usados e detalhes do serviço"
          />
          <span>{description.length}/300</span>
        </label>
      </section>

      <FixedAction>
        <PrimaryAction onClick={finishServiceCreation}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

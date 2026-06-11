import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import serviceOne from "../../assets/img/service-home.jpg";
import serviceTwo from "../../assets/img/ds-torneira.jpg";
import serviceThree from "../../assets/img/ds-higienizacao-sofa.jpg";

const coverOptions = [
  { id: "floor", src: serviceOne, alt: "Assentamento de piso finalizado" },
  { id: "hydraulic", src: serviceTwo, alt: "Reparo hidraulico realizado" },
  { id: "cleaning", src: serviceThree, alt: "Servico residencial realizado" },
];

export default function ServiceCreateCoverStep({ setScreen }) {
  const [selectedCover, setSelectedCover] = useState(coverOptions[0].id);
  const activeCover = coverOptions.find((photo) => photo.id === selectedCover) || coverOptions[0];

  return (
    <AppShell className="service-create-shell service-cover-shell">
      <StepHeader className="service-create-topbar" step={3} totalSteps={4} onBack={() => setScreen("serviceCreateInfo")} />

      <section className="service-create-step service-cover-step">
        <h1>Criar novo Serviço</h1>
        <p>Selecione a foto principal para capa do serviço</p>

        <figure className="service-cover-preview">
          <img src={activeCover.src} alt={activeCover.alt} />
        </figure>

        <div className="service-cover-thumbs" role="list" aria-label="Fotos do serviço">
          {coverOptions.map((photo) => (
            <button
              className={photo.id === selectedCover ? "is-selected" : ""}
              type="button"
              key={photo.id}
              onClick={() => setSelectedCover(photo.id)}
            >
              <img src={photo.src} alt={photo.alt} />
            </button>
          ))}
        </div>
      </section>

      <FixedAction>
        <PrimaryAction onClick={() => setScreen("serviceCreateDescription")}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

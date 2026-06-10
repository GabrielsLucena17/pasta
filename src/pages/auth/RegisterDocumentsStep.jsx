import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import Icon from "../../components/Icon.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import documentBack from "../../../DesignSystem/img/uploadDocs/back.png";
import documentFront from "../../../DesignSystem/img/uploadDocs/front.png";
import selfieImage from "../../../DesignSystem/img/uploadDocs/selfie.png";

const docSteps = [
  {
    title: "Frente do documento",
    image: documentFront,
    alt: "Ilustracao da frente do documento",
  },
  {
    title: "Tras do documento",
    image: documentBack,
    alt: "Ilustracao do verso do documento",
  },
  {
    title: "Selfie / Foto do rosto",
    image: selfieImage,
    alt: "Ilustracao de selfie para validacao",
  },
];

const tips = [
  "Use uma boa iluminacao",
  "Enquadre o documento inteiro",
  "Evite reflexos e sombras",
  "Mantenha a foto nitida",
];

export default function RegisterDocumentsStep({ setScreen }) {
  const [currentDocStep, setCurrentDocStep] = useState(0);
  const current = docSteps[currentDocStep];

  function continueDocumentFlow() {
    if (currentDocStep < docSteps.length - 1) {
      setCurrentDocStep((step) => step + 1);
      return;
    }

    setScreen("professionalAccount");
  }

  function goBack() {
    if (currentDocStep > 0) {
      setCurrentDocStep((step) => step - 1);
      return;
    }

    setScreen("registerAccess");
  }

  return (
    <AppShell className="step-shell document-verify-shell">
      <StepHeader className="document-verify-topbar" step={4} totalSteps={4} onBack={goBack} />

      <section className="document-verify-step">
        <h1>Precisamos da confirmação de seu documento</h1>
        <p>Siga as orientações para validação da sua conta</p>

        <div className="document-preview">
          <strong>{current.title}</strong>
          <img src={current.image} alt={current.alt} />
        </div>

        <ul className="document-tips">
          {tips.map((tip) => (
            <li key={tip}>
              <Icon name="sun" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <FixedAction>
        <PrimaryAction onClick={continueDocumentFlow}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

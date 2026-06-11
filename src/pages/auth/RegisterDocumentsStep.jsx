import { useRef, useState } from "react";
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
    id: "front",
    title: "Frente do documento",
    image: documentFront,
    alt: "Ilustração da frente do documento",
  },
  {
    id: "back",
    title: "Verso do documento",
    image: documentBack,
    alt: "Ilustração do verso do documento",
  },
  {
    id: "selfie",
    title: "Selfie / Foto do rosto",
    image: selfieImage,
    alt: "Ilustração de selfie para validação",
  },
];

const tips = [
  "Use uma boa iluminação",
  "Enquadre o documento inteiro",
  "Evite reflexos e sombras",
  "Mantenha a foto nítida",
];

export default function RegisterDocumentsStep({ setScreen }) {
  const inputRef = useRef(null);
  const [currentDocStep, setCurrentDocStep] = useState(0);
  const [uploads, setUploads] = useState({});
  const [error, setError] = useState("");
  const current = docSteps[currentDocStep];
  const currentUpload = uploads[current.id];

  function handleUpload(event) {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    if (currentUpload?.url) {
      URL.revokeObjectURL(currentUpload.url);
    }

    setUploads((items) => ({
      ...items,
      [current.id]: {
        name: file.name,
        url: URL.createObjectURL(file),
      },
    }));
    setError("");

    event.target.value = "";
  }

  function continueDocumentFlow() {
    if (!currentUpload) {
      setError(`Envie a foto solicitada: ${current.title.toLowerCase()}.`);
      return;
    }

    if (currentDocStep < docSteps.length - 1) {
      setCurrentDocStep((step) => step + 1);
      setError("");
      return;
    }

    setScreen("professionalOrders");
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

        {error && <p className="field-error document-error">{error}</p>}

        <div className="document-preview">

          {current.title && <h2>{current.title}</h2>}

          <img src={current.image} alt={current.alt} />

          {currentUpload && (
            <figure className="document-upload-preview">
              <img src={currentUpload.url} alt={`Upload de ${current.title}`} />
              <figcaption>{currentUpload.name}</figcaption>
            </figure>
          )}

          <button className="document-upload-button" type="button" onClick={() => inputRef.current?.click()}>
            <Icon name="camera" />
            {currentUpload ? "Trocar foto" : "Adicionar foto"}
          </button>

          <input ref={inputRef} className="document-upload-input" type="file" accept="image/*" onChange={handleUpload} />
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

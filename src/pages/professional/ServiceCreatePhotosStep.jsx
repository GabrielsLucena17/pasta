import { useRef, useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import Icon from "../../components/Icon.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import projectOne from "../../assets/img/service-home.jpg";
import projectTwo from "../../assets/img/ds-torneira.jpg";
import projectThree from "../../assets/img/ds-higienizacao-sofa.jpg";

const initialPhotos = [
  { id: "service-1", url: projectOne, alt: "Serviço de assentamento de piso" },
  { id: "service-2", url: projectTwo, alt: "Serviço hidráulico realizado" },
  { id: "service-3", url: projectThree, alt: "Serviço de higienização realizado" },
];

export default function ServiceCreatePhotosStep({ setScreen }) {
  const [photos, setPhotos] = useState(initialPhotos);
  const inputRef = useRef(null);

  function addPhotos(event) {
    const slots = 6 - photos.length;
    const files = Array.from(event.target.files || [])
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, slots);

    setPhotos((current) => [
      ...current,
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        url: URL.createObjectURL(file),
        alt: file.name,
      })),
    ]);
    event.target.value = "";
  }

  return (
    <AppShell className="service-create-shell">
      <StepHeader className="service-create-topbar" step={1} totalSteps={4} onBack={() => setScreen("professionalServices")} />

      <section className="service-create-step">
        <h1>Criar novo Serviço</h1>
        <p>Adicione fotos que mostrem o resultado do seu trabalho. Serviços com imagens reais passam mais confiança para novos clientes.</p>

        <div className="service-photo-grid">
          <button className="service-add-photo" type="button" onClick={() => inputRef.current?.click()}>
            <Icon name="camera" />
            adicionar<br />fotos
          </button>
          <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={addPhotos} />

          {photos.map((photo) => (
            <figure key={photo.id}>
              <img src={photo.url} alt={photo.alt} />
              <button type="button" aria-label="Remover foto" onClick={() => setPhotos((current) => current.filter((item) => item.id !== photo.id))}>
                <Icon name="close" />
              </button>
            </figure>
          ))}
        </div>
      </section>

      <FixedAction>
        <PrimaryAction onClick={() => setScreen("serviceCreateInfo")}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

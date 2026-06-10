import { useEffect, useRef } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import Icon from "../../components/Icon.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";

const maxPhotos = 3;

export default function PhotosStep({ order, setScreen, editingFromSummary, setEditingFromSummary, updateOrder }) {
  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      order.photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, []);

  function addPhotos(event) {
    const availableSlots = maxPhotos - order.photos.length;
    const files = Array.from(event.target.files || [])
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, availableSlots);

    const nextPhotos = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      url: URL.createObjectURL(file),
    }));

    updateOrder({ photos: [...order.photos, ...nextPhotos] });
    event.target.value = "";
  }

  function removePhoto(photoId) {
    const photo = order.photos.find((item) => item.id === photoId);

    if (photo) {
      URL.revokeObjectURL(photo.url);
    }

    updateOrder({ photos: order.photos.filter((item) => item.id !== photoId) });
  }

  return (
    <AppShell className="step-shell photo-shell">
      <StepHeader className="photo-topbar" step={2} onBack={() => setScreen("categories")} />

      <section className="photo-step">
        <h1>Mostre o problema com fotos.</h1>
        <p>Fotos ajudam os profissionais a entenderem melhor o que precisa ser feito.</p>

        <div className="photo-grid" aria-label="Fotos do problema">
          {order.photos.length < maxPhotos && (
            <button className="add-photo" type="button" onClick={() => inputRef.current?.click()}>
              <Icon name="add" />
              Adicionar<br />fotos
            </button>
          )}

          <input ref={inputRef} className="photo-input" type="file" accept="image/*" multiple onChange={addPhotos} />

          {order.photos.map((photo, index) => (
            <figure className="photo-thumb" key={photo.id}>
              <img src={photo.url} alt={`Foto adicionada ${index + 1}`} />
              <button type="button" aria-label="Remover foto" onClick={() => removePhoto(photo.id)}>
                <Icon name="cancel" />
              </button>
            </figure>
          ))}
        </div>
      </section>

      <FixedAction>
        <PrimaryAction onClick={() => {
          setScreen(editingFromSummary ? "summary" : "description");
          setEditingFromSummary(false);
        }}>
          Continuar
        </PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

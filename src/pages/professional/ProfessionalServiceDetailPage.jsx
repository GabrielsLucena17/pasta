import { useMemo, useRef, useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import serviceImage from "../../assets/img/service-home.jpg";
import serviceImageTwo from "../../assets/img/ds-higienizacao-sofa.jpg";
import serviceImageThree from "../../assets/img/ds-torneira.jpg";
import StepHeader from "../../components/StepHeader.jsx";

const gallery = [
  { src: serviceImage, alt: "Assentamento de piso em area residencial" },
  { src: serviceImageTwo, alt: "Acabamento de servico residencial" },
  { src: serviceImageThree, alt: "Detalhe de servico realizado" },
];

export default function ProfessionalServiceDetailPage({ loginAudience, setScreen }) {
  const isProfessional = loginAudience === "professional";
  const [activePhoto, setActivePhoto] = useState(0);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  const mapUrl = useMemo(() => {
    const region = "Vila Tesouro, Sao Jose dos Campos - SP, Brasil";
    return `https://www.google.com/maps?q=${encodeURIComponent(region)}&output=embed`;
  }, []);

  function handleScroll(event) {
    const width = event.currentTarget.clientWidth || 1;
    setActivePhoto(Math.round(event.currentTarget.scrollLeft / width));
  }

  function handleDragStart(event) {
    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleDragMove(event) {
    if (!dragState.current.isDragging) {
      return;
    }

    const distance = event.clientX - dragState.current.startX;
    event.currentTarget.scrollLeft = dragState.current.scrollLeft - distance;
  }

  function handleDragEnd(event) {
    dragState.current.isDragging = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }

  return (
    <AppShell className="professional-service-detail-shell">
      <div className="professional-service-fixed-header">
        <StepHeader
          className="professional-service-detail-topbar"
          title="Servico"
          showProgress={false}
          onBack={() => setScreen("professionalProfile")}
        />
      </div>

      <section className="professional-service-detail">
        <div
          className="service-detail-carousel"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
          onScroll={handleScroll}
        >
          {gallery.map((photo) => (
            <img src={photo.src} alt={photo.alt} key={photo.alt} />
          ))}
        </div>

        <div className="service-detail-dots" aria-hidden="true">
          {gallery.map((photo, index) => (
            <i className={index === activePhoto ? "is-active" : ""} key={photo.alt} />
          ))}
        </div>

        <article className="service-detail-panel">
          <header className="service-detail-head">
            <h1>Assentamento de piso</h1>
            <span className="service-created-meta">
              <Icon name="clock" />
              Publicado hoje as 14:16
            </span>
            <div className="service-summary-tags">
              <span><Icon name="pin" />Sao Jose dos Campos, SP</span>
              <span><Icon name="wrench" />Servico realizado</span>
            </div>
            <span className="service-created-meta">
              <Icon name="pin" />
              Vila Tesouro
            </span>
          </header>

          <section className="service-description-box">
            <h2>Descricao do servico</h2>
            <p>
              Assentamento de piso em area residencial, incluindo preparacao da superficie,
              nivelamento, aplicacao de argamassa, paginacao das pecas, instalacao do revestimento
              e acabamento com rejunte, garantindo alinhamento, resistencia e bom acabamento final.
            </p>
          </section>

          <section className="service-map-section">
            <header>
              <span>Mapa da regiao</span>
              <strong>Vila Tesouro - Sao Jose dos Campos, SP</strong>
            </header>
            <iframe
              className="service-detail-map"
              src={mapUrl}
              title="Mapa da regiao do servico"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>
        </article>
      </section>

      {isProfessional ? (
        <ProfessionalBottomNav active="professionalAccount" setScreen={setScreen} />
      ) : (
        <BottomNav active="myOrders" setScreen={setScreen} />
      )}
    </AppShell>
  );
}

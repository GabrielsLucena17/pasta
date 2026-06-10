import { useMemo, useRef, useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import BrandLogo from "../../components/BrandLogo.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import { mockedServiceOrder } from "../../data/mockOrder.js";

const gallery = mockedServiceOrder.photos;

const clientProposal = {
  professional: mockedServiceOrder.professional.name,
  rating: mockedServiceOrder.professional.rating,
  reviews: mockedServiceOrder.professional.reviews,
  bio: mockedServiceOrder.professional.bio,
  services: mockedServiceOrder.professional.services,
  price: mockedServiceOrder.proposal.price,
  deadline: mockedServiceOrder.proposal.deadlineLabel,
  startDate: mockedServiceOrder.proposal.startDate,
  image: mockedServiceOrder.professional.image,
};

function isStartCodeStatus(status) {
  const key = status.toLowerCase();
  return key.includes("codigo") || key.includes("código");
}

export default function OrderDetailPage({
  loginAudience,
  order,
  orderDetailInitialTab = "details",
  professionalProposal,
  setOrderDetailInitialTab,
  setScreen,
  updateOrder,
}) {
  const isProfessional = loginAudience === "professional";
  const currentStatus = order?.status || "Aguardando propostas";
  const currentStatusKey = currentStatus.toLowerCase();
  const needsStartCode = isProfessional && isStartCodeStatus(currentStatus);
  const serviceStarted = isProfessional && (
    currentStatusKey.includes("iniciado") ||
    currentStatusKey.includes("andamento")
  );
  const acceptedService = isProfessional && (needsStartCode || serviceStarted || currentStatusKey.includes("finalizado"));
  const [activeTab, setActiveTab] = useState(acceptedService ? "details" : isProfessional ? orderDetailInitialTab : "details");
  const [activePhoto, setActivePhoto] = useState(0);
  const [startCode, setStartCode] = useState("");
  const [startCodeError, setStartCodeError] = useState("");
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });
  const codeInputRefs = useRef([]);
  const visibleProposal = isProfessional ? professionalProposal : clientProposal;
  const proposalCount = visibleProposal ? 1 : 0;

  const mapaUrl = useMemo(() => {
    const { neighborhood, city, state } = mockedServiceOrder.location;
    const regiao = `${neighborhood}, ${city} - ${state}, Brasil`;
    return `https://www.google.com/maps?q=${encodeURIComponent(regiao)}&output=embed`;
  }, []);

  function formatDateTime(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  function changeTab(nextTab) {
    setActiveTab(nextTab);
    setOrderDetailInitialTab?.(nextTab);
  }

  function openProposalEditor() {
    setOrderDetailInitialTab?.("proposals");
    setScreen("proposalDetail");
  }

  function handleGalleryScroll(event) {
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
    if (!dragState.current.isDragging) return;
    const distance = event.clientX - dragState.current.startX;
    event.currentTarget.scrollLeft = dragState.current.scrollLeft - distance;
  }

  function handleDragEnd(event) {
    dragState.current.isDragging = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }

  function updateStartCodeDigit(index, value) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = startCode.padEnd(5, " ").split("");
    nextCode[index] = digit || " ";

    setStartCodeError("");
    setStartCode(nextCode.join("").trimEnd());

    if (digit && index < 4) {
      codeInputRefs.current[index + 1]?.focus();
    }
  }

  function handleStartCodeKeyDown(index, event) {
    if (event.key === "Backspace" && !startCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  }

  function confirmStartCode() {
    if (startCode.trim().length !== 5) {
      setStartCodeError("Digite o código de 5 dígitos informado pelo cliente.");
      return;
    }

    setStartCodeError("");
    updateOrder?.({ status: "Serviço iniciado" });
  }

  function finishService() {
    updateOrder?.({ status: "Serviço finalizado" });
  }

  return (
    <AppShell className={`step-shell order-detail-shell ${isProfessional ? "professional-order-detail-shell" : ""}`}>
      <div className="order-detail-fixed-header">
        <StepHeader
          className="order-detail-topbar"
          title={isProfessional ? "Pedido #12345" : "Meus pedidos"}
          showProgress={false}
          onBack={() => setScreen(isProfessional ? "professionalOrders" : "myOrders")}
        />

        <div className={`order-detail-tabs ${acceptedService ? "single-tab" : ""}`} role="tablist" aria-label="Detalhes do pedido">
          <button className={activeTab === "details" ? "is-active" : ""} type="button" onClick={() => changeTab("details")}>
            Detalhes
          </button>
          {!acceptedService && (
            <button className={activeTab === "proposals" ? "is-active" : ""} type="button" onClick={() => changeTab("proposals")}>
              {isProfessional ? `Minhas Propostas (${proposalCount})` : `Propostas (${proposalCount})`}
            </button>
          )}
        </div>
      </div>

      {activeTab === "details" && (
        <section className="client-order-detail">
          {needsStartCode && (
            <section className="professional-start-code professional-start-code-top">
              <div className="verification-illustration" aria-hidden="true">
                <span className="verification-card">
                  <Icon name="message" />
                </span>
                <span className="verification-person">
                  <Icon name="user" />
                </span>
                <i />
              </div>

              <header>
                <h2>Informe o código</h2>
                <p>Peça ao cliente o código de 5 dígitos para iniciar o serviço.</p>
              </header>

              <span className="start-code-label">Código de início</span>

              <div className="start-code-boxes" aria-label="Código de início do serviço">
                {Array.from({ length: 5 }).map((_, index) => (
                  <input
                    aria-label={`Dígito ${index + 1} do código`}
                    inputMode="numeric"
                    key={index}
                    maxLength={1}
                    autoFocus={index === 0}
                    ref={(element) => {
                      codeInputRefs.current[index] = element;
                    }}
                    value={startCode[index]?.trim() || ""}
                    onChange={(event) => updateStartCodeDigit(index, event.target.value)}
                    onKeyDown={(event) => handleStartCodeKeyDown(index, event)}
                  />
                ))}
              </div>

              {startCodeError && <p className="field-error">{startCodeError}</p>}

              <button type="button" onClick={confirmStartCode}>
                Iniciar serviço
              </button>
            </section>
          )}

          {serviceStarted && (
            <section className="professional-service-started">
              <figure>
                <BrandLogo className="service-started-logo" />
              </figure>
              <div>
                <strong>Serviço iniciado</strong>
                <p>O serviço já está em andamento. Finalize somente após concluir o reparo da pia com o cliente.</p>
              </div>
              <button type="button" onClick={finishService}>
                Finalizar serviço
              </button>
            </section>
          )}

          <div className="client-order-media">
            <div
              className="client-order-carousel"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
              onScroll={handleGalleryScroll}
            >
              {gallery.map((photo) => (
                <img src={photo.src} alt={photo.alt} key={photo.alt} />
              ))}
            </div>
            <div className="client-carousel-dots" aria-hidden="true">
              {gallery.map((photo, index) => (
                <i className={index === activePhoto ? "is-active" : ""} key={photo.alt} />
              ))}
            </div>
          </div>

          <article className="client-order-card">
            <div className="client-order-head compact">
              <h1>{mockedServiceOrder.category}</h1>
              <span className="client-created-meta">
                <Icon name="clock" />
                {mockedServiceOrder.createdAt}
              </span>
              <div className="client-summary-tags">
                <span><Icon name="pin" />{mockedServiceOrder.location.short}</span>
                {(order?.urgent ?? mockedServiceOrder.urgent) && <span className="is-urgent"><Icon name="bell" />Urgente</span>}
              </div>
            </div>

            <div className="client-status-row">
              <span className="status-pill">
                <Icon name="hourglass" />
                <span>
                  <strong>{currentStatus}</strong>
                  <small>{acceptedService ? "A proposta foi aceita. Confirme o código com o cliente para iniciar." : "Profissionais da região podem enviar propostas."}</small>
                </span>
              </span>
            </div>

            <section className="client-description-box">
              <h2>Breve descrição do problema:</h2>
              <p>{mockedServiceOrder.description}</p>
              <button type="button">Ler mais</button>
            </section>

            {!isProfessional && (
              <section className="client-success-note">
                <Icon name="info" />
                <div>
                  <strong>Seu pedido foi publicado com sucesso!</strong>
                  <p>Agora os profissionais da região poderão enviar propostas. Você receberá uma notificação quando houver novidades.</p>
                </div>
              </section>
            )}

            <section className="client-map-section">
              <header>
                <span>Região aproximada do serviço</span>
                <strong>{mockedServiceOrder.location.display}</strong>
              </header>
              <iframe
                className="client-order-map"
                src={mapaUrl}
                title="Mapa da região aproximada do pedido"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>

            {!isProfessional && (
              <section className="client-tracking">
                <h2>Acompanhe seu pedido</h2>
                <div className="tracking-line" aria-label="Andamento do pedido">
                  <div className="done">
                    <i><Icon name="check" /></i>
                    <strong>1. Pedido criado</strong>
                    <span>Concluído</span>
                  </div>
                  <div className="active">
                    <i><Icon name="hourglass" /></i>
                    <strong>2. Recebendo propostas</strong>
                    <span>Em andamento</span>
                  </div>
                  <div>
                    <i />
                    <strong>3. Escolha um profissional</strong>
                    <span>Pendente</span>
                  </div>
                  <div>
                    <i />
                    <strong>4. Serviço concluído</strong>
                    <span>Pendente</span>
                  </div>
                </div>
              </section>
            )}
          </article>

          {!isProfessional && (
            <aside className="client-tip">
              <Icon name="info" />
              <p>
                Dica: Você pode <button type="button">editar</button> ou{" "}
                <button type="button">cancelar</button> seu pedido a qualquer momento.
              </p>
            </aside>
          )}
        </section>
      )}

      {!acceptedService && activeTab === "proposals" && (
        <section className="order-detail-content proposal-content">
          {!visibleProposal ? (
            <div>
              <strong>Você ainda não enviou proposta para este pedido.</strong>
              <p>Crie uma proposta com valor, prazo e detalhes do serviço.</p>
            </div>
          ) : (
            <article className="proposal-card">
              <button className="proposal-professional" type="button" onClick={() => setScreen("professionalProfile")}>
                <img src={visibleProposal.image || clientProposal.image} alt={`Foto de ${visibleProposal.professional || clientProposal.professional}`} />

                <div className="proposal-profile">
                  <div className="proposal-name-row">
                    <h1>{visibleProposal.professional || clientProposal.professional}</h1>
                    <span className="proposal-rating">
                      <strong>{visibleProposal.rating || clientProposal.rating}</strong>
                      <small>{visibleProposal.reviews || clientProposal.reviews}</small>
                    </span>
                  </div>
                  <p>{visibleProposal.bio || clientProposal.bio}</p>
                  <p>{visibleProposal.services || clientProposal.services}</p>
                </div>
              </button>

              <dl className="proposal-values">
                <div>
                  <dt>Valor da proposta</dt>
                  <dd>{visibleProposal.price}</dd>
                </div>
                <div>
                  <dt>Prazo estimado</dt>
                  <dd>{formatDateTime(visibleProposal.deadline)}</dd>
                </div>
                <div>
                  <dt>Data de início</dt>
                  <dd>{formatDateTime(visibleProposal.startDate)}</dd>
                </div>
              </dl>

              <button className="proposal-detail-link" type="button" onClick={isProfessional ? openProposalEditor : () => setScreen("proposalDetail")}>
                {isProfessional ? "Editar proposta" : "Ver detalhes"}
                <Icon name="chevronRight" />
              </button>
            </article>
          )}
        </section>
      )}

      {isProfessional ? (
        <>
          {!acceptedService && (
            <button className="create-proposal-floating" type="button" onClick={openProposalEditor}>
              <Icon name="edit" />
              {professionalProposal ? "Editar proposta" : "Criar nova proposta"}
            </button>
          )}
          <ProfessionalBottomNav active="professionalOrders" setScreen={setScreen} />
        </>
      ) : (
        <BottomNav active="myOrders" setScreen={setScreen} />
      )}
    </AppShell>
  );
}

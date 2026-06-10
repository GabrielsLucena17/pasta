import { useMemo, useRef, useState } from "react";
import repairImage from "../../assets/img/ds-marido-aluguel.jpg";
import repairImageTwo from "../../assets/img/ds-torneira.jpg";
import repairImageThree from "../../assets/img/order-repair.jpg";
import professionalImage from "../../assets/img/ds-eletricista.jpg";
import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import ProfessionalBottomNav from "../../components/ProfessionalBottomNav.jsx";
import StepHeader from "../../components/StepHeader.jsx";

const bairro = "Vila Tesouro";
const cidade = "São José dos Campos";
const estado = "SP";

const gallery = [
  { src: repairImageThree, alt: "Área com problema para reparo" },
  { src: repairImageTwo, alt: "Torneira com vazamento" },
  { src: repairImage, alt: "Reparo residencial" },
];

const clientProposal = {
  professional: "Ytp Profissional",
  rating: "4.9",
  reviews: "(5)",
  bio: "Profissional especializado em instalações residenciais",
  services: "Instalações, reparos e manutenções",
  price: "R$ 452,00",
  deadline: "Em até 2 dias",
  startDate: "17/05/2026",
  image: professionalImage,
};

export default function OrderDetailPage({
  loginAudience,
  order,
  orderDetailInitialTab = "details",
  professionalProposal,
  setOrderDetailInitialTab,
  setScreen,
}) {
  const isProfessional = loginAudience === "professional";
  const [activeTab, setActiveTab] = useState(isProfessional ? orderDetailInitialTab : "details");
  const [activePhoto, setActivePhoto] = useState(0);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });
  const currentStatus = order?.status || "Aguardando propostas";
  const visibleProposal = isProfessional ? professionalProposal : clientProposal;
  const proposalCount = visibleProposal ? 1 : 0;

  function formatDateTime(value) {
    if (!value) {
      return "";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  const mapaUrl = useMemo(() => {
    const regiao = `${bairro}, ${cidade} - ${estado}, Brasil`;
    return `https://www.google.com/maps?q=${encodeURIComponent(regiao)}&output=embed`;
  }, []);

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
    <AppShell className={`step-shell order-detail-shell ${isProfessional ? "professional-order-detail-shell" : ""}`}>
      <div className="order-detail-fixed-header">
        <StepHeader
          className="order-detail-topbar"
          title={isProfessional ? "Pedido #12345" : "Meus pedidos"}
          showProgress={false}
          onBack={() => setScreen(isProfessional ? "professionalOrders" : "myOrders")}
        />

        <div className="order-detail-tabs" role="tablist" aria-label="Detalhes do pedido">
          <button className={activeTab === "details" ? "is-active" : ""} type="button" onClick={() => changeTab("details")}>
            Detalhes
          </button>
          <button className={activeTab === "proposals" ? "is-active" : ""} type="button" onClick={() => changeTab("proposals")}>
            {isProfessional ? `Minhas Propostas (${proposalCount})` : `Propostas (${proposalCount})`}
          </button>
        </div>
      </div>

      {activeTab === "details" && (
        <section className="client-order-detail">
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
              <h1>Marido de Aluguel</h1>
              <span className="client-created-meta">
                <Icon name="clock" />
                Publicado há 15 min
              </span>
              <div className="client-summary-tags">
                <span><Icon name="pin" />São José dos Campos, SP</span>
                <span className="is-urgent"><Icon name="bell" />Urgente</span>
              </div>
            </div>

            <div className="client-status-row">
              <span className="status-pill">
                <Icon name="hourglass" />
                <span>
                  <strong>{currentStatus}</strong>
                  <small>Profissionais da região podem enviar propostas.</small>
                </span>
              </span>
            </div>

            <section className="client-description-box">
              <h2>Breve descrição do problema:</h2>
              <p>
                A tomada da sala parou de funcionar. Ao verificar, notei que a fiação interna pode estar solta.
                Preciso que um profissional verifique e faça o reparo. Possíveis peças de reposição.
              </p>
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
                <strong>Vila Tesouro - São José dos Campos, SP</strong>
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

      {activeTab === "proposals" && (
        <section className="order-detail-content proposal-content">
          {!visibleProposal ? (
            <div>
              <strong>Você ainda não enviou proposta para este pedido.</strong>
              <p>Crie uma proposta com valor, prazo e detalhes do atendimento.</p>
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
                  <dt>Data de Início</dt>
                  <dd>{formatDateTime(visibleProposal.startDate)}</dd>
                </div>
              </dl>

              <button className="proposal-detail-link" type="button" onClick={isProfessional ? openProposalEditor : () => setScreen("proposalDetail")}>
                {isProfessional ? "Editar proposta" : "Ver Detalhes"}
                <Icon name="chevronRight" />
              </button>
            </article>
          )}
        </section>
      )}

      {isProfessional ? (
        <>
          <button className="create-proposal-floating" type="button" onClick={openProposalEditor}>
            <Icon name="edit" />
            {professionalProposal ? "Editar proposta" : "Criar nova proposta"}
          </button>
          <ProfessionalBottomNav active="professionalOrders" setScreen={setScreen} />
        </>
      ) : (
        <BottomNav active="myOrders" setScreen={setScreen} />
      )}
    </AppShell>
  );
}

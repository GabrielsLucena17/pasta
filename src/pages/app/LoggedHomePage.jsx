import { useState } from "react";
import blogImage from "../../assets/img/ds-blog-home-care.jpg";
import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import { serviceImages, services } from "../../data/services.js";

const homeServices = [
  { name: "Marido de Aluguel", image: serviceImages.handyman },
  services[0],
  services[1],
  services[4],
  { name: "Desentupidor", image: serviceImages.desentupidor },
];

const houseServices = [
  services[4],
  services[1],
  { name: "Marido de Aluguel", image: serviceImages.handyman },
  { name: "Desentupidor", image: serviceImages.desentupidor },
];

const savedAddresses = [
  "Av. Martins Guimarães, 123",
  "Rua das Palmeiras, 45",
  "Vila Tesouro - São José dos Campos",
];

function ServiceScroller({ title, items, setScreen }) {
  return (
    <section className="logged-section">
      <h2>{title}</h2>
      <div className="logged-service-row">
        {items.map((item) => (
          <button className="logged-service-card" type="button" key={`${title}-${item.name}`} onClick={() => setScreen("categories")}>
            <img src={item.image} alt={item.name} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function LoggedHomePage({ auth, order, setScreen }) {
  const firstName = auth.fullName?.trim().split(" ")[0] || "Fulano";
  const initialAddress = order.address?.street || savedAddresses[0];
  const [selectedAddress, setSelectedAddress] = useState(initialAddress);
  const [addressOpen, setAddressOpen] = useState(false);

  return (
    <AppShell className="logged-shell">
      <header className="logged-header">
        <div className="logged-address-wrap">
          <button className="address-select" type="button" onClick={() => setAddressOpen((open) => !open)}>
            <span>{selectedAddress}</span>
            <Icon name="arrowDown" />
          </button>

          {addressOpen && (
            <div className="address-select-menu">
              {savedAddresses.map((address) => (
                <button
                  type="button"
                  key={address}
                  onClick={() => {
                    setSelectedAddress(address);
                    setAddressOpen(false);
                  }}
                >
                  {address}
                </button>
              ))}
              <button type="button" onClick={() => setScreen("addresses")}>
                Gerenciar endereços
              </button>
            </div>
          )}
        </div>

        <button className="notification-button" type="button" aria-label="Abrir notificações" onClick={() => setScreen("notifications")}>
          <Icon name="bell" />
          <i />
        </button>
      </header>

      <section className="logged-hero">
        <h1>Olá <span>{firstName}</span>,</h1>
        <p>Você precisa consertar algo hoje? Busque aqui um profissional e faça seu pedido</p>
        <button type="button" onClick={() => setScreen("categories")}>Buscar</button>
      </section>

      <ServiceScroller title="Serviços Populares" items={homeServices} setScreen={setScreen} />
      <ServiceScroller title="Melhoria da Casa" items={houseServices} setScreen={setScreen} />

      <section className="logged-section blog-section">
        <h2>Confira nosso Blog</h2>
        <article className="blog-card">
          <img src={blogImage} alt="Cuidados e manutenção da casa" />
        </article>
      </section>

      <BottomNav active="loggedHome" setScreen={setScreen} />
    </AppShell>
  );
}

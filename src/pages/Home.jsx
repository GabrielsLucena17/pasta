import { useState } from "react";
import AppShell from "../components/AppShell.jsx";
import Icon from "../components/Icon.jsx";
import bonifacilLogo from "../assets/img/bonifacil_logo.png";
import heroImage from "../assets/img/ds-higienizacao-sofa.jpg";
import { popularServices } from "../data/services.js";

const menuItems = [
  { label: "Home", action: "home" },
  { label: "Junta-se a nós", action: "home" },
  { label: "Área do Profissional", action: "professionalLogin" },
  { label: "Área do Cliente", action: "clientLogin" },
  { label: "Blog", action: "home" },
  { label: "Contato", action: "home" },
];

export default function Home({ setScreen, setLoginAudience }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuAction(action) {
    setMenuOpen(false);

    if (action === "professionalLogin") {
      setLoginAudience("professional");
      setScreen("login");
      return;
    }

    if (action === "clientLogin") {
      setLoginAudience("client");
      setScreen("login");
      return;
    }

    setScreen(action);
  }

  return (
    <AppShell className="home-shell">
      <header className="topbar">
        <button className="brand" type="button" aria-label="Página inicial Bonifácil">
          <img className="brand-logo" src={bonifacilLogo} alt="Bonifácil" />
        </button>

        <button className="menu-button" type="button" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </header>

      <section
        className="hero"
        aria-label="Busca de profissionais"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(26, 29, 24, 0.6), rgba(35, 34, 27, 0.43)), url(${heroImage})`,
        }}
      >
        <div className="hero-content">
          <h1>Encontre gratuitamente os melhores profissionais para sua necessidade</h1>
          <p>Busque aqui o seu profissional e faça seu pedido</p>

          <div className="search-form">
            <button type="button" onClick={() => setScreen("categories")}>Buscar</button>
          </div>
        </div>
      </section>

      <section className="popular">
        <div className="section-heading">
          <h2>Serviços Populares</h2>
        </div>

        <div className="service-row" aria-label="Lista de serviços populares">
          {popularServices.map((service) => (
            <article className="service-card" key={service.id}>
              <img src={service.image} alt={service.alt} />
              <h3>{service.name}</h3>
            </article>
          ))}

          <button className="next-service" type="button" aria-label="Ver mais serviços" onClick={() => setScreen("categories")}>
            <Icon name="chevronRight" />
          </button>
        </div>
      </section>

      {menuOpen && (
        <div className="home-menu-overlay" role="presentation" onClick={() => setMenuOpen(false)}>
          <aside className="home-menu-drawer" aria-label="Menu principal" onClick={(event) => event.stopPropagation()}>
            <header>
              <img src={bonifacilLogo} alt="Bonifácil" />
              <button type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
                <Icon name="close" />
              </button>
            </header>

            <nav>
              {menuItems.map((item) => (
                <button type="button" key={item.label} onClick={() => handleMenuAction(item.action)}>
                  {item.label}
                </button>
              ))}
            </nav>

            <footer>
              <a href="mailto:contato@bonifacil.com.br">contato@bonifacil.com.br</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                bonifacil.app
                <Icon name="instagram" />
              </a>
            </footer>
          </aside>
        </div>
      )}
    </AppShell>
  );
}

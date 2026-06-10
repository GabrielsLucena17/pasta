import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import avatarImage from "../../assets/img/ds-client-profile.jpg";
import coverImage from "../../assets/img/ds-account-cover.jpg";

const primaryItems = [
  { label: "Editar informações do perfil", icon: "user", target: "profileEdit" },
  { label: "Histórico de transações", icon: "sync", target: "account" },
  { label: "Meus endereços", icon: "pin", target: "addresses" },
];

const legalItems = [
  { label: "Termos & Condições", icon: "page" },
  { label: "Políticas de privacidade", icon: "page" },
];

export default function AccountPage({ auth, order, setScreen }) {
  const name = auth.fullName?.trim() || "Youtan Cliente";
  const email = auth.email?.trim() || "cliente@youtan.com.br";
  const city = order.address ? `${order.address.city} - ${order.address.state}` : "São José dos Campos - SP";

  return (
    <AppShell className="account-shell">
      <section className="account-cover" style={{ backgroundImage: `url(${coverImage})` }}>
        <img src={avatarImage} alt={name} />
      </section>

      <section className="account-profile">
        <strong>{name}</strong>
        <span>{email}</span>
        <small>{city}</small>
      </section>

      <section className="account-menu" aria-label="Minha conta">
        <h2>Perfil</h2>
        {primaryItems.map((item) => (
          <button className="account-menu-item" type="button" key={item.label} onClick={() => setScreen(item.target)}>
            <span><Icon name={item.icon} />{item.label}</span>
            <Icon name="chevronRight" />
          </button>
        ))}
      </section>

      <section className="account-menu account-legal" aria-label="Legal">
        <h2>Legal</h2>
        {legalItems.map((item) => (
          <button className="account-menu-item" type="button" key={item.label}>
            <span><Icon name={item.icon} />{item.label}</span>
            <Icon name="chevronRight" />
          </button>
        ))}

        <button className="account-logout" type="button" onClick={() => setScreen("home")}>
          <Icon name="logout" />
          Desconectar
        </button>
      </section>

      <BottomNav active="account" setScreen={setScreen} />
    </AppShell>
  );
}

import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";

export default function AddressesPage({ order, setScreen }) {
  const hasAddress = Boolean(order.address);
  const savedAddress = hasAddress
    ? {
      title: order.address.street,
      details: `${order.number || "s/n"} - ${order.address.neighborhood}`,
      city: `${order.address.city} - ${order.address.state}`,
    }
    : {
      title: "Av. Martins Guimaraes",
      details: "123 - Vila Tesouro",
      city: "Sao Jose dos Campos - SP",
    };

  return (
    <AppShell className="addresses-shell">
      <StepHeader className="addresses-topbar" title="Meus endereços" showProgress={false} onBack={() => setScreen("account")} />

      <section className="addresses-step">
        <h1>Endereços cadastrados</h1>
        <p>Gerencie os locais usados para solicitar serviços.</p>

        <button className="address-list-card" type="button" onClick={() => setScreen("addressCreate")}>
          <Icon name="pin" />
          <span>
            <strong>{savedAddress.title}</strong>
            <small>{savedAddress.details}</small>
            <small>{savedAddress.city}</small>
          </span>
          <Icon name="chevronRight" />
        </button>

        <PrimaryAction onClick={() => setScreen("addressCreate")}>Cadastrar novo endereço</PrimaryAction>
      </section>

      <BottomNav active="account" setScreen={setScreen} />
    </AppShell>
  );
}

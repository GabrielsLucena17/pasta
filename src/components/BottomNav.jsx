import Icon from "./Icon.jsx";

const navItems = [
  { id: "loggedHome", label: "Home", icon: "home" },
  { id: "myOrders", label: "Pedidos", icon: "page" },
  { id: "messages", label: "Mensagens", icon: "message" },
  { id: "account", label: "Minha conta", icon: "user" },
];

export default function BottomNav({ active = "loggedHome", setScreen }) {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {navItems.map((item) => (
        <button
          className={item.id === active ? "is-active" : ""}
          type="button"
          key={item.id}
          onClick={() => setScreen(item.id)}
        >
          <Icon name={item.icon} />
          {item.label}
        </button>
      ))}
    </nav>
  );
}

import Icon from "./Icon.jsx";

const navItems = [
  { id: "professionalOrders", label: "Pedidos", icon: "page" },
  { id: "messages", label: "Mensagens", icon: "message" },
  { id: "professionalAccount", label: "Minha conta", icon: "user" },
];

export default function ProfessionalBottomNav({ active = "professionalAccount", setScreen }) {
  return (
    <nav className="bottom-nav professional-bottom-nav" aria-label="Navegação do profissional">
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

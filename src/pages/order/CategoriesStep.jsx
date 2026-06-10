import AppShell from "../../components/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import { services } from "../../data/services.js";

export default function CategoriesStep({ setScreen, editingFromSummary, setEditingFromSummary, updateOrder }) {
  function chooseCategory(category) {
    updateOrder({ category });
    setScreen(editingFromSummary ? "summary" : "photos");
    setEditingFromSummary(false);
  }

  return (
    <AppShell className="step-shell">
      <StepHeader step={1} onBack={() => setScreen("home")} />

      <section className="service-picker">
        <h1>Qual serviço você precisa?</h1>
        <p>Selecione a categoria que melhor representa o que você precisa resolver.</p>

        <label className="category-search">
          <Icon name="search" />
          <input type="search" placeholder="Buscar categoria ou serviços" />
        </label>

        <h2>Todos os serviços:</h2>

        <div className="category-list">
          {services.map((service) => (
            <button className="category-item" type="button" key={service.id} onClick={() => chooseCategory(service.name)}>
              <img src={service.image} alt={service.alt} />
              <span>{service.name}</span>
              <Icon className="category-arrow" name="chevronRight" />
            </button>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

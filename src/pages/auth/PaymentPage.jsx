import AppShell from "../../components/AppShell.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import Icon from "../../components/Icon.jsx";
import StepHeader from "../../components/StepHeader.jsx";

export default function PaymentPage({ setScreen, updateOrder }) {
  function confirmPayment() {
    updateOrder({ status: "Aguardando profissional" });
    setScreen("myOrders");
  }

  return (
    <AppShell className="step-shell payment-shell">
      <StepHeader className="payment-topbar" title="Pré-Pagamento" showProgress={false} onBack={() => setScreen("proposalDetail")} />

      <section className="payment-step">
        <h1>Dados do cartão</h1>

        <section className="card-payment">
          <label>
            <span>Nome no cartão</span>
            <input type="text" placeholder="Nome impresso no cartão" />
          </label>

          <label>
            <span>Número do cartão</span>
            <input type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" />
          </label>

          <div className="card-payment-row">
            <label>
              <span>Validade</span>
              <input type="text" placeholder="MM/AA" />
            </label>
            <label>
              <span>CVV</span>
              <input type="text" inputMode="numeric" placeholder="123" />
            </label>
          </div>

          <label className="terms-check">
            <input type="checkbox" />
            <span>Li e concordo com os <a href="#termos">Termos de uso</a> da Bonifácil</span>
          </label>

          <button className="payment-submit" type="button" onClick={confirmPayment}>
            <Icon name="lock" />
            Pagar R$ 452,00
          </button>
        </section>
      </section>

      <BottomNav active="myOrders" setScreen={setScreen} />
    </AppShell>
  );
}

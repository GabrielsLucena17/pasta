import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import FormField from "../../components/FormField.jsx";
import Icon from "../../components/Icon.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import { fetchAddressByCep, formatCep } from "../../utils/cep.js";

export default function AddressCreatePage({ order, setScreen, updateOrder }) {
  const [cep, setCep] = useState(order.address?.cep || "");
  const [address, setAddress] = useState(order.address);
  const [number, setNumber] = useState(order.number || "");
  const [complement, setComplement] = useState(order.complement || "");
  const [error, setError] = useState("");

  async function handleCepChange(event) {
    const formattedCep = formatCep(event.target.value);
    const digits = formattedCep.replace(/\D/g, "");

    setCep(formattedCep);
    setAddress(null);
    setError("");

    if (digits.length !== 8) {
      return;
    }

    try {
      const result = await fetchAddressByCep(digits);
      setAddress({
        cep: formattedCep,
        street: result.logradouro || "Endereco nao informado",
        neighborhood: result.bairro || "Bairro nao informado",
        city: result.localidade,
        state: result.uf,
      });
    } catch {
      setError("Não encontramos esse CEP. Confira os números digitados.");
    }
  }

  function saveAddress() {
    if (!address) {
      setError("Digite um CEP válido para cadastrar o endereço.");
      return;
    }

    if (!number.trim()) {
      setError("Informe o número do endereço.");
      return;
    }

    updateOrder({ address, number, complement });
    setScreen("addresses");
  }

  return (
    <AppShell className="step-shell address-create-shell">
      <StepHeader className="address-create-topbar" title="Novo endereço" showProgress={false} onBack={() => setScreen("addresses")} />

      <section className="address-create-step">
        <h1>Cadastrar endereço</h1>
        <p>Informe o CEP e complete os dados do local.</p>

        {error && <p className="field-error auth-form-error">{error}</p>}

        <FormField label="CEP">
          <input inputMode="numeric" maxLength={9} value={cep} placeholder="Digite seu CEP" onChange={handleCepChange} />
        </FormField>

        {address && (
          <div className="address-found">
            <span className="pin-icon"><Icon name="pin" /></span>
            <div>
              <strong>Endereço encontrado:</strong>
              <p>{address.street}</p>
              <p>{address.neighborhood}</p>
              <p>{address.city} - {address.state}</p>
            </div>
          </div>
        )}

        <FormField label="Número">
          <input value={number} placeholder="Digite o número" onChange={(event) => setNumber(event.target.value)} />
        </FormField>

        <FormField label="Complemento">
          <input value={complement} placeholder="Ex: Bloco 2 apartamento 20" onChange={(event) => setComplement(event.target.value)} />
        </FormField>
      </section>

      <FixedAction>
        <PrimaryAction onClick={saveAddress}>Salvar endereço</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

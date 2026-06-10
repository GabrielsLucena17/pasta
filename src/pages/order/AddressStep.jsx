import { useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import FixedAction from "../../components/FixedAction.jsx";
import FormField from "../../components/FormField.jsx";
import Icon from "../../components/Icon.jsx";
import PrimaryAction from "../../components/PrimaryAction.jsx";
import StepHeader from "../../components/StepHeader.jsx";
import { fetchAddressByCep, formatCep } from "../../utils/cep.js";

export default function AddressStep({ order, setScreen, editingFromSummary, setEditingFromSummary, updateOrder }) {
  const [cep, setCep] = useState(order.address?.cep || "");
  const [address, setAddress] = useState(order.address);
  const [isSearching, setIsSearching] = useState(false);
  const [cepError, setCepError] = useState("");
  const [numberError, setNumberError] = useState("");

  async function handleCepChange(event) {
    const formattedCep = formatCep(event.target.value);
    const cepDigits = formattedCep.replace(/\D/g, "");

    setCepError("");
    setNumberError("");
    setCep(formattedCep);
    setAddress(null);
    updateOrder({ address: null, number: "", complement: "" });

    if (cepDigits.length !== 8) {
      return;
    }

    setIsSearching(true);

    try {
      const result = await fetchAddressByCep(cepDigits);
      const nextAddress = {
        cep: formattedCep,
        street: result.logradouro || "Endereço não informado",
        neighborhood: result.bairro || "Bairro não informado",
        city: result.localidade,
        state: result.uf,
      };

      setAddress(nextAddress);
      updateOrder({ address: nextAddress });
    } catch {
      setAddress(null);
      updateOrder({ address: null });
      setCepError("Não encontramos esse CEP. Confira os números digitados.");
    } finally {
      setIsSearching(false);
    }
  }

  function continueToSummary() {
    if (!address) {
      setCepError("Digite um CEP válido para encontrarmos o endereço.");
      return;
    }

    if (!order.number.trim()) {
      setNumberError("Informe o número do local do serviço.");
      return;
    }

    setScreen("summary");
    setEditingFromSummary(false);
  }

  return (
    <AppShell className="step-shell address-shell">
      <StepHeader className="address-topbar" step={5} onBack={() => setScreen("availability")} />

      <section className="address-step">
        <h1>Onde o serviço será realizado?</h1>
        <p>Informe o local para encontrarmos profissionais disponíveis na sua região.</p>

        <FormField label="Digite seu Cep">
          <input type="text" inputMode="numeric" maxLength={9} placeholder="Digite seu Cep" value={cep} onChange={handleCepChange} />
        </FormField>
        {cepError && <p className="field-error">{cepError}</p>}

        {address && (
          <div className="address-found">
            <span className="pin-icon">
              <Icon name="pin" />
            </span>
            <div>
              <strong>Endereço encontrado:</strong>
              <p>{address.street}</p>
              <p>{address.neighborhood}</p>
              <p>{address.city} - {address.state}</p>
            </div>
          </div>
        )}

        {address && (
          <div className="address-extra">
            <FormField label="Número">
              <input
                type="text"
                placeholder="Digite o número"
                value={order.number}
                onChange={(event) => {
                  setNumberError("");
                  updateOrder({ number: event.target.value });
                }}
              />
            </FormField>
            {numberError && <p className="field-error">{numberError}</p>}

            <FormField label="Complemento">
              <input
                type="text"
                placeholder="Ex: Bloco 2 apartamento 20"
                value={order.complement}
                onChange={(event) => updateOrder({ complement: event.target.value })}
              />
            </FormField>
          </div>
        )}

        {isSearching && <p className="address-status">Buscando CEP...</p>}
      </section>

      <FixedAction hidden={!address} className="address-action">
        <PrimaryAction onClick={continueToSummary}>Continuar</PrimaryAction>
      </FixedAction>
    </AppShell>
  );
}

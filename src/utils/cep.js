export function formatCep(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length > 5) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }

  return digits;
}

export async function fetchAddressByCep(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  if (!response.ok) {
    throw new Error("CEP não encontrado");
  }

  const address = await response.json();

  if (address.erro) {
    throw new Error("CEP não encontrado");
  }

  return address;
}

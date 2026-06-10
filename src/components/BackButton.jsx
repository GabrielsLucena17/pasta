import Icon from "./Icon.jsx";

export default function BackButton({ onClick, label = "Voltar" }) {
  return (
    <button className="back-button" type="button" aria-label={label} onClick={onClick}>
      <Icon name="arrowLeft" />
    </button>
  );
}

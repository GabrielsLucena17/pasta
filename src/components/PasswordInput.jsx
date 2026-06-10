import { useState } from "react";
import Icon from "./Icon.jsx";

export default function PasswordInput({ value, onChange, placeholder = "Digite sua senha", onFocus }) {
  const [visible, setVisible] = useState(false);

  return (
    <span className="password-input">
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      <button
        type="button"
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        onClick={() => setVisible((current) => !current)}
      >
        <Icon name={visible ? "visibilityOff" : "visibility"} />
      </button>
    </span>
  );
}

export default function PrimaryAction({ children = "Continuar", onClick, type = "button", className = "" }) {
  return (
    <button className={`primary-action ${className}`.trim()} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default function FixedAction({ children, hidden = false, className = "" }) {
  return (
    <footer className={`fixed-action ${className}`.trim()} hidden={hidden}>
      {children}
    </footer>
  );
}

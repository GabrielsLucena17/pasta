import BackButton from "./BackButton.jsx";
import ProgressDots from "./ProgressDots.jsx";

export default function StepHeader({ onBack, step, title, className = "", showProgress = true, totalSteps = 5 }) {
  return (
    <header className={`step-topbar ${className}`.trim()}>
      <BackButton onClick={onBack} />
      {title && <strong className="step-title">{title}</strong>}
      {showProgress && <ProgressDots currentStep={step} totalSteps={totalSteps} />}
    </header>
  );
}

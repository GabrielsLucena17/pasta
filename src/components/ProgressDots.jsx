export default function ProgressDots({ currentStep, totalSteps = 5 }) {
  return (
    <div className="progress-area" aria-label={`Passo ${currentStep} de ${totalSteps}`}>
      <strong>Passo {currentStep} de {totalSteps}</strong>
      <div className="progress-dots" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span key={index} className={index < currentStep ? "active" : ""} />
        ))}
      </div>
    </div>
  );
}

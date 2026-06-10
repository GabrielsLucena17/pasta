import brandMark from "../../DesignSystem/img/logoNewImage2.png";

export default function BrandLogo({ className = "" }) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <img src={brandMark} alt="" aria-hidden="true" />
      <strong>Bonifácil</strong>
    </span>
  );
}

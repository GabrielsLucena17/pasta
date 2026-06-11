import brandMark from "../../DesignSystem/img/logoNewImage2.png";

export default function BrandLogoOnlyImage({ className = "" }) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <img src={brandMark} alt="" aria-hidden="true" />
    </span>
  );
}

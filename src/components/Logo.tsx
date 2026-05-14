import "./styles/Logo.css";

const Logo = ({ className }: { className?: string }) => {
  return (
    <a href="/#" className={`logo-container ${className || ""}`} data-cursor="disable">
      <div className="logo-flip-inner">
        <div className="logo-front">MM</div>
        <div className="logo-back">مم</div>
      </div>
    </a>
  );
};

export default Logo;

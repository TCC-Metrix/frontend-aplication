import "./PreLogin.css";
import logoWhiteImage from "../../../assets/images/metrix-logo-white.png";
import logoDarkImage from "../../../assets/images/metrix-logo-dark.png";
import logoRex from "../../../assets/images/rexroth-logo-white-nobg.png";
import Button from "../../../components/Buttons/Button";

function PreLogin() {
  return (
    <div className="login-container">
      <div className="login-container-header">
        <div className="logo-top-section">
          <img src={logoRex} alt="logo-rex-white" />
        </div>
        <div className="login-content-container">
          <div className="login-content-dialog">
            <img src={logoDarkImage} alt="logo-metrix-dark" />
            <p className="header-three black-light">
              Faça login com o usuário bosch
            </p>
            <Button className="btn-full btn-secondary light-lowercase font-20" onClickFunction={() => {}}>
               Ir à página de login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreLogin;

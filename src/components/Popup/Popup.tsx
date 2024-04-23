import "./Popup.css";
import Button from "../Buttons/Button";
import { IoAlertCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";

interface PopupProps {
  isActive: boolean;
  type: string;
  title: string;
  body: string;
  btnFunction: Function;
}

const Popup: React.FC<PopupProps> = ({
  isActive,
  type,
  body,
  title,
  btnFunction,
}) => {
  return (
    <div
      className={`popup-overlay-container ${
        isActive ? "overlay-active" : "overlay-inative"
      }`}
    >
      {type !== "none" && (
        <div className={isActive ? "popup-active" : "popup-inative"}>
          <div className="module-popup-content">
            <div className="popup-header">
              {type === "error" ? (
                <>
                  <IoAlertCircle color="#ed000873" size={80} />
                  <p className="header-three error-title">{title}</p>
                </>
              ) : (
                <>
                  <IoCheckmarkCircle size={80} color="#61C78A" />
                  <p className="header-three feedback-title">{title}</p>
                </>
              )}
            </div>
            <div className="popup-body">
              <p className="text error-body">{body}</p>
            </div>
          </div>
          {type === "error" ? (
            <Button
              className="btn btn-primary-red"
              onClickFunction={btnFunction}
            >
              Tentar novamente
            </Button>
          ) : (
            <Button className="btn btn-secondary" onClickFunction={btnFunction}>
              Ir à página inicial
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Popup;

import "./Popup.css";
import Button from "../Buttons/Button";
import { IoIosClose } from "react-icons/io";

interface PopupProps {
  isActive: boolean;
  setIsActive: (args: boolean) => void;
  type: string,
  title: string;
  body: string;
}

const Popup: React.FC<PopupProps> = ({ isActive, setIsActive, type, body, title }) => {
  return (
    <div
      className={`popup-overlay-container ${
        isActive ? "overlay-active" : "overlay-inative"
      }`}
    >
      <div className={isActive ? "popup-active" : "popup-inative"}>
        <Button
          className="close-button"
          onClickFunction={() => {
            setIsActive(false);
          }}
        >
          <IoIosClose size={35} />
        </Button>
        <div className="module-popup-content">
          <div className="popup-header">
            <p className="header-two title-popup error-title">{title}</p>
          </div>
          <div className="popup-body">
            <p className="normal-text error-body">{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

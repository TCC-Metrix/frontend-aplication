import "./Popup.css";
import Button from "../Buttons/Button";
import useStore from "../../store/store";
import { IoAlertCircle } from "react-icons/io5";


interface PopupProps {
  isActive: boolean;
  type: string,
  title: string;
  body: string;
}

const Popup: React.FC<PopupProps> = ({ isActive, type, body, title }) => {
  const setIsPopupActive = useStore((state) => state.setIsPopupActive)


  return (
    <div
      className={`popup-overlay-container ${
        isActive ? "overlay-active" : "overlay-inative"
      }`}
    >
      <div className={isActive ? "popup-active" : "popup-inative"}>

        <div className="module-popup-content">
          
          <div className="popup-header">
            <IoAlertCircle color="#ed000873" size={80}/>
            <p className="header-three error-title">{title}</p>
          </div>
          <div className="popup-body">
            <p className="text error-body">{body}</p>
          </div>
        </div>
          <Button className="btn btn-primary-red" onClickFunction={() => {
            setIsPopupActive(false)
          }}>
            Tentar novamente
          </Button>
      </div>
    </div>
  );
};

export default Popup;

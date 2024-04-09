import { Button } from "../../..";
import BasicInput from "../BasicInput/BasicInput";
import "./ExpandableInput.css";


interface ExpandableInputProps {
}


function ExpandableInput(props: ExpandableInputProps) {
  return (
    <div className="expandable-input-container">
        <BasicInput inputPlaceholder="reeferência adicional" inputStyle="large-input"/>
        <Button onClickFunction={() => {}} className="btn btn-add">
            +
        </Button>
    </div>
  );
}

export default ExpandableInput;

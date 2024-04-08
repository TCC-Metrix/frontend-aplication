import "./BasicInput.css";

interface BasicInputProps {
  inputStyle: string;
  // inputType: string;
  inputPlaceholder: string;
  // inputValue: string;
  // setInputValue: (dropdownValue: string) => void;
}

function BasicInput(props: BasicInputProps) {
  return (
    <div className={`entryarea ${props.inputStyle}`}>
      <input type="text" className="text-input" required />
      <div className="label-line text-major">{props.inputPlaceholder}</div>
    </div>
  );
}

export default BasicInput;

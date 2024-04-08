import { BasicInput, SelectInput, DateInputInside } from "../../../components";
import "./InstrumentRegister.css";

const InstrumentRegister = () => {
  return (
    <>
      <div className="main-container-instrument-register-page">
        <div className="main-content">
          <BasicInput inputPlaceholder="descrição" inputStyle="large-input" />
          <div className="flex">
            <BasicInput inputPlaceholder="código" inputStyle="little-input" />
            <BasicInput inputPlaceholder="código" inputStyle="little-input" />
            <BasicInput inputPlaceholder="código" inputStyle="little-input" />
          </div>
          <div className="flex">
            <BasicInput inputPlaceholder="código" inputStyle="medium-input" />
            <SelectInput id="instrument-active" placeholder="código" optionsList={["a", "b", "c"]} />
          </div>
          <DateInputInside/>
          
        </div>
      </div>
    </>
  );
};

export default InstrumentRegister;

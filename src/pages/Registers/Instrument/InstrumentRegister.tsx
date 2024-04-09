import { BasicInput, SelectInput, DateInputInside, ExpandableInput } from "../../../components";
import "./InstrumentRegister.css";

const InstrumentRegister = () => {
  return (
    <>
      <div className="main-container-instrument-register-page">
        <div className="main-content">
          <form className="main-form">
            <BasicInput inputPlaceholder="descrição" inputStyle="large-input" />
            <div className="flex-form-line">
              <BasicInput inputPlaceholder="código" inputStyle="little-input" />
              <BasicInput
                inputPlaceholder="número de série"
                inputStyle="little-input"
              />
              <BasicInput
                inputPlaceholder="inventário"
                inputStyle="little-input"
              />
            </div>
            <div className="flex-form-line">
              <DateInputInside
                placeholder="data de aquisição"
                inputStyle="medium"
              />
              <BasicInput inputPlaceholder="código" inputStyle="medium-input" />
            </div>
            <BasicInput
              inputPlaceholder="fabricante"
              inputStyle="large-input"
            />
            <BasicInput inputPlaceholder="família" inputStyle="large-input" />
            <div className="flex-form-line">
              <BasicInput inputPlaceholder="critério de aceitação" inputStyle="little-input" />
              <BasicInput
                inputPlaceholder="unidade de medida"
                inputStyle="little-input"
              />
              <SelectInput
                placeholder="situação"
                optionsList={["--selecione", "ativo", "inativo"]}
                id="situation-select"
              />
            </div>
            <div className="flex-form-line">
              <BasicInput inputPlaceholder="custo de aquisição" inputStyle="medium-input"/>
              <BasicInput inputPlaceholder="centro de custo" inputStyle="medium-input"/>
            </div>
            <ExpandableInput/>
          </form>

        </div>
      </div>
    </>
  );
};

export default InstrumentRegister;

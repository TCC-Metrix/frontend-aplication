import { useForm } from "react-hook-form";
import {
  BasicInput,
  SelectInput,
  DateInputInside,
  ExpandableInput,
  RadioInput,
  Button
} from "../../../components";
import "./InstrumentRegister.css";

const InstrumentRegister = () => {

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
    getValues
  } = useForm()


  const onSubmit = () => {

  }

   

  return (
    <>
      <div className="main-container-instrument-register-page">
        <div className="main-content">
          <form className="main-form" onSubmit={(e: any) => {e.preventDefault()}}>
            <BasicInput isRequired={false} inputName="description" inputPlaceholder="descrição" inputStyle="large-input" inputType="text" register={register}/>
            {/* <div className="flex-form-line">
              <BasicInput inputPlaceholder="código" inputStyle="little-input" inputType="text"/>
              <BasicInput
                inputPlaceholder="número de série"
                inputStyle="little-input"
                inputType="text"
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
              <BasicInput
                inputPlaceholder="critério de aceitação"
                inputStyle="little-input"
              />
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
              <BasicInput
              inputType="money"
                inputPlaceholder="custo de aquisição"
                inputStyle="medium-input"
              />
              <BasicInput
                inputPlaceholder="centro de custo"
                inputStyle="medium-input"
              />
            </div>
            <ExpandableInput />
            <p className="normal-text radio-title">Instrumento calibrado?</p>
            
  </div> */}
            <input type="submit" value="Enviar" /> 
            <div className="radio-group">
              <RadioInput
                id="no"
                name="is-instrument-calibrated"
                title="Não"
                value="no"
              />
              <RadioInput
                id="yes"
                name="is-instrument-calibrated"
                title="Sim"
                value="yes"
              />
              </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default InstrumentRegister;

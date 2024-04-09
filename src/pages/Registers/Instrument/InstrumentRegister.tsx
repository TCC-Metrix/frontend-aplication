import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import {
  BasicInput,
  SelectInput,
  DateInputInside,
  ExpandableInput,
  RadioInput,
  BasicInputFilter,
} from "../../../components";
import "./InstrumentRegister.css";

const InstrumentRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log("passei aq hjehe");
    console.log(data);
  };



  return (
    <>
      <div className="main-container-instrument-register-page">
        <div className="main-content">
          <p className="header-three">Cadastrar instrumento</p>
          <form className="main-form">
            <BasicInput
              errors={errors}
              isRequired={true}
              inputName="description"
              inputPlaceholder="descrição"
              inputStyle="large-input"
              inputType="text"
              register={register}
            />
            <div className="flex-form-line">
              <BasicInput
                inputPlaceholder="código"
                inputStyle="little-input"
                inputType="text"
                errors={errors}
                isRequired={true}
                inputName="code"
                register={register}
              />
              <BasicInput
                inputPlaceholder="número de série"
                inputStyle="little-input"
                inputType="text"
                errors={errors}
                isRequired={false}
                inputName="seriumber"
                register={register}
              />
              <BasicInput
                inputPlaceholder="inventário"
                inputStyle="little-input"
                errors={errors}
                isRequired={true}
                inputName="inventory"
                register={register}
                inputType="text"
              />
            </div>
            <div className="flex-form-line">
              <DateInputInside
                placeholder="data de aquisição"
                inputStyle="medium-input"
                register={register}
                inputName="acquisitionDate"
                isRequired={true}
                errors={errors}
              />
              <BasicInput
                inputPlaceholder="forncedor"
                inputStyle="medium-input"
                errors={errors}
                inputType="text"
                isRequired={true}
                inputName="supplier"
                register={register}
              />
            </div>
            <BasicInput
              inputPlaceholder="fabricante"
              inputStyle="large-input"
              errors={errors}
              isRequired={false}
              inputType="text"
              inputName="manufacturer"
              register={register}
            />
            <BasicInput
              inputPlaceholder="família"
              inputStyle="large-input"
              errors={errors}
              isRequired={false}
              inputType="text"
              inputName="family"
              register={register}
            />
            <div className="flex-form-line">
              <BasicInput
                inputPlaceholder="critério de aceitação"
                inputStyle="little-input"
                errors={errors}
                isRequired={false}
                inputType="text"
                inputName="acceptanceCriteria"
                register={register}
              />
              <BasicInput
                inputPlaceholder="unidade de medida"
                inputStyle="little-input"
                errors={errors}
                isRequired={false}
                inputType="text"
                inputName="measureUnity"
                register={register}
              />
              <SelectInput
                placeholder="situação"
                optionsList={["--selecione", "ativo", "inativo"]}
                id="situation"
                register={register}
              />
            </div>
            <div className="flex-form-line">
              <BasicInput
                inputType="money"
                inputPlaceholder="custo de aquisição"
                inputStyle="medium-input"
                errors={errors}
                isRequired={false}
                inputName="acquisitionCost"
                register={register}
              />
              <BasicInput
                inputPlaceholder="centro de custo"
                inputStyle="medium-input"
                errors={errors}
                isRequired={false}
                inputType="text"
                inputName="costCenter"
                register={register}
              />
            </div>
            {/* <ExpandableInput /> */}
            <p className="normal-text radio-title">Instrumento calibrado?</p>
            <div className="radio-group">
              <RadioInput
                id="yes"
                name="is-instrument-calibrated"
                title="Sim"
                value="yes"
              />
              <RadioInput
                id="no"
                name="is-instrument-calibrated"
                title="Não"
                value="no"
              />
            </div>
            <button
              className="btn btn-secondary btn-lg m-auto"
              onClick={handleSubmit(onSubmit)}
            >
              <span className="text button-font">Enviar</span>
            </button>
            <BasicInputFilter/>
          </form>
        </div>
      </div>
    </>
  );
};

export default InstrumentRegister;

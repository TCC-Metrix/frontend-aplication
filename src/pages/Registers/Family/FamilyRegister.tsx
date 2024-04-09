import { BasicInput, Button } from "../../../components"
import RadioButton from "../../../components/RadioButton/RadioButton"
import "./FamilyRegister.css"

const FamilyRegister = () => {
  return (
    <>
      <div className="main-container-instrument-register-page">
        <div className="main-content">
          <div className="text-header">
            <h1 className="header-three">Cadastro: Família</h1>
          </div>
          <form className="main-form">
            <BasicInput inputPlaceholder="nome" inputStyle="large-input" />
            <div className="flex-form-line">
              <BasicInput inputPlaceholder="freq de calibração (meses)" inputStyle="medium-input" />
              <BasicInput inputPlaceholder="código familia" inputStyle="medium-input" />
            </div>
          </form>
          <h3 className="text-major">Contagem do tempo de calibração</h3>
          <div>
            <RadioButton title="Inicia a partir do uso" name="inicia a partir do uso" value="uso" id="uso" />
            <RadioButton title="Inicia a partir da data de calibração" name="inicia a partir do uso" value="uso" id="uso" />
          </div>
          <div>
            <Button onClickFunction={() => {}} className="btn btn-secondary">
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FamilyRegister
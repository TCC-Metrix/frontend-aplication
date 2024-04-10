import { BasicInput, Button, RadioInput } from "../../../components";
import "./FamilyRegister.css";
import { useForm } from "react-hook-form";

const FamilyRegister = () => {
	const {
		register,
		formState: { errors },
	} = useForm();

	return (
		<>
			<div className="main-container-instrument-register-page">
				<div className="main-content">
					<div className="text-header">
						<h1 className="header-three">Cadastro: Família</h1>
					</div>
					<form className="main-form-family-register">
						<BasicInput
							errors={errors}
							isRequired={true}
							inputName="name"
							inputPlaceholder="nome"
							inputStyle="large-input"
							inputType="text"
							register={register}
						/>
						<div className="flex-form-line-inputs-family-register">
							<BasicInput
								errors={errors}
								isRequired={true}
								inputName="calibration-frequence"
								inputPlaceholder="freq de calibração (meses)"
								inputStyle="medium-input"
								inputType="number"
								register={register}
							/>
							<BasicInput
								errors={errors}
								isRequired={true}
								inputName="family-code"
								inputPlaceholder="código familia"
								inputStyle="medium-input"
								inputType="text"
								register={register}
							/>
						</div>
						<div>
							<h3 className="text-major">Contagem do tempo de calibração</h3>
							<div className="flex-row-direction-family-register">
								<RadioInput
									title="Inicia a partir do uso"
									name="inicia a partir do uso"
									value="uso"
									id="uso"
								/>
								<RadioInput
									title="Inicia a partir da data de calibração"
									name="inicia a partir do uso"
									value="uso"
									id="uso"
								/>
							</div>
						</div>
						<div className="confirm-button-family-register">
							<Button onClickFunction={() => {}} className="btn btn-secondary">
								Confirmar
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default FamilyRegister;

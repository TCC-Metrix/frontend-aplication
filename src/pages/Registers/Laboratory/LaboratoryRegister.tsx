import "./LaboratoryRegister.css";
import { BasicInput, Button } from "../../../components";
import { useForm } from "react-hook-form";

const LaboratoryRegister = () => {

	const {
		register,
		formState: { errors },
	} = useForm();
	
	return (
		<>
			<div className="main-container-laboratory-register-page">
				<div className="main-content-laboratory-page">
					<div className="title-laboratory-register-page">
						<h1 className="header-three">Cadastro: Laboratório</h1>
					</div>
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
						<BasicInput
							errors={errors}
							isRequired={true}
							inputName="calibration-code"
							inputPlaceholder="codigo cal"
							inputStyle="large-input"
							inputType="text"
							register={register}
						/>
						<div className="btn-confirm-laboratory-page">
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

export default LaboratoryRegister;

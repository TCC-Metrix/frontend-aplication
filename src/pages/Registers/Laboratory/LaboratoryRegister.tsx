import "./LaboratoryRegister.css";
import { BasicInput, Button } from "../../../components";

const LaboratoryRegister = () => {
	return (
		<>
			<div className="main-container-laboratory-register-page">
				<div className="main-content-laboratory-page">
					<div className="title-laboratory-register-page">
						<h1 className="header-three">Cadastro: Laboratório</h1>
					</div>
					<form className="main-form">
						<BasicInput inputPlaceholder="descrição" inputStyle="large-input" />
						<BasicInput
							inputPlaceholder="código cal"
							inputStyle="large-input"
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
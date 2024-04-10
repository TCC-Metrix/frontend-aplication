import "./Supplier.css";
import { BasicInput, Button } from "../../../components";
import { msalInstance } from "../../../authSSO/msalInstance";

const SupplierRegister = () => {
	
  console.log(msalInstance.getActiveAccount())

  return (
		<>
			<div className="main-container-supplier-register-page">
				<div className="main-content-supplier-page">
					<div className="title-supplier-register-page">
						<h1 className="header-three">Cadastro: Fornecedor</h1>
					</div>
					<form className="main-form">
						<BasicInput inputPlaceholder="nome" inputStyle="large-input" />
						<BasicInput
							inputPlaceholder="cnpj"
							inputStyle="large-input"
						/>
						<div className="btn-confirm-supplier-page">
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

export default SupplierRegister;

import "./Supplier.css";
import { BasicInput, Button } from "../../../components";
import { useForm } from "react-hook-form";

const SupplierRegister = () => {

	const {
		register,
		formState: { errors },
	} = useForm();
	
	return (
		<>
			<div className="main-container-supplier-register-page">
				<div className="main-content-supplier-page">
					<div className="title-supplier-register-page">
						<h1 className="header-three">Cadastro: Fornecedor</h1>
					</div>
					<form className="main-form">
						<BasicInput
							errors={errors}
							isRequired={true}
							inputName="name"
							inputPlaceholder="nome"
							inputStyle="large-input"
							inputType="text"
							register={register}
						/>
						<BasicInput
							errors={errors}
							isRequired={true}
							inputName="cnpj"
							inputPlaceholder="cnpj"
							inputStyle="large-input"
							inputType="text"
							register={register}
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

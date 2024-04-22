import "./Supplier.css";
import { BasicInput, Button } from "../../../components";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useNavbarStore } from "../../../store";

const SupplierRegister = () => {
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data: FieldValues) => {
		console.log(data);
	};

	return (
		<>
			<div
				className="main-container-supplier-register-page"
				onClick={() => {
					setActiveNavbar(false);
				}}
			>
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
							<Button
								onClickFunction={handleSubmit(onSubmit)}
								className="btn btn-secondary"
							>
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

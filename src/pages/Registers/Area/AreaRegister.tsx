import "./AreaRegister.css";
import { BasicInput, Button } from "../../../components";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useNavbarStore } from "../../../store";

const AreaRegister = () => {
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
				className="main-container-area-register-page"
				onClick={() => {
					setActiveNavbar(false);
				}}
			>
				<div className="main-content-area-page">
					<div className="title-area-register-page">
						<h1 className="header-three">Cadastro: Area</h1>
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
						<div className="btn-confirm-area-page">
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

export default AreaRegister;

import "./LaboratoryRegister.css";
import { BasicInput, Button } from "../../../components";
import { useNavbarStore, usePopupStore } from "../../../store";
import type { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { RotatingLines } from "react-loader-spinner";
import { LaboratoryRegisterPost } from "../../../utils/interfaces/Interfaces";
import { usePostLaboratoryRegister } from "../../../services/useMutation";

const LaboratoryRegister = () => {
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
				className="main-container-laboratory-register-page"
				onClick={() => {
					setActiveNavbar(false);
				}}
			>
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

export default LaboratoryRegister;

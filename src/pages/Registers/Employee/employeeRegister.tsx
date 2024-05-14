import "./EmployeeRegister.css";
import { BasicInput, Button } from "../../../components";
import { useNavbarStore } from "../../../store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { RotatingLines } from "react-loader-spinner";
import { EmployeeRegisterPost } from "../../../utils/interfaces/Interfaces";
import { usePostEmployeeRegister } from "../../../services/useMutation";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import request from "axios";

const schema = z.object({
	name: z
		.string()
		.min(1, "Campo obrigatorio")
		.max(40, "Máximo de 40 digitos.")
		.refine((value) => !/^\s+$/.test(value), {
			message: "Nome não pode conter apenas espaços em branco",
		}),
	email: z
		.string()
		.min(1, "Campo obrigatorio")
		.email("Digite um E-mail válido")
		.refine((value) => !/^\s+$/.test(value), {
			message: "Email não pode conter apenas espaços em branco",
		}),
	sector: z
		.string()
		.min(1, "Campo obrigatorio")
		.refine((value) => !/^\s+$/.test(value), {
			message: "Setor não pode conter apenas espaços em branco",
		}),
});

type FormFields = z.infer<typeof schema>;

const EmployeeRegister = () => {
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const [isLoadingPostEmployeeRegister, setIsLoadingPostEmployeeRegister] =
		useState<boolean>(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
    reset,
	} = useForm<FormFields>({ resolver: zodResolver(schema) });

	const notify = (type: string, message?: string) => {
		type === "success" &&
			toast.success("Funcionário registrado com sucesso", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});

		type === "error" &&
			toast.error(`${message ? message : "Erro interno no servidor"}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
	};

	const postEmployeeMutation = usePostEmployeeRegister();
	const handlePostEmployeeRegister: SubmitHandler<EmployeeRegisterPost> = (
		data
	) => {
		setIsLoadingPostEmployeeRegister(true);
		postEmployeeMutation.mutate(data, {
			onSettled: (error) => {
				setIsLoadingPostEmployeeRegister(false);
				if (error && request.isAxiosError(error)) {
					const errorAxios = error as AxiosError;
					if (errorAxios.response?.data) {
						if (error.response?.data === 409) {
							notify("error", "Funcionário com este EDV já está cadastrado.");
							return;
						}
					}
					console.error("Ocorreu um erro:", error);
					notify("error");
					return;
				} else {
					setIsLoadingPostEmployeeRegister(false);
					reset();
					notify("success");
				}
			},
		});
	};

	const handleConfirmEmployeeRegister = (dataApi: z.infer<typeof schema>) => {
		setIsLoadingPostEmployeeRegister(true);

			setIsLoadingPostEmployeeRegister(false);

			const data = {
				name: dataApi.name,
				email: dataApi.email,
				sector: dataApi.sector,
			};

			handlePostEmployeeRegister(data);

	};

	return (
		<>
			<div
				className="main-container-employee-register-page"
				onClick={() => {
					setActiveNavbar(false);
				}}
			>
				<div className="main-content-employee-page">
					<div className="title-employee-register-page">
						<h1 className="header-three">Cadastro: Funcionário</h1>
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
						
						<div className="flex-form-line-inputs-employee-register">
						<BasicInput
							errors={errors}
							isRequired={false}
							inputName="email"
							inputPlaceholder="email"
							inputStyle="medium-input"
							inputType="text"
							register={register}
						/>
							<BasicInput
								errors={errors}
								isRequired={false}
								inputName="sector"
								inputPlaceholder="setor"
								inputStyle="medium-input"
								inputType="text"
								register={register}
							/>
						</div>
						<div className="btn-confirm-employee-page">
							<Button
								onClickFunction={handleSubmit(handleConfirmEmployeeRegister)}
								className="btn btn-secondary"
							>
								{isLoadingPostEmployeeRegister ? (
									<RotatingLines
										visible={true}
										strokeWidth="5"
										animationDuration="0.75"
										ariaLabel="rotating-lines-loading"
										strokeColor="#fff"
										width="20"
									/>
								) : (
									<>Confirmar</>
								)}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default EmployeeRegister;

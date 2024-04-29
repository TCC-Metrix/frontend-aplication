import "./LaboratoryRegister.css";
import { BasicInput, Button } from "../../../components";
import { useNavbarStore, usePopupStore } from "../../../store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { RotatingLines } from "react-loader-spinner";
import { LaboratoryRegisterPost } from "../../../utils/interfaces/Interfaces";
import { usePostLaboratoryRegister } from "../../../services/useMutation";
import { useState } from "react";

const schema = z.object({
	description: z
		.string()
		.min(1, "Campo obrigatorio")
		.refine((value) => !/^\s+$/.test(value), {
			message: "Nome não pode conter apenas espaços em branco",
		}),
	calibrationCode: z
		.string()
		.min(1, "Campo obrigatorio")
		.refine((value) => !/^\s+$/.test(value), {
			message: "Campo obrigatório"
		})
		.transform((value) => parseInt(value))
})

type FormFields = z.infer<typeof schema>

const LaboratoryRegister = () => {
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const setPopupType = usePopupStore((state) => state.setPopupType);
	const setPopupBody = usePopupStore((state) => state.setPopupBody);
	const setPopupTitle = usePopupStore((state) => state.setPopupTitle);
	const setIsPopupActive = usePopupStore((state) => state.setIsPopupActive);
	const setPopupFunction = usePopupStore((state) => state.setPopupFunction);
	const [isLoadingPostLaboratoryRegister, setIsLoadingPostLaboratoryRegister] =
		useState<boolean>(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormFields>({ resolver: zodResolver(schema) });

	const createPopup = (
		type: string,
		title: string,
		body: string,
		btnFunction: () => void
	) => {
		setPopupType(type);
		setPopupTitle(title);
		setPopupBody(body);
		setPopupFunction(() => {
			setPopupBody("");
			setPopupTitle("");
			setPopupType("none");
			btnFunction();
		});
		setIsPopupActive(true);
	};

	const postLaboratoryMutation = usePostLaboratoryRegister();

	const handlePostLaboratoryRegister: SubmitHandler<LaboratoryRegisterPost> = (
		data
	) => {
		setIsLoadingPostLaboratoryRegister(true);
		postLaboratoryMutation.mutate(data, {
			onSettled: (data, error) => {
				if (error) {
					setTimeout(() => {
						setIsLoadingPostLaboratoryRegister(false);
						console.error("Ocorreu um erro:", error);
						createPopup(
							"error",
							"Erro interno do servidor",
							"Estamos com problemas em nosso servidor, tente novamente",
							() => {
								setIsPopupActive(false);
							}
						);
					}, 1000);
					return;
				} else {
					console.log(data);
					setIsLoadingPostLaboratoryRegister(false);
					createPopup(
						"feedback",
						"Movimentação realizada com sucesso",
						"",
						() => {
							setIsPopupActive(false);
						}
					);
				}
			},
		});
	};

	const handleConfirmLaboratoryRegister = (dataApi: z.infer<typeof schema>) => {
		setIsLoadingPostLaboratoryRegister(true)
		setTimeout(() => {
			setIsLoadingPostLaboratoryRegister(false)

			const data = {
				name: dataApi.description,
				calCode: dataApi.calibrationCode,
			};

			handlePostLaboratoryRegister(data);
		}, 1000)
	};

	return (
		<div
			className="background-container-main"
			onClick={() => {
				setActiveNavbar(false);
			}}
		>
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
							inputName="calibrationCode"
							inputPlaceholder="codigo cal"
							inputStyle="large-input"
							inputType="text"
							register={register}
						/>
						<div className="btn-confirm-laboratory-page">
							<Button
								onClickFunction={handleSubmit(handleConfirmLaboratoryRegister)}
								className="btn btn-secondary"
							>
								{isLoadingPostLaboratoryRegister ? (
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
		</div>
	);
};

export default LaboratoryRegister;

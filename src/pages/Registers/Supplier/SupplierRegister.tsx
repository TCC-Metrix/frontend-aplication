import "./Supplier.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInput, Button } from "../../../components";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavbarStore, usePopupStore } from "../../../store";
import { usePostSupplierRegister } from "../../../services/useMutation";
import { SupplierRegisterPost } from "../../../utils/interfaces/Interfaces";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { z } from "zod";

const schema = z.object({
	name: z
		.string()
		.min(1, "Campo obrigatorio")
		.refine((value) => !/^\s+$/.test(value), {
			message: "Nome não pode conter apenas espaços em branco",
		}),
	cnpj: z
		.string()
		.transform((value) => value.replace(/[^\d]/g, "")) // Remove caracteres não numéricos
		.refine((value) => value.length === 14, {
			message: "CNPJ deve conter exatamente 14 dígitos",
		}),
});

type FormFields = z.infer<typeof schema>;

const SupplierRegister = () => {
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const setPopupType = usePopupStore((state) => state.setPopupType);
	const setPopupBody = usePopupStore((state) => state.setPopupBody);
	const setPopupTitle = usePopupStore((state) => state.setPopupTitle);
	const setIsPopupActive = usePopupStore((state) => state.setIsPopupActive);
	const setPopupFunction = usePopupStore((state) => state.setPopupFunction);
	const [isLoadingPostSupplierRegister, setIsLoadingPostSupplierRegister] =
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

	const postSupplierMutation = usePostSupplierRegister();

	const handlePostSupplierRegister: SubmitHandler<SupplierRegisterPost> = (
		data
	) => {
		setIsLoadingPostSupplierRegister(true);
		postSupplierMutation.mutate(data, {
			onSettled: (data, error) => {
				if (error) {
					setTimeout(() => {
						setIsLoadingPostSupplierRegister(false);
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
					setIsLoadingPostSupplierRegister(false);
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
	console.log();

	const handleConfirmSupplierRegister = (dataApi: z.infer<typeof schema>) => {
		console.log(dataApi.cnpj);

		setIsLoadingPostSupplierRegister(true);
		setTimeout(() => {
			setIsLoadingPostSupplierRegister(false);

			const data = {
				name: dataApi.name,
				cnpj: dataApi.cnpj,
			};

			handlePostSupplierRegister(data);
		}, 1000);
		console.log(typeof dataApi.cnpj);
	};

	return (
		<div
			className="background-container-main"
			onClick={() => {
				setActiveNavbar(false);
			}}
		>
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
							<Button
								onClickFunction={handleSubmit(handleConfirmSupplierRegister)}
								className="btn btn-secondary"
							>
								{isLoadingPostSupplierRegister ? (
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

export default SupplierRegister;

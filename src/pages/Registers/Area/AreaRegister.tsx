import "./AreaRegister.css";
import { BasicInput, Button } from "../../../components";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavbarStore, usePopupStore } from "../../../store";
import { AreaRegisterPost } from "../../../utils/interfaces/Interfaces";
import { usePostAreaRegister } from "../../../services/useMutation";
import { useState } from "react";
import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { z } from "zod";
import { RotatingLines } from "react-loader-spinner";

const AreaRegister = () => {
	const [isLoadingPostAreaRegister, setIsLoadingPostAreaRegister] =
		useState<boolean>(false);
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const setPopupType = usePopupStore((state) => state.setPopupType);
	const setPopupBody = usePopupStore((state) => state.setPopupBody);
	const setPopupTitle = usePopupStore((state) => state.setPopupTitle);
	const setIsPopupActive = usePopupStore((state) => state.setIsPopupActive);
	const setPopupFunction = usePopupStore((state) => state.setPopupFunction);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const postAreaMutation = usePostAreaRegister();

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

	const handlePostAreaRegister: SubmitHandler<AreaRegisterPost> = (data) => {
		setIsLoadingPostAreaRegister(true);
		postAreaMutation.mutate(data, {
			onSettled: (data, error) => {
				if (error) {
					setTimeout(() => {
						setIsLoadingPostAreaRegister(false);
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
					setIsLoadingPostAreaRegister(false);
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

	const handleConfirmAreaRegister = (dataApi: z.infer<typeof schema>) => {
		setIsLoadingPostAreaRegister(true);
		setTimeout(() => {
			setIsLoadingPostAreaRegister(false);

			const data = {
				description: dataApi.name,
			};

			handlePostAreaRegister(data);
		}, 1000);
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
								onClickFunction={handleSubmit(handleConfirmAreaRegister)}
								className="btn btn-secondary"
							>
								{isLoadingPostAreaRegister ? (
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

export default AreaRegister;

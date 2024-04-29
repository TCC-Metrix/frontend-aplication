import "./AreaRegister.css";
import { BasicInput, Button } from "../../../components";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavbarStore } from "../../../store";
import { AreaRegisterPost } from "../../../utils/interfaces/Interfaces";
import { usePostAreaRegister } from "../../../services/useMutation";
import { useState } from "react";
import { z } from "zod";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";



const AreaRegister = () => {
	const [isLoadingPostAreaRegister, setIsLoadingPostAreaRegister] =
		useState<boolean>(false);
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);



	const schema = z.object({
	name: z
		.string()
		.min(1, "Campo obrigatorio")
		.refine((value) => !/^\s+$/.test(value), {
			message: "Nome não pode conter apenas espaços em branco",
		}),
});

type FormFields = z.infer<typeof schema>;

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<FormFields>({ resolver: zodResolver(schema) });

	const postAreaMutation = usePostAreaRegister();

	const notify = (type: string) => {
    
		type === "success" && (
		  toast.success('Área registrada com sucesso', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			})
		)
	
		type === "error" && (
		  toast.error('Erro interno do servidor', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			})
		)
		};
	

	const handlePostAreaRegister: SubmitHandler<AreaRegisterPost> = (data) => {
		setIsLoadingPostAreaRegister(true);
		postAreaMutation.mutate(data, {
			onSettled: (data, error) => {
				if (error) {
					setIsLoadingPostAreaRegister(false);
					console.error("Ocorreu um erro:", error);
					notify("error")
					return;
				} else {
					console.log(data);
					setIsLoadingPostAreaRegister(false);
					notify("success")
					reset()
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
		<div
			className="background-container-main"
			onClick={() => {
				setActiveNavbar(false);
			}}
		>
			<div className="main-container-area-register-page">
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
							<ToastContainer/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AreaRegister;

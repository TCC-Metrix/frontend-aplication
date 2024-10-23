// import React from 'react'
import { useState } from "react";
import { Button, SelectInput } from '../../../components'
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify";
import './IGIReport.css'

export default function IGIReport() {

    const {
        register,
        handleSubmit,
        // formState: { errors, isSubmitSuccessful },
        setValue,
        getValues,
        reset,

    } = useForm();

    const handleGenerateIGIReport = () => {
        alert('Função que irá gerar o relatório no padrão IGI')
    }

    const notify = (type: string, message?: string) => {
		type === "success" &&
			toast.success("Família registrada com sucesso", {
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
			toast.error(
				`${message ? message : "Erro ao processar sua solicitação"}`,
				{
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				}
			);
	};


    return (
        <div className="container-main-igi">
            <div className="container-main-igi-report">
                <h1 className="header-three">Relatório IGI</h1>
                <h3 className="text-major">Selecione o mês e ano base para a geração do relatório</h3>
                <form action="">
                    <div className="igi-report-container">
                        <SelectInput
                            id="month"
                            optionsList={[
                                "Janeiro",
                                "Fevereiro",
                                "Março",
                                "Abril",
                                "Maio",
                                "Junho",
                                "Julho",
                                "Agosto",
                                "Setembro",
                                "Outubro",
                                "Novembro",
                                "Dezembro"
                            ]}
                            placeholder="Selecione o mês"
                            register={register}
                        />
                        <SelectInput
                            id="year"
                            optionsList={[
                                "2026",
                                "2025",
                                "2024",
                                "2023",
                                "2022",
                                "2021",
                                "2020",
                            ]}
                            placeholder="Selecione o ano"
                            register={register}
                        />
                    </div>

                    <div className="m-auto btn-session-confirm">
                        <Button
                            className="btn btn-secondary btn-lg"
                            onClickFunction={handleSubmit(handleGenerateIGIReport)}
                        >
                            Gerar Relatório
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// import React from 'react'
import './GeneralReport.css'
import { useForm } from 'react-hook-form'

// teste de uso do componente interno
import { Checkbox, SelectInput } from "../../../components";

export default function GeneralReport() {
  const {
    register,
    handleSubmit,
    // formState: { errors, isSubmitSuccessful },
    setValue,
    getValues,
    reset,

  } = useForm();

  return (
    <div className="container-main-general-report">
      <div className="container-general-report">
        <h1>Relatório Geral</h1>

        <div className="general-report-container">
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

        <Checkbox
          text="manuela"
          id="manuela"
          onCheckboxChange={() => (true)}
        />

      </div>
    </div>
  )
}

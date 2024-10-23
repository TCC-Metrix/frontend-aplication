import './GeneralReport.css'
import { useForm } from 'react-hook-form'
import {
  Button,
  Checkbox,
  SelectInput,
} from "../../../components";

export default function GeneralReport() {
  const {
    register,
    handleSubmit,
    // formState: { errors, isSubmitSuccessful },
    // setValue,
    // getValues,
    // reset,

  } = useForm();

  const handleGenerateReport = () => {
    alert('Função que irá gerar o relatório no formato de excel')
  }

  return (
    <div className="container-main-general-report">
      <div className="container-general-report">
        <h1 className="header-three">Relatório Geral</h1>

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

        <h1 className="params-column-title">Selecione os campos que deseja incluir no relatório</h1>
        <Checkbox
          text="Selecionar todos"
          id="all"
          onCheckboxChange={() => (true)}
        />
        <br />

        <div className="report-params-list-container">
          <div className="params-column">
            <h1 className="params-column-title">Instrumento</h1>
            <Checkbox
              text="Todos"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Código do instrumento"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Descrição instrumento"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Fabricante"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Situação"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Status"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Número de série"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Data inativação"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Motivo inativação"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Data última movimentação"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Início de uso (data)"
              id="all"
              onCheckboxChange={() => (true)}
            />
          </div>
          <div className="params-column">
            <h1 className="params-column-title">Calibração</h1>
            <Checkbox
              text="Todos"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Frequência calibração"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Frequência calibração original"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Motivo não calibrável"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Data de última saída ao Lab"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Data fixada calibração"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Data próxima calibração"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Data última calibração"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Custo calibração"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Mês base"
              id="all"
              onCheckboxChange={() => (true)}
            />
          </div>
          <div className="params-column">
            <h1 className="params-column-title">Família</h1>
            <Checkbox
              text="Descrição família"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Código família"
              id="all"
              onCheckboxChange={() => (true)}
            />

            <br />

            <h1 className="params-column-title">Aquisição</h1>
            <Checkbox
              text="Todos"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Código centro de custo"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Data aquisição"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Custo Aquisição"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Código usuário"
              id="all"
              onCheckboxChange={() => (true)}
            />
            <Checkbox
              text="Nome usuário"
              id="all"
              onCheckboxChange={() => (true)}
            />

          </div>
        </div>

        <div className="right-button">
          <Button
            className="btn btn-secondary btn-lg"
            onClickFunction={handleSubmit(handleGenerateReport)}
          >
            Gerar Relatório
          </Button>
        </div>

      </div>
    </div>
  )
}

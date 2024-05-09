import { useForm } from "react-hook-form";
import { SelectInput, BasicInput, Button } from "../../components";
import "./InstrumentHistory.css";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useNavigate, useParams } from "react-router-dom";
import { useMovementsByInstrument } from "../../services/useFetchData";

function InstrumentHistory() {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: movementsData, isLoading: isLoadingMovements } =
    useMovementsByInstrument(id);

  //queryFunctions

  const headersList = [
    "Data de saída",
    "Data de retorno",
    "Recebido por",
    "Entregue por",
    "Motivo",
  ];

  const formatDate = (date: string | "") => {
    // Separe o ano, mês e dia
    const [ano, mes, dia] = date.split("-");
    // Retorne a data no formato DD/MM/YYYY
    return `${dia}/${mes}/${ano}`;
  };

  if (isLoadingMovements) return <LoadingPage />;

  return (
    <div className="consult-page">
      <div className="box-shadow-container">
        <div className="box-shadow-container-header">
          <h1 className="header-three">Histórico</h1>
          <p className="normal-text">Filtrar por</p>
          <div className="search-area">
            <SelectInput
              placeholder="Buscar por"
              optionsList={["descrição", "família", "código"]}
              id="column"
              register={register}
            />
            <BasicInput
              register={register}
              inputName="value"
              inputPlaceholder="Busque por isso "
              inputStyle="large-input"
              isRequired={false}
              inputType="text"
              errors={errors}
            />
            <Button
              className="btn btn-sm btn-tertiary"
              onClickFunction={() => {}}
            >
              {" "}
              Pesquisar{" "}
            </Button>
          </div>
        </div>
        <div className="box-shadow-container-table-area">
          <div className="table-container-main">
            <table className="table-container">
              <thead>
                <tr className="first-line">
                  {headersList.map((item, index) => {
                    return <th key={index}>{item}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {movementsData?.map((item) => {
                  return (
                    <tr className="tr-hover" onClick={() => {}}>
                      <td className="text">
                        <p className="td-text">{formatDate(item.useOutput ? item.useOutput.outputDate : "")}</p>
                      </td>
                      <td>{item.movement.type === "USE_RETURN" ? item.useReturn?.returnDate : "-"}</td>
                      <td>{item.useOutput?.receivingResponsible ? item.useOutput.receivingResponsible.name : item.useOutput?.receivingArea.description}</td>
                      <td>{item.useOutput?.shippingResponsible.name}</td>
                      <td>{item.movement.type === "USE_OUTPUT" || item.movement.type === "USE_RETURN" ? "Uso interno" : ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstrumentHistory;

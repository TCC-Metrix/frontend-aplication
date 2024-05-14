import "./InstrumentHistory.css";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useNavigate, useParams } from "react-router-dom";
import { useMovementsByInstrument } from "../../services/useFetchData";

function InstrumentHistory() {

  const { id } = useParams();
  // const navigate = useNavigate();

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
                      <td className="text">
                        <p className="td-text">

                        {item.useReturn ? formatDate(item.useReturn?.returnDate) : "-"}
                        </p>
                        </td>
                      <td className="text">{item.useOutput?.receivingResponsible ? item.useOutput.receivingResponsible.name : item.useOutput?.receivingArea.description}</td>
                      <td className="text">{item.useOutput?.shippingResponsible.name}</td>
                      <td className="text">{item.movement.type === "USE_OUTPUT" || item.movement.type === "USE_RETURN" ? "Uso interno" : ""}</td>
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

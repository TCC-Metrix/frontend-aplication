import "./InstrumentHistory.css";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useNavigate, useParams } from "react-router-dom";
import { useMovementsByInstrument } from "../../services/useFetchData";
import { SelectInput } from "../../components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { formatDate } from "../Consults/Instrument/InstrumentDetails";

function InstrumentHistory() {
  const [viewUses, setViewUses] = useState(true);

  const { id } = useParams();
  const { register, watch } = useForm();

  // const navigate = useNavigate();

  const { data: movementsData, isLoading: isLoadingMovements } =
    useMovementsByInstrument(id);

  const headersList = [
    "Data de saída",
    "Data de retorno",
    "Recebido por",
    "Entregue por",
    "Motivo",
  ];

  const headersCalibList = [
    "Data de saída",
    "Data de calibração",
    "Num. certificado",
    "Motivo",
    "Laboratorio",
  ];

  const view = watch("view");

  useEffect(() => {
    console.log(view);
    if (view === "Uso" || view === undefined) {
      setViewUses(true);
    } else {
      setViewUses(false);
    }
  }, [view]);



  if (isLoadingMovements) return <LoadingPage />;

  return (
    <div className="consult-page">
      <div className="box-shadow-container">
        <div className="box-shadow-container-header">
          <h1 className="header-three">Histórico</h1>
          <SelectInput
            register={register}
            placeholder="Visualizar"
            optionsList={["Uso", "Calibração"]}
            id="view"
          />
        </div>
        <div className="box-shadow-container-table-area">
          <div className="table-container-main">
            <table className="table-container">
              <thead>
                <tr className="first-line">
                  {viewUses
                    ? headersList.map((item, index) => {
                        return <th key={index}>{item}</th>;
                      })
                    : headersCalibList.map((item, index) => {
                        return <th key={index}>{item}</th>;
                      })}
                </tr>
              </thead>
              <tbody>
                {viewUses &&
                  movementsData?.map((item) => {
                    if (item.laboratoryOutput) {
                      return;
                    }
                    return (
                      <tr className="tr-hover" onClick={() => {}}>
                        <td className="text">
                          <p className="td-text">
                            {formatDate(
                              item.useOutput ? item.useOutput.outputDate : ""
                            )}
                          </p>
                        </td>
                        <td className="text">
                          <p className="td-text">
                            {item.useReturn
                              ? formatDate(item.useReturn?.returnDate)
                              : "-"}
                          </p>
                        </td>
                        <td className="text">
                          {item.useOutput?.receivingResponsible
                            ? item.useOutput.receivingResponsible.name
                            : item.useOutput?.receivingArea.description}
                        </td>
                        <td className="text">
                          {item.useOutput?.shippingResponsible.name}
                        </td>
                        <td className="text">
                          {item.movement.type === "USE_OUTPUT" ||
                          item.movement.type === "USE_RETURN"
                            ? "Uso interno"
                            : ""}
                        </td>
                      </tr>
                    );
                  })}

                {!viewUses &&
                  movementsData?.map((item, index) => {
                    if(item.useOutput){
                      return
                    }
                    return (
                      <tr className="tr-hover" key={index} onClick={() => {}}>
                        <td className="text">
                          <p className="td-text">
                            {item.laboratoryOutput?.outputDate}
                           
                          </p>
                        </td>
                        <td className="text">
                          <p className="td-text">
                           -
                          </p>
                        </td>
                        <td className="text">
                          <p className="td-text">
                           -
                          </p>
                        </td>
                        <td className="text">
                          <p className="td-text">
                           {item.laboratoryOutput?.motive === "REPAIR" ? "conserto" : "calibração"}
                          </p>
                        </td>
                        <td className="text">
                          <p className="td-text">
                          {item.laboratoryOutput?.laboratory.description}
                          </p>
                        </td>
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

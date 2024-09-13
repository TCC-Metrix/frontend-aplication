import "./InstrumentHistory.css";
import LoadingPage from "../LoadingPage/LoadingPage";
import {  useParams } from "react-router-dom";
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
    "Entregue por",
    "Tecnico/Area",
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
                    console.log(typeof(item))
                    if (item.reason === "calibração") {
                      return;
                    }
                    return (
                      <tr className="tr-hover" onClick={() => {}}>
                        <td className="text">
                            {formatDate(item.outputDate)}
                        </td>
                        <td className="text">
                            {item.returnDate ? formatDate(item.returnDate) : "-"}
                        </td>
                        <td className="text">
                            {item.shippedBy ? item.shippedBy : "-"}
                        </td>
                        <td className="text">
                            {item.receivedBy}
                        </td>
                        <td className="text">
                            {item.reason}
                        </td>
                      </tr>
                    );
                  })}

                {!viewUses &&
                  movementsData?.map((item, index) => {
                    if(item.reason === "uso interno"){
                      return
                    }
                    return (
                      <tr className="tr-hover" key={index} onClick={() => {}}>
                        <td className="text">
                          {formatDate(item.outputDate)}
                        </td>
                        <td className="text">
                          {item.calibrationDate ? formatDate(item.calibrationDate) : "-"}
                        </td>
                        <td className="text">
                          {item.certificateNumber ? item.certificateNumber : "-"}
                        </td>
                        <td className="text">
                          {item.reason}
                        </td>
                        <td className="text">
                          {item.laboratory ? item.laboratory : "-"}
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

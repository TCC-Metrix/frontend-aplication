import { Button } from "../../../components";
import {
  useInstrumentById,
  useLastMovementByInstrument,
} from "../../../services/useFetchData";
import ErrorPage from "../../ErrorPage/ErrorPage";
import LoadingPage from "../../LoadingPage/LoadingPage";
import "./InstrumentDetails.css";
import { useNavigate, useParams } from "react-router-dom";

interface DetailItemProps {
  subtitle: string;
  content: string | number;
}

interface AdditionalReferencesProps {
  references: string[];
}

const DetailItem: React.FC<DetailItemProps> = ({ subtitle, content }) => (
  <div className="detail-area">
    <p className="detail-subtitle">{subtitle}</p>
    <p className="detail-content">{content ? content : "-"}</p>
  </div>
);

const AdditionalReferences: React.FC<AdditionalReferencesProps> = ({
  references,
}) => (
  <>
    {references.map((item, index) => (
      <DetailItem
        key={index}
        subtitle={`referência adicional ${index + 1}`}
        content={item}
      />
    ))}
  </>
);

const InstrumentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useInstrumentById(id);
  const {
    data: lastMovementData,
    isLoading: isLastMovementLoading,
    error: lastMovementError,
  } = useLastMovementByInstrument(id);

  const navigate = useNavigate();

  const formatDate = (date: string) => {
    // Separe o ano, mês e dia
    const [ano, mes, dia] = date.split("-");
    // Retorne a data no formato DD/MM/YYYY
    return `${dia}/${mes}/${ano}`;
  };

  const getMonth = (date: string) => {
    // Separe o ano, mês e dia
    const mes = date.split("-")[1];
    const ano = date.split("-")[0];
    return `${mes}/${ano}`;
  };

  const getLastyearNumber = (date: string) => {
    const lastDigit = date.split("-")[0].slice(-1);

    if (lastDigit === "1" || lastDigit === "6") {
      return "#A45729"; //marrom ral 8023
    }

    if (lastDigit === "2" || lastDigit === "7") {
      return "#007CB0"; //Azul ral 5015
    }

    if (lastDigit === "3" || lastDigit === "8") {
      return "#B0B0A9"; //Cinza (RAL 7038)
    }

    if (lastDigit === "4" || lastDigit === "9") {
      return "#61993B"; //Verde (RAL 6018)
    }

    if (lastDigit === "5" || lastDigit === "10") {
      return "#F7B500"; //Amarelo (RAL 1023)
    }

    return "";
  };

  if (isLoading || isLastMovementLoading) return <LoadingPage />;
  if (error || lastMovementError) return <ErrorPage />;

  return (
    data && (
      <div className="details-container">
        <div className="top-infos-area">
          <div className="flex-infos-area">
            <Button
              className="btn btn-md btn-tertiary"
              onClickFunction={() => {
                navigate(`/history/instrument/${data.id}`);
              }}
            >
              histórico
            </Button>
            <Button
              className="btn btn-md btn-tertiary"
              onClickFunction={() => {
                sessionStorage.setItem("instrument", JSON.stringify(data));
                sessionStorage.setItem(
                  "movement",
                  JSON.stringify(lastMovementData)
                );
                navigate(`/edit/instrument/${id}`);
              }}
            >
              editar
            </Button>
          </div>
          <div className="flex-infos-area">
            <div>
              <p className="detail-subtitle">status:</p>
              <p className="detail-content">
                {data.status === "available"
                  ? "disponível"
                  : data.status === "in use"
                  ? "em uso"
                  : data.status === "external calibration" &&
                    "calibração externa"}
              </p>
            </div>
            <div>
              <p className="detail-subtitle">situação:</p>
              <p className="detail-content">
                {data.situation === "active"
                  ? "ativo"
                  : data.situation === "active non-calibratable"
                  ? "ativo não calibrável"
                  : "inativo"}
              </p>
            </div>
          </div>
        </div>

        <div className="details-section-container">
          <div className="instrument-detail-area">
            <h1 className="detail-title">INSTRUMENTO</h1>

            <DetailItem subtitle="descrição" content={data.description} />
            <DetailItem subtitle="código" content={data.code} />
            <DetailItem
              subtitle="freq. calibração(instrumento)"
              content={data.calibrationFrequency}
            />
            <DetailItem subtitle="fabricante" content={data.manufacturer} />

            {data.additionalReferences.length > 0 ? (
              <AdditionalReferences references={data.additionalReferences} />
            ) : (
              <AdditionalReferences references={["-", "-", "-"]} />
            )}
          </div>
          <div className="other-details-area">
            <section className="other-details-section">
              <h1 className="detail-title">AQUISIÇÃO</h1>
              <div className="details-section">
                <DetailItem
                  subtitle="data de aquisição"
                  content={formatDate(data.acquisitionDate)}
                />
                <DetailItem subtitle="inventário" content={data.inventory} />
                <DetailItem
                  subtitle="fornecedor"
                  content={data.supplier !== null ? data.supplier.name : "-"}
                />
                <DetailItem
                  subtitle="custo de aquisição"
                  content={data.acquisitionCost}
                />
                <DetailItem subtitle="num. série" content={data.serieNumber} />
              </div>
            </section>

            <section className="other-details-section">
              <h1 className="detail-title">FAMÍLIA</h1>
              <div className="details-section">
                <DetailItem
                  subtitle="descrição"
                  content={data.familyId.description}
                />
                <DetailItem subtitle="código" content={data.familyId.code} />
                <DetailItem
                  subtitle="freq. calibração(família)"
                  content={`${data.familyId.calibrationFrequencyInMonths} meses`}
                />
                <DetailItem
                  subtitle="contagem calibração"
                  content={
                    data.familyId.calibrationTimeCounter === "uso"
                      ? "inicia a partir do uso"
                      : "inicia a partir da calibração"
                  }
                />
              </div>
            </section>
            {lastMovementData ? (
              <section className="other-details-section">
                <h1 className="detail-title">ÚLTIMA MOVIMENTAÇÃO</h1>
                <div className="details-section">
                  <DetailItem
                    subtitle="data de saída"
                    content={formatDate(lastMovementData.useOutput.outputDate)}
                  />
                  <DetailItem
                    subtitle="data de retorno"
                    content={
                      lastMovementData.movement.type === "USE_OUTPUT" ? "" : ""
                    }
                  />
                  <DetailItem
                    subtitle="motivo"
                    content={
                      lastMovementData.movement.type === "USE_OUTPUT"
                        ? "uso interno"
                        : ""
                    }
                  />
                  <DetailItem
                    subtitle="colaborador"
                    content={
                      lastMovementData.useOutput.receivingResponsible
                        ? lastMovementData.useOutput.receivingResponsible.name
                        : "-"
                    }
                  />
                  <DetailItem
                    subtitle="laboratório"
                    content={
                      lastMovementData.movement.type !== "LABORATORY_OUTPUT"
                        ? "-"
                        : ""
                    }
                  />
                  <DetailItem
                    subtitle="área"
                    content={
                      lastMovementData.useOutput.receivingArea
                        ? lastMovementData.useOutput.receivingArea.description
                        : "-"
                    }
                  />
                </div>
              </section>
            ) : (
              <section className="other-details-section">
                <h1 className="detail-title">ÚLTIMA MOVIMENTAÇÃO</h1>
                <div className="details-section">
                  <DetailItem subtitle="data de saída" content={"-"} />
                  <DetailItem subtitle="data de retorno" content={"-"} />
                  <DetailItem subtitle="motivo" content={"-"} />
                  <DetailItem subtitle="colaborador" content={"-"} />
                  <DetailItem subtitle="laboratório" content={"-"} />
                  <DetailItem subtitle="área" content={"-"} />
                </div>
              </section>
            )}

            <section className="other-details-section">
              <h1 className="detail-title">ÚLTIMA CALIBRAÇÃO</h1>
              <div className="details-section">
                <DetailItem
                  subtitle="data de aquisição"
                  content={formatDate(data.acquisitionDate)}
                />
                <DetailItem subtitle="inventário" content={data.inventory} />
                <DetailItem
                  subtitle="fornecedor"
                  content={data.supplier !== null ? data.supplier.name : "-"}
                />
                <DetailItem
                  subtitle="custo de aquisição"
                  content={data.acquisitionCost}
                />
                <DetailItem subtitle="num. série" content={data.serieNumber} />
              </div>
            </section>

            <section className="other-details-section">
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center"
                }}
              >
                <h1 className="detail-title">CALIBRAÇÃO</h1>
                {data.nextCalibration && (
                  <span
                    className="bolinha"
                    style={{
                      backgroundColor: `${getLastyearNumber(
                        data.nextCalibration
                      )}`,
                      display: "block",
                    }}
                  ></span>
                )}
              </div>
              <div className="details-section no-between">
                <DetailItem
                  subtitle="próxima calibração"
                  content={
                    data.nextCalibration
                      ? formatDate(data.nextCalibration)
                      : "-"
                  }
                />

                <DetailItem
                  subtitle="mês base"
                  content={
                    data.nextCalibration ? getMonth(data.nextCalibration) : "-"
                  }
                />
              </div>
            </section>
            {data.situationReason !== null &&
              data.situationReason !== undefined &&
              data.situationReason !== "" && (
                <div>
                  <h1 className="detail-title">SITUAÇÃO</h1>
                  <p>
                    Motivo:{" "}
                    {data.situationReason === "loss"
                      ? "Perda"
                      : "Inconformidade"}
                  </p>
                  <p>
                    {data.situationReason === "loss"
                      ? "N° WorkOn: "
                      : "Nº Análise de risco: "}
                    {data.situationJustification}
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    )
  );
};

export default InstrumentDetails;

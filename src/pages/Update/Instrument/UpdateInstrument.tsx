import { FieldValues, useForm } from "react-hook-form";
import {
  BasicInput,
  BasicInputFilter,
  Button,
  DateInputInside,
  SelectInput,
} from "../../../components";
import "./UpdateInstrument.css";
import {
  Family,
  GeneralInstrument,
} from "../../../utils/interfaces/Interfaces";
import {
  useAllFamilies,
  useAllSuppliers,
} from "../../../services/useFetchData";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateInstrument } from "../../../services/useMutation";
import { toast } from "react-toastify";
import { FormValues } from "../../../utils/types/instrument";

interface DetailItemProps {
  subtitle: string;
  content: string | number;
}

const DetailItem: React.FC<DetailItemProps> = ({ subtitle, content }) => (
  <div className="detail-area">
    <p className="detail-subtitle">{subtitle}</p>
    <p className="detail-content">{content ? content : "-"}</p>
  </div>
);

const UpdateInstrument: React.FC = () => {
  const [familyObject, setFamilyObject] = useState<Family | undefined>();
  const instrument = sessionStorage.getItem("instrument");
  const lastMovement = sessionStorage.getItem("movement");
  const [isPopupActive, setIsPopupActive] = useState(false);
  let data: GeneralInstrument | null = null;
  let lastMovementData = null;
  if (lastMovement) {
    lastMovementData = JSON.parse(lastMovement);
  }
  if (instrument) {
    data = JSON.parse(instrument);
  } else {
    console.log("Não há dados armazenados no Session Storage");
  }

  const {
    data: allFamilies,
    isLoading: isLoadingFamilies,
    isError: isErrorFamilies,
  } = useAllFamilies(); //busca todas as familias
  const {
    data: allSuppliers,
    isLoading: isLoadingSuppliers,
    isError: isErrorSuppliers,
  } = useAllSuppliers(); //busca todos os fornecedores

  const initialValues: FormValues = {
    description: data?.description,
    code: data?.code,
    acquisitionDate: data?.acquisitionDate,
    additionalReference1: data?.additionalReferences?.[0] ?? "",
    additionalReference2: data?.additionalReferences?.[1] ?? "",
    additionalReference3: data?.additionalReferences?.[2] ?? "",
    calibrationFrequency: data?.calibrationFrequency,
    familyID: data?.familyId.id,
    family: data?.familyId.description,
    supplier: data?.supplier?.id,
    supplierDescription: data?.supplier?.name,
    manufacturer: data?.manufacturer,
    inventory: data?.inventory,
    serieNumber: data?.serieNumber,
    situation: data?.situation,
    status: data?.status,
    situationJustification: data?.situationJustification,
    situationReason: data?.situationReason,
  };

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
    getValues,
    setError,
    clearErrors,
  } = useForm<FormValues>({ defaultValues: initialValues });

  const familyID = watch("familyID");
  const situationReason = watch("situationReason");
  const situationJustification = watch("situationJustification");
  const situation = watch("situation");

  useEffect(() => {
    setFamilyObject(allFamilies?.find((family) => family.id === familyID));
  }, [familyID]);

  useEffect(() => {
    if (situation !== "inactive") {
      setValue("situationReason", "");
      setValue("situationJustification", "");
    }
  }, [situation]);

  useEffect(() => {
    if (situationReason !== null && situationReason !== "") {
      clearErrors("situationReason");
    }

    if (situationJustification !== null && situationJustification !== "") {
      clearErrors("situationJustification");
    }
  }, [situation, situationReason]);

  window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    event.returnValue =
      "Tem certeza que deseja sair desta página? Se sair, suas alterações não serão salvas.";
  });

  const notify = (type: string, message?: string) => {
    type === "success" &&
      toast.success("Instrumento atualizado com sucesso", {
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
        `${message ? message : "Erro ao processar sua solicitação!"}`,
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

  const formatDate = (date: string) => {
    const [ano, mes, dia] = date.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const getMonth = (date: string) => {
    // Separe o ano, mês e dia
    const mes = date.split("-")[1];
    const ano = date.split("-")[0];
    return `${mes}/${ano}`;
  };

  const updateInstrument = useUpdateInstrument();

  const handleConfirm = (dataForm: FieldValues) => {
    const additionalReferences = [];
    if (dataForm.additionalReference1 !== "") {
      additionalReferences.push(dataForm.additionalReference1);
    }

    if (dataForm.additionalReference2 !== "") {
      additionalReferences.push(dataForm.additionalReference2);
    }

    if (dataForm.additionalReference3 !== "") {
      additionalReferences.push(dataForm.additionalReference3);
    }

    additionalReferences.length === 0
      ? (dataForm.additionalReferences = null)
      : (dataForm.additionalReferences = additionalReferences);

    dataForm.id = data?.id;

    if (situation === "inactive") {
      if (!situationJustification || !situationReason) {
        setIsPopupActive(true);
        return;
      }
    }

    updateInstrument.mutate(dataForm, {
      onSettled(dataSetted, error) {
        if (error) {
          console.log(error);
          notify("error");
        } else {
          notify("success");
          navigate(`/consult/instrument/${data?.id}`);
          console.log(dataSetted);
        }
      },
    });
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

  if (isLoadingSuppliers || isLoadingFamilies) return <LoadingPage />;
  if (isErrorFamilies || isErrorSuppliers) return <ErrorPage />;

  return (
    data && (
      <div className="details-container">
        <div className="top-infos-area">
          <div className="flex-infos-area">
            <h1 className="detail-title">Editar instrumento</h1>
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
            <div className="select-area">
              <SelectInput
                id="situation"
                placeholder="situação"
                register={register}
                optionsList={["ativo", "inativo", "ativo não calibrável"]}
              />
            </div>
          </div>
        </div>

        <div className="details-section-container">
          <div className="instrument-detail-area">
            <h1 className="detail-title">INSTRUMENTO</h1>
            <BasicInput
              isRequired={true}
              register={register}
              inputType="text"
              inputPlaceholder="descrição"
              inputStyle="classe-large"
              errors={errors}
              inputName="description"
            />

            <BasicInput
              isRequired={true}
              register={register}
              inputType="text"
              inputPlaceholder="código"
              inputStyle="classe-large"
              errors={errors}
              inputName="code"
            />
            <BasicInput
              isRequired={true}
              register={register}
              inputType="text"
              inputPlaceholder="freq. calibração"
              inputStyle="classe-large"
              errors={errors}
              inputName="calibrationFrequency"
            />
            <BasicInput
              isRequired={false}
              register={register}
              inputType="text"
              inputPlaceholder="fabricante"
              inputStyle="classe-large"
              errors={errors}
              inputName="manufacturer"
            />
            <BasicInput
              isRequired={false}
              register={register}
              inputType="text"
              inputPlaceholder="ref. adicional 1"
              inputStyle="classe-large"
              errors={errors}
              inputName="additionalReference1"
            />
            <BasicInput
              isRequired={false}
              register={register}
              inputType="text"
              inputPlaceholder="ref. adicional 2"
              inputStyle="classe-large"
              errors={errors}
              inputName="additionalReference2"
            />
            <BasicInput
              isRequired={false}
              register={register}
              inputType="text"
              inputPlaceholder="ref. adicional 3"
              inputStyle="classe-large"
              errors={errors}
              inputName="additionalReference3"
            />
          </div>
          <div className="other-details-area edit-page">
            <section className="other-details-section">
              <h1 className="detail-title">AQUISIÇÃO</h1>
              <div className="details-section">
                <div style={{ width: "48%" }}>
                  <DateInputInside
                    inputName="acquisitionDate"
                    register={register}
                    inputStyle="classe-little"
                    errors={errors}
                    isRequired={true}
                    placeholder="data aquisição "
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <BasicInput
                    isRequired={false}
                    register={register}
                    inputType="text"
                    inputPlaceholder="inventário"
                    inputStyle="classe-large"
                    errors={errors}
                    inputName="inventory"
                  />
                </div>
                <BasicInputFilter
                  items={allSuppliers}
                  errors={errors}
                  inputName="supplierDescription"
                  inputId="supplier"
                  getValues={getValues}
                  inputPlaceholder="Fornecedor"
                  inputStyle="classe-medium"
                  isRequired={true}
                  register={register}
                  setValue={setValue}
                  isActive={true}
                />

                <div style={{ width: "48%" }}>
                  <BasicInput
                    isRequired={false}
                    register={register}
                    inputType="money"
                    inputPlaceholder="custo de aquisição"
                    inputStyle="classe-large"
                    errors={errors}
                    inputName="acquisitionCost"
                  />
                </div>

                <BasicInput
                  isRequired={false}
                  register={register}
                  inputType="text"
                  inputPlaceholder="número de serie"
                  inputStyle="classe-large"
                  errors={errors}
                  inputName="serieNumber"
                />
              </div>
            </section>

            <section className="other-details-section">
              <h1 className="detail-title">FAMÍLIA</h1>
              <div className="details-section">
                <BasicInputFilter
                  items={allFamilies}
                  errors={errors}
                  inputName="family"
                  inputId="familyID"
                  getValues={getValues}
                  inputPlaceholder="descrição"
                  inputStyle="classe-medium"
                  isRequired={true}
                  register={register}
                  setValue={setValue}
                  isActive={true}
                />

                {familyObject === undefined ? (
                  <>
                    <DetailItem
                      subtitle="código"
                      content={data.familyId.code}
                    />
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
                  </>
                ) : (
                  <>
                    <DetailItem subtitle="código" content={familyObject.code} />
                    <DetailItem
                      subtitle="freq. calibração(família)"
                      content={`${familyObject.calibrationFrequencyInMonths} meses`}
                    />
                    <DetailItem
                      subtitle="contagem calibração"
                      content={
                        familyObject.calibrationTimeCounter === "uso"
                          ? "inicia a partir do uso"
                          : "inicia a partir da calibração"
                      }
                    />
                  </>
                )}
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
                        ? "uso"
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
                  content={data.acquisitionDate}
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
              <div style={{ marginTop: "80px" }}>
                <p>
                  {getValues("situationReason") === "loss"
                    ? "Instrumento inativo por:  perda"
                    : getValues("situationReason") === "nonconformity"
                    ? "Instrumento inativo por: inconformidade"
                    : ""}
                </p>
                <p>
                  {situationReason === "loss"
                    ? "N° WorkOn: "
                    : situationReason === "nonconformity"
                    ? "Nº Análise de risco: "
                    : ""}
                  {situationJustification}
                </p>
              </div>
            </section>
            <div
              style={{
                width: "100%",
                justifyContent: "flex-end",
                display: "flex",
                gap: "10px",
              }}
            >
              <div>
                <Button
                  className="btn btn-md btn-primary-red"
                  onClickFunction={() => {
                    const confirmed = window.confirm(
                      "Tem certeza que deseja sair desta página? Se sair, suas alterações não serão salvas."
                    );
                    if (confirmed) {
                      navigate(`/consult/instrument/${data?.id}`);
                    } else {
                    }
                  }}
                >
                  Cancelar
                </Button>
              </div>
              <div>
                <Button
                  className="btn btn-md btn-tertiary"
                  onClickFunction={handleSubmit(handleConfirm)}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        </div>
        {isPopupActive && (
          <div className="popup-overlay">
            <div className="popup-container">
              <h1 className="detail-title">INATIVAR INSTRUMENTO</h1>
              <SelectInput
                id="situationReason"
                errors={errors}
                optionsList={["perda", "inconformidade"]}
                placeholder="motivo"
                register={register}
              />
              {situationReason !== null && (
                <BasicInput
                  isRequired={true}
                  register={register}
                  inputType="text"
                  inputPlaceholder={
                    situationReason === "loss"
                      ? "Nº WorkOn"
                      : "N° análise de risco"
                  }
                  inputStyle="classe-large"
                  errors={errors}
                  inputName="situationJustification"
                />
              )}
              <div
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <div>
                  <Button
                    className="btn btn-md btn-primary-red"
                    onClickFunction={() => {
                      setValue("situationReason", "");
                      setValue("situationJustification", "");
                      setValue("situation", "active");
                      setIsPopupActive(false);
                    }}
                  >
                    {" "}
                    Cancelar
                  </Button>
                </div>
                <div>
                  <Button
                    className="btn btn-md btn-secondary"
                    onClickFunction={() => {
                      console.log(situationJustification, situationReason);
                      if (!situationJustification || !situationReason) {
                        // Verifica se algum dos campos está vazio ou nulo e define os erros
                        if (!situationJustification) {
                          setError("situationJustification", {
                            type: "custom",
                            message: "Campo obrigatório",
                          });
                        }
                        if (!situationReason) {
                          setError("situationReason", {
                            type: "custom",
                            message: "Campo obrigatório",
                          });
                        }
                      } else {
                        // Se ambos os campos estiverem preenchidos, fecha o popup
                        setIsPopupActive(false);
                      }
                    }}
                  >
                    {" "}
                    Confirmar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default UpdateInstrument;

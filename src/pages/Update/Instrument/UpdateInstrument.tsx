import { useForm } from "react-hook-form";
import {
  BasicInput,
  BasicInputFilter,
  Button,
  DateInput,
  DateInputInside,
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

type FormValues = {
  description: string | undefined;
  code: string | undefined;
  calibrationFrequency: number | undefined;
  manufacturer: string | undefined;
  additionalReference1: string | undefined;
  additionalReference2: string | undefined;
  additionalReference3: string | undefined;
  acquisitionDate: string | undefined;
  inventory: string | undefined;
  supplier: string | undefined;
  serieNumber: string | undefined;
  familyID: string | undefined;
  family: string | undefined;
  supplierDescription: string | undefined;
};

const UpdateInstrument: React.FC = () => {
    const [familyObject, setFamilyObject] = useState<Family | undefined>()
  const instrument = sessionStorage.getItem("instrument");
  const lastMovement = sessionStorage.getItem("movement");
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
    isSuccess,
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
  };

  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
    getValues,
  } = useForm<FormValues>({ defaultValues: initialValues });

  const familyID = watch("familyID");
 

  useEffect(() => {
    console.log("mudou");
    console.log(familyID);
    setFamilyObject(allFamilies?.find((family) => family.id === familyID))
   
  }, [familyID]);

  const formatDate = (date: string) => {
    const [ano, mes, dia] = date.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const getMonth = (date: string) => {
    const mes = date.split("-")[1];
    return mes;
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
            <div>
              <p className="detail-subtitle">situação</p>
              <p className="detail-content">
                {data.situation === "active" ? "ativo" : "inativo"}
              </p>
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
              isRequired={true}
              register={register}
              inputType="text"
              inputPlaceholder="fabricante"
              inputStyle="classe-large"
              errors={errors}
              inputName="manufacturer"
            />
            <BasicInput
              isRequired={true}
              register={register}
              inputType="text"
              inputPlaceholder="ref. adicional 1"
              inputStyle="classe-large"
              errors={errors}
              inputName="additionalReference1"
            />
            <BasicInput
              isRequired={true}
              register={register}
              inputType="text"
              inputPlaceholder="ref. adicional 2"
              inputStyle="classe-large"
              errors={errors}
              inputName="additionalReference2"
            />
            <BasicInput
              isRequired={true}
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
                    isRequired={true}
                    register={register}
                    inputType="text"
                    inputPlaceholder="inventário"
                    inputStyle="classe-large"
                    errors={errors}
                    inputName="additionalReference3"
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
                    isRequired={true}
                    register={register}
                    inputType="money"
                    inputPlaceholder="custo de aquisição"
                    inputStyle="classe-large"
                    errors={errors}
                    inputName="acquisitionCost"
                  />
                </div>

                <BasicInput
                  isRequired={true}
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
                    <DetailItem
                      subtitle="código"
                      content={familyObject.code}
                    />
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
                      lastMovementData.useOutput.receivingResponsible.name
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
                    content={lastMovementData.useOutput.receivingArea}
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
              <h1 className="detail-title">CALIBRAÇÃO</h1>
              <div className="details-section">
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
            <div className="btns-last-section">

            <Button className="btn btn-md btn-primary-red" onClickFunction={(e) => {
               
                const confirmed = window.confirm("Se sair desta tela suas alterações serão perdidas");
                if (confirmed) {
                    navigate(`/consult/instrument/${data?.id}`)
                } else {
                    // Permaneça na tela atual ou realize outras ações
                }
            }} >Cancelar</Button>
            <Button className="btn btn-md btn-tertiary" >Confirmar</Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateInstrument;

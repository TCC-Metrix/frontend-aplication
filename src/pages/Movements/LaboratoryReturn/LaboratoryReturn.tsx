import "./LaboratoryReturn.css";
import { useEffect, useState } from "react";
import {
  Button,
  BasicInputFilter,
  DateInputInside,
  SelectInput,
  BasicInput,
} from "../../../components";
import {
  GeneralInstrument,
  LaboratoryReturnPost,
  RootMovement,
  UseReturnPost,
} from "../../../utils/interfaces/Interfaces";
import {
  useGetLastMovementByIdsLabOutput,
  usePostLaboratoryReturn,
  usePostReturnUse,
} from "../../../services/useMutation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  useAllEmployees,
} from "../../../services/useFetchData";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import request from "axios";
import ModalSearchInstrument from "../../../components/ModalSearchInstrument/ModalSearchInstrument";
import { formatDate } from "../../Consults/Instrument/InstrumentDetails";

export default function LaboratoryReturn() {
  // Estados para controlar o estado dos componentes
  const [isLoadingPostLaboratoryOutput, setIsLoadingPostLaboratoryOutput] =
    useState<boolean>(false);
  const [tableMainPage, setTableMainPage] = useState<GeneralInstrument[]>([]);
  const [movementData, setMovementData] = useState<RootMovement[] | undefined>(
    []
  );
  const [isLoadingLaboratoryOutputData, setIsLoadingLaboratoryOutputData] =
    useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isReloaded, setIsReloaded] = useState<boolean>(false);

  const notify = (type: string, message?: string) => {
    type === "success" &&
      toast.success(message, {
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

  //Abre o modal
  const handleModal = () => {
    // setIsPopupActive(true);
    setOpenModal(true);
  };

  useEffect(() => {
    if (movementData !== undefined && movementData?.length > 0) {
      const mov = movementData[0].laboratoryOutput;
      setValue("laboratory", mov?.laboratory.id);
      setValue("motive", mov?.motive);
      setValue("laboratoryDescription", mov?.laboratory.description);
      setValue("outputDate", mov?.outputDate);
    } else {
      setValue("laboratory", "-");
      setValue("motive", "-");
      setValue("laboratoryDescription", "-");
      setValue("outputDate", "-");
    }
    if (tableMainPage !== undefined && tableMainPage.length > 0) {
      const instrument = tableMainPage[0];
      setValue("instrument", instrument.description);
      setValue("code", instrument.code);
    }
  }, [movementData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  //Hooks de api
  const postLaboratoryReturn = usePostLaboratoryReturn();
  const {
    data: allEmployees,
    isLoading: isLoadingEmployees,
    isError: isErrorEmployees,
  } = useAllEmployees();
  const getMovementByIds = useGetLastMovementByIdsLabOutput();

  const handlePostLaboratoryReturn: SubmitHandler<LaboratoryReturnPost> = (data) => {
    setIsLoadingPostLaboratoryOutput(true);
    postLaboratoryReturn.mutate(data, {
      onSettled: (_, error) => {
        if (error && request.isAxiosError(error)) {
          setIsLoadingPostLaboratoryOutput(false);
          notify("error", "Erro ao processar sua solicitação");
        } else {
          setIsLoadingPostLaboratoryOutput(false);
          notify("success", "Movimentação realizada com sucesso");
          setTableMainPage([]);
          setMovementData([]);
          setIsReloaded(true);
        }
      },
    });
  };

  //Busca os ids dos instrumentos dentro da lista de instrumentos e chama função que envia à api
  const handleConfirmLaboratoryOutput = (data: FieldValues) => {
    const idsList = tableMainPage.map((item) => item.id);

    setIsLoadingPostLaboratoryOutput(false);
    if (idsList.length == 0) {
      notify("error", "Nenhum instrumento selecionado");
      return;
    }

    // const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    // const match = data.returnDate.match(regex);
    // if (match) {
    //   const ano = parseInt(match[1], 10);

    //   if (match[1].length > 4 || isNaN(ano)) {
    //     setError("returnDate", {
    //       type: "invalid",
    //       message: "Ano inválido",
    //     });
    //     return;
    //   } else if (ano < 2000 || ano > 2100) {
    //     setError("returnDate", {
    //       type: "invalid",
    //       message: "Ano está fora do intervalo válido (2000-2100)",
    //     });
    //     return;
    //   } else {
    //     // Limpa qualquer erro existente
    //     clearErrors("returnDate");
    //   }
    // } else {
    //   setError("returnDate", {
    //     type: "invalid",
    //     message: "Formato de data inválido",
    //   });
    //   return;
    // }

    handlePostLaboratoryReturn({
      calibrationCost: data.calibrationCost,
      calibrationDate: data.calibrationDate,
      certificateNumber: data.certificateNumber,
      certificatePath: data.certificatePath,
      conclusion: data.conclusion,
      returnDate: data.returnDate,
      returnResponsible: data.returnResponsible,
      movement: movementData ? movementData[0].movement.id :  ""
    });
  };

  if (isErrorEmployees) {
    return <ErrorPage />;
  }

  if (isLoadingEmployees) {
    return <LoadingPage />;
  }

  const handleConfirmFunction = (selectedInstruments: GeneralInstrument[]) => {
    setIsLoadingLaboratoryOutputData(true);
    getMovementByIds.mutate(
      selectedInstruments.map((instrument) => instrument.id),
      {
        onSettled(data, error) {
          setIsLoadingLaboratoryOutputData(false);
          setMovementData(data?.data);
          if (error) {
            console.error(error);
          }
        },
      }
    );
    setTableMainPage(selectedInstruments);
    setOpenModal(false);
  };

  return (
    <main>
      <div className="container-main">
        <div>
          <h1 className="header-three">Retorno de laboratório</h1>
        </div>

        <div className="form-section-container">
          <div>
            <h3>Instrumento</h3>
            <button
              className="btn btn-tertiary"
              onClick={handleModal}
              style={{ marginBottom: "20px" }}
            >
              <span className="text button-font">Buscar instrumento</span>
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                width: "100%",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div className="input-view-only-container">
                <span className="placeholder">Descrição</span>
                <span className="view-only-value">
                  {tableMainPage.length > 0
                    ? tableMainPage[0].description
                    : "-"}
                </span>
              </div>
              <div className="input-view-only-container">
                <span className="placeholder">Código</span>
                <span className="view-only-value">
                  {tableMainPage.length > 0 ? tableMainPage[0].code : "-"}
                </span>
              </div>
              <div className="input-view-only-container">
                <span className="placeholder">Laboratório</span>
                <span className="view-only-value">
                  {movementData !== undefined && movementData?.length > 0
                    ? movementData[0].laboratoryOutput?.laboratory.description
                    : "-"}{" "}
                  {movementData !== undefined && movementData?.length > 0
                    ? "/ " +
                      movementData[0].laboratoryOutput?.laboratory.calCode
                    : ""}
                </span>
              </div>
              <div className="input-view-only-container">
                <span className="placeholder">Data de saída</span>
                <span className="view-only-value">
                  {movementData !== undefined && movementData?.length > 0
                    ? formatDate(
                        movementData[0].laboratoryOutput
                          ? movementData[0].laboratoryOutput.outputDate
                          : ""
                      )
                    : "-"}
                </span>
              </div>
              <div className="input-view-only-container">
                <span className="placeholder">Motivo</span>
                <span className="view-only-value">
                  {movementData !== undefined &&
                    movementData.length > 0 ?
                    (movementData[0].laboratoryOutput?.motive === "repair"
                      ? "Conserto"
                      : movementData[0].laboratoryOutput?.motive ===
                        "external_calibration"
                      && "Calibração Externa") : "-"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3>Calibração</h3>
            <section className="mov-info-lab-return">


              <DateInputInside
                placeholder="data de retorno"
                inputStyle="little-input"
                register={register}
                inputName="returnDate"
                isRequired={true}
                errors={errors}
              />

              <DateInputInside
                placeholder="data de calibração"
                inputStyle="little-input"
                register={register}
                inputName="calibrationDate"
                isRequired={true}
                errors={errors}
              />

              <BasicInput
                inputType="money"
                inputPlaceholder="custo calibração"
                inputStyle="little-input"
                errors={errors}
                isRequired={false}
                inputName="calibrationCost"
                register={register}
              />
            </section>
          </div>

          <div>
            <h3>Certificado e análise</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                rowGap: "20px",
                flexWrap: "wrap",
              }}
            >
              <BasicInput
                inputType="text"
                inputPlaceholder="Num certificado"
                inputStyle="little-input"
                errors={errors}
                isRequired={false}
                inputName="certificateNumber"
                register={register}
              />

              <BasicInput
                inputType="text"
                inputPlaceholder="Caminho certificado / planilha "
                inputStyle="little-input"
                errors={errors}
                isRequired={false}
                inputName="certificatePath"
                register={register}
              />

              <SelectInput
                id="conclusion"
                optionsList={["conforme", "não conforme"]}
                placeholder="Conclusão"
                register={register}
              />
              <BasicInputFilter
                inputStyle="classe-little"
                inputId="returnResponsible"
                inputName="returnResponsibleDescription"
                items={allEmployees}
                inputPlaceholder="responsável retorno"
                register={register}
                setValue={setValue}
                getValues={getValues}
                isRequired={false}
                errors={errors}
              />
            </div>
          </div>
        </div>

        <div className="m-auto btn-session-confirm">
          <Button
            className="btn btn-secondary btn-lg"
            onClickFunction={handleSubmit(handleConfirmLaboratoryOutput)}
          >
            {isLoadingPostLaboratoryOutput ? (
              <RotatingLines
                visible={true}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                strokeColor="#fff"
                width="20"
              />
            ) : (
              <>Confirmar</>
            )}
          </Button>
        </div>
        <ModalSearchInstrument
          openModal={openModal}
          setFinalInstruments={setTableMainPage}
          setOpenModal={setOpenModal}
          isReloaded={isReloaded}
          setIsReloaded={setIsReloaded}
          status="external calibration"
          handleConfirmFunction={handleConfirmFunction}
          max={1}
        />
      </div>
    </main>
  );
}

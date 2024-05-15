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
  RootMovement,
  UseReturnPost,
} from "../../../utils/interfaces/Interfaces";
import {
  useGetLastMovementByIdsLabOutput,
  usePostReturnUse,
} from "../../../services/useMutation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  useAllEmployees,
  useAllLaboratories,
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

  const headersList = [
    "Código",
    "Descrição",
    "Data de Saída",
    "Motivo",
    "Laboratório",
  ];

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
    setValue(
      "laboratoryDescription",
      movementData !== undefined && movementData?.length > 0
        ? movementData[0].laboratoryOutput?.laboratory.description
        : ""
    );
    setValue(
      "laboratory",
      movementData !== undefined && movementData?.length > 0
        ? movementData[0].laboratoryOutput?.laboratory.id
        : ""
    );
    setValue(
      "laboratoryDescription",
      movementData !== undefined && movementData?.length > 0
        ? movementData[0].laboratoryOutput?.laboratory.description
        : ""
    );
    setValue(
      "outputDate",
      movementData !== undefined && movementData?.length > 0
        ? movementData[0].laboratoryOutput?.outputDate
        : ""
    );
  }, [movementData]);
  console.log(movementData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  //Hooks de api
  const postReturnUseMutation = usePostReturnUse();
  const { data: allLaboratories, isLoading, isError } = useAllLaboratories();
  const {
    data: allEmployees,
    isLoading: isLoadingEmployees,
    isError: isErrorEmployees,
  } = useAllEmployees();
  const getMovementByIds = useGetLastMovementByIdsLabOutput();

  const handlePostLaboratoryOutput: SubmitHandler<UseReturnPost> = (data) => {
    setIsLoadingPostLaboratoryOutput(true);
    postReturnUseMutation.mutate(data, {
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

    handlePostLaboratoryOutput({
      instrumentIds: idsList,
      shippingResponsible: data.shippingResponsible,
      receivingResponsible: data.receivingResponsible,
      shippingArea: data.shippingArea,
      returnDate: data.returnDate,
    });
  };

  if (isError || isErrorEmployees) {
    return <ErrorPage />;
  }

  if (isLoading || isLoadingEmployees) {
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

  // const handleFileChange = (event: any) => {
  //   const file = event.target.files[0];
  //   const fileUrl = URL.createObjectURL(file);
  //   window.open(fileUrl); // Abre o documento quando o usuário seleciona um arquivo
  // };

  return (
    <main>
      <div className="container-main">
        <div>
          <h1 className="header-three">Retorno de laboratório</h1>
          <p className="text">Instrumento</p>
          <Button className="btn btn-tertiary " onClickFunction={handleModal}>
            Adicionar / Editar
          </Button>
        </div>
        <div className="flex-center-table scroll">
          <table className="table-container ">
            <thead>
              <tr className="first-line ">
                {headersList.map((item, index) => {
                  return <th key={index}>{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {isLoadingLaboratoryOutputData ? (
                <td colSpan={5}>
                  <RotatingLines
                    visible={true}
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    strokeColor="#99aebb"
                    width="30"
                  />
                </td>
              ) : (
                <>
                  {movementData && movementData.length > 0 ? (
                    movementData.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <p className="td-text">{tableMainPage[0].code}</p>
                        </td>
                        <td>{tableMainPage[0].description}</td>
                        <td>
                          {formatDate(
                            item.laboratoryOutput
                              ? item.laboratoryOutput.outputDate
                              : "-"
                          )}
                        </td>
                        <td>
                          {item.laboratoryOutput?.motive === "REPAIR"
                            ? "conserto"
                            : "calibração"}
                        </td>
                        <td>{item.laboratoryOutput?.laboratory.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={headersList.length + 1} className="text">
                        Nenhum instrumento selecionado
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="form-section-container">
          <section className="mov-info-lab-return">
            <BasicInputFilter
              inputStyle="classe-large"
              inputId="laboratory"
              inputName="laboratoryDescription"
              items={allLaboratories}
              inputPlaceholder="laboratório"
              register={register}
              setValue={setValue}
              getValues={getValues}
              isRequired={false}
              errors={errors}
            />
            <DateInputInside
              placeholder="data de saída"
              inputStyle="little-input"
              register={register}
              inputName="outputDate"
              isRequired={true}
              errors={errors}
            />

            <SelectInput
              id="motive"
              optionsList={["calibração", "conserto"]}
              placeholder="Motivo"
              register={register}
            />

            <BasicInputFilter
              inputStyle="classe-little"
              inputId="receivingResponsible"
              inputName="receivingResponsibleDescription"
              items={allEmployees}
              inputPlaceholder="responsável recebimento"
              register={register}
              setValue={setValue}
              getValues={getValues}
              isRequired={false}
              errors={errors}
            />

            <DateInputInside
              placeholder="data de retorno"
              inputStyle="medium-input"
              register={register}
              inputName="returnDate"
              isRequired={true}
              errors={errors}
            />

            <DateInputInside
              placeholder="data de calibração"
              inputStyle="medium-input"
              register={register}
              inputName="calibrationDate"
              isRequired={true}
              errors={errors}
            />

            <BasicInput
              inputType="money"
              inputPlaceholder="custo calibração"
              inputStyle="medium-input"
              errors={errors}
              isRequired={false}
              inputName="calibrationCost"
              register={register}
            />

            <BasicInput
              inputType="text"
              inputPlaceholder="Num certificado"
              inputStyle="medium-input"
              errors={errors}
              isRequired={false}
              inputName="certificateNumber"
              register={register}
            />
            <div>
              <p>Anexar certificado</p>
              <div className="custom-file-input">
                <input
                  type="file"
                  id="fileInput"
                  className="input-file-hidden"
        
                />
                <label htmlFor="fileInput" className="custom-button">
                  Escolher arquivo
                </label>
              </div>
            </div>
            
          </section>
        </div>
        <a href="\\bosch.com\dfsrb\dfsbr\loc\po\Dir_Geral\Dir_Tecnica\Qualidade\Metrologia"> aaaa</a>

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

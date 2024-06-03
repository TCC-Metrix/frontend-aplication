import "./UseReturn.css";
import { useState } from "react";
import { Button, BasicInputFilter, DateInputInside } from "../../../components";
import {
  GeneralInstrument,
} from "../../../utils/interfaces/Interfaces";
import {
  useGetLastMovementByIds,
  usePostReturnUse,
} from "../../../services/useMutation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAllAreas, useAllEmployees } from "../../../services/useFetchData";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import request from "axios";
import ModalSearchInstrument from "../../../components/ModalSearchInstrument/ModalSearchInstrument";
import { formatDate } from "../../Consults/Instrument/InstrumentDetails";
import { MovUseOutputData, UseReturnPost } from "../../../utils/interfaces/MovementsInterfaces";
import { msalInstance } from "../../../authSSO/msalInstance";

export const UseReturn = () => {
  // Estados para controlar o estado dos componentes
  const [isLoadingPostUseOutput, setIsLoadingPostUseOutput] =
    useState<boolean>(false);
  const [tableMainPage, setTableMainPage] = useState<GeneralInstrument[]>([]);
  const [movementData, setMovementData] = useState<
    MovUseOutputData[] | undefined
  >([]);
  const [isLoadingUseOutputData, setIsLoadingUseOutputData] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isReloaded, setIsReloaded] = useState<boolean>(false);

  const headersList = [
    "Código",
    "Nome",
    "Data de Saída",
    "Motivo",
    "Colaborador",
    "Área",
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
    getValues,
    watch,
  } = useForm();

  const valueInArea = watch("shippingArea");
  const valueInShippingResponsible = watch("shippingResponsible");

  //Hooks de api
  const postReturnUseMutation = usePostReturnUse(); //posta a saida para uso
  const { data: allEmployees, isLoading, isError } = useAllEmployees(); //busca todos os funcionarios
  const {
    data: allAreas,
    isLoading: isLoadingArea,
    isError: isErrorArea,
  } = useAllAreas(); //busca todas as áreas

  const getMovementByIds = useGetLastMovementByIds();

  const handlePostUseOutput: SubmitHandler<UseReturnPost> = (data) => {
    setIsLoadingPostUseOutput(true);
    postReturnUseMutation.mutate(data, {
      onSettled: (_, error) => {
        if (error && request.isAxiosError(error)) {
          setIsLoadingPostUseOutput(false);
          notify("error", "Erro ao processar sua solicitação");
        } else {
          setIsLoadingPostUseOutput(false);
          notify("success", "Movimentação realizada com sucesso");
          setValue("returnDate", new Date().toISOString().split('T')[0]);
          setValue("shippingResponsible", "");
          setValue("shippingResponsibleDescription", "");
          setValue("receivingResponsibleDescription", "");
          setValue("receivingResponsible", "");
          setValue("shippingArea", "");
          setValue("areaDescription", "");
          setTableMainPage([]);
		  setMovementData([])
          setIsReloaded(true);
        }
      },
    });
  };

  //Busca os ids dos instrumentos dentro da lista de instrumentos e chama função que envia à api
  const handleConfirmUseOutput = (data: FieldValues) => {
    const idsList = tableMainPage.map((item) => item.id);


    setIsLoadingPostUseOutput(false);
    if (idsList.length == 0) {
      notify("error", "Nenhum instrumento selecionado");
      return;
    }

    if (
      (valueInArea === "" || valueInArea === undefined) &&
      (valueInShippingResponsible === "" ||
        valueInShippingResponsible === undefined)
    ) {
      notify("error", "Informe ao menos uma área ou responsável de entrega");
      return;
    }

    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = data.returnDate.match(regex);
    if (match) {
      const ano = parseInt(match[1], 10);

      if (match[1].length > 4 || isNaN(ano)) {
        setError("returnDate", {
          type: "invalid",
          message: "Ano inválido",
        });
        return;
      } else if (ano < 2000 || ano > 2100) {
        setError("returnDate", {
          type: "invalid",
          message: "Ano está fora do intervalo válido (2000-2100)",
        });
        return;
      } else {
        // Limpa qualquer erro existente
        clearErrors("returnDate");
      }
    } else {
      setError("returnDate", {
        type: "invalid",
        message: "Formato de data inválido",
      });
      return;
    }

    console.log(msalInstance.getActiveAccount()?.idToken)

    handlePostUseOutput({
      instrumentIds: idsList,
      shippingResponsible: data.shippingResponsible,
      receivingResponsible: data.receivingResponsible,
      shippingArea: data.shippingArea,
      returnDate: data.returnDate,
    });
  };

  if (isError || isErrorArea) {
    return <ErrorPage />;
  }

  if (isLoading || isLoadingArea) {
    return <LoadingPage />;
  }

  const handleConfirmFunction = (selectedInstruments: GeneralInstrument[]) => {
    setIsLoadingUseOutputData(true);
    getMovementByIds.mutate(
      selectedInstruments.map((instrument) => instrument.id),
      {
        onSettled(data, error) {
          setIsLoadingUseOutputData(false);
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
          <h1 className="header-three">Retorno de uso</h1>
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
              {isLoadingUseOutputData ? (
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
                        <td className="text">
                          <p className="td-text">{item.code}</p>
                        </td>
                        <td>{item.description}</td>
                        <td>{formatDate(item.outputDate)}</td>
                        <td>{item.reason}</td>
                        <td>{item.employee !== null ? item.employee : "-"}</td>
                        <td>{item.area !== null ? item.area : "-"}</td>
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
          <section className="mov-info">
            <div className="form-column">
              <div className="inputs-responsible">
                <BasicInputFilter
                  inputStyle="classe-large"
                  inputId="shippingResponsible"
                  inputName="shippingResponsibleDescription"
                  items={allEmployees}
                  inputPlaceholder="responsável entrega"
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  isRequired={false}
                  errors={errors}
                  isActive={
                    valueInArea !== "" && valueInArea !== undefined
                      ? false
                      : true
                  }
                />
              </div>
              <div>
                <BasicInputFilter
                  inputStyle="classe-large"
                  inputId="receivingResponsible"
                  inputName="receivingResponsibleDescription"
                  items={allEmployees}
                  inputPlaceholder="responsável recebimento"
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  isRequired={false} //undefined
                  errors={errors}
                  isActive={true}
                />
              </div>
            </div>
            <div className="form-column">
              <div>
                <BasicInputFilter
                  inputStyle="classe-large"
                  inputId="shippingArea"
                  inputName="areaDescription"
                  items={allAreas}
                  inputPlaceholder="área"
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  isRequired={false} // ""
                  errors={errors}
                  isActive={
                    valueInShippingResponsible !== "" &&
                    valueInShippingResponsible !== undefined
                      ? false
                      : true
                  }
                />
              </div>
              <div>
                <DateInputInside
                  placeholder="data de saída"
                  inputStyle="large-input"
                  register={register}
                  inputName="returnDate"
                  isRequired={true}
                  errors={errors}
                />
              </div>
            </div>
          </section>
          <div></div>
        </div>
        <div className="m-auto btn-session-confirm">
          <Button
            className="btn btn-secondary btn-lg"
            onClickFunction={handleSubmit(handleConfirmUseOutput)}
          >
            {isLoadingPostUseOutput ? (
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
          status="in%20use"
          handleConfirmFunction={handleConfirmFunction}
        />
      </div>
    </main>
  );
};

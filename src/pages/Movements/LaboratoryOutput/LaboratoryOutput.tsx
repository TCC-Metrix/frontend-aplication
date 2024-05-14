import "./LaboratoryOutput.css";
import { useState } from "react";
import {
  Button,
  BasicInputFilter,
  DateInputInside,
  SelectInput,
} from "../../../components";
import {
  GeneralInstrument,
  LaboratoryPost,
} from "../../../utils/interfaces/Interfaces";
import { usePostLaboratoryOutput } from "../../../services/useMutation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {  useAllEmployees, useAllLaboratories } from "../../../services/useFetchData";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import request from "axios";
import ModalSearchInstrument from "../../../components/ModalSearchInstrument/ModalSearchInstrument";
import { formatDate } from "../../Consults/Instrument/InstrumentDetails";

export const LaboratoryOutput = () => {
  // Estados para controlar o estado dos componentes
  const [isLoadingPost, setIsLoadingPost] =
    useState<boolean>(false);
  const [tableMainPage, setTableMainPage] = useState<GeneralInstrument[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isReloaded, setIsReloaded] = useState<boolean>(false);


  const headersList = [
    "Código",
    "Descrição",
    "Família",
    "Freq. Calibração",
    "Próx. Calibração",
  ];

  const notify = (type: string, message?: string) => {
    type === "success" &&
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
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
  } = useForm();


  //Hooks de api
  const postLaboratoryOutput = usePostLaboratoryOutput(); 
  const { data: allEmployees, isLoading, isError } = useAllEmployees(); //busca todos os funcionarios
  const {
    data: allLaboratories,
    isLoading: isLoadingLaboratories,
    isError: isErrorLaboratories,
  } = useAllLaboratories(); //busca todas as áreas

  const handlePostLaboratoryOutput: SubmitHandler<LaboratoryPost> = (data) => {
    setIsLoadingPost(true);
    postLaboratoryOutput.mutate(data, {
      onSettled: (data, error) => {
        if (error && request.isAxiosError(error)) {
          setIsLoadingPost(false);
          notify("error", "Erro ao processar sua solicitação");
        } else {
          setIsLoadingPost(false);
          setTableMainPage([]);
          notify("success", "Movimentação realizada com sucesso")
          console.log(data);
          setValue("shippingResponsible", "")
          setValue("shippingResponsibleDescription", "")
          setValue("laboratory", "")
          setValue("laboratoryDescription", "")
          setValue("outputDate", new Date().toISOString().split('T')[0])
          setIsReloaded(true);
        }
      },
    });
  };

  //Busca os ids dos instrumentos dentro da lista de instrumentos e chama função que envia à api
  const handleConfirmLabOutput = (data: FieldValues) => {
    const idsList = tableMainPage.map((item) => item.id);

    setIsLoadingPost(true);

    setIsLoadingPost(false);
    if (idsList.length == 0) {
      notify("error", "Nenhum instrumento selecionado");
      return;
    }




    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = data.outputDate.match(regex);
    if (match) {
      const ano = parseInt(match[1], 10);

      if (match[1].length > 4 || isNaN(ano)) {
        setError("outputDate", {
          type: "invalid",
          message: "Ano inválido",
        });
        return;
      } else if (ano < 2000 || ano > 2100) {
        setError("outputDate", {
          type: "invalid",
          message: "Ano está fora do intervalo válido (2000-2100)",
        });
        return;
      } else {
        // Limpa qualquer erro existente
        clearErrors("outputDate");
      }
    } else {
      setError("outputDate", {
        type: "invalid",
        message: "Formato de data inválido",
      });
      return;
    }

    handlePostLaboratoryOutput({
      instrumentIds: idsList,
      shippingResponsible: data.shippingResponsible,
      laboratory: data.laboratory,
      motive: data.motive,
      outputDate: data.outputDate,
    });
  };

  if (isError || isErrorLaboratories) {
    return <ErrorPage />;
  }

  if (isLoading || isLoadingLaboratories) {
    return <LoadingPage />;
  }



  return (
    <main>
      <div className="container-main">
        <div>
          <h1 className="header-three">Saída para laboratório</h1>
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
              {tableMainPage.length > 0 ? (
                tableMainPage.map((item, index) => (
                  <tr key={index}>
                    <td className="text">
                      <p className="td-text">{item.code}</p>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.familyId.description}</td>
                    <td>{item.calibrationFrequency}</td>
                    <td>
                      {item.nextCalibration
                        ? formatDate(item.nextCalibration)
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headersList.length + 1} className="text">
                    Nenhum instrumento encontrado
                  </td>
                </tr>
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
                  isRequired={true}
                  errors={errors}
                  isActive={true}
                />
              </div>
              <div>
                <BasicInputFilter
                  inputStyle="classe-large"
                  inputId="laboratory"
                  inputName="laboratoryDescription"
                  items={allLaboratories}
                  inputPlaceholder="laboratório"
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  isRequired={true} //undefined
                  errors={errors}
                />
              </div>
            </div>
            <div className="form-column">
              <div >
                <SelectInput
                  id="motive"
                  optionsList={["calibração", "conserto"]}
                  placeholder="Motivo"
                  register={register}
                  style="full"
                />
              </div>
              <div>
                <DateInputInside
                  placeholder="data de saída"
                  inputStyle="large-input"
                  register={register}
                  inputName="outputDate"
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
            onClickFunction={handleSubmit(handleConfirmLabOutput)}
          >
            {isLoadingPost ? (
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
          situation="active"
        />
      </div>
    </main>
  );
};

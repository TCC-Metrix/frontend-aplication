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

    setValue(
      "instrument",
      tableMainPage !== undefined && tableMainPage?.length > 0
        ? tableMainPage[0].description
        : ""
    );
    setValue(
      "code",
      tableMainPage !== undefined && tableMainPage?.length > 0
        ? tableMainPage[0].code
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
        </div>

        <div className="form-section-container">
          <div>
            <h3>Instrumento</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <Button
                className="btn btn-tertiary btn-sm"
                onClickFunction={handleModal}
              >
                Adicionar / Editar
              </Button>
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
                  {tableMainPage.length > 0
                    ? tableMainPage[0].description
                    : "-"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3>Calibração</h3>
            <section className="mov-info-lab-return">
              <BasicInputFilter
                inputStyle="classe-little"
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
            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
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
                inputPlaceholder="Caminho certificado"
                inputStyle="little-input"
                errors={errors}
                isRequired={false}
                inputName="certificatePath"
                register={register}
              />
              <BasicInput
                inputType="text"
                inputPlaceholder="Caminho planilha de análise"
                inputStyle="little-input"
                errors={errors}
                isRequired={false}
                inputName="certificatePath"
                register={register}
              />
                <SelectInput
                id="conclusion"
                optionsList={["calibração", "conserto"]}
                placeholder="Conclusão"
                register={register}
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

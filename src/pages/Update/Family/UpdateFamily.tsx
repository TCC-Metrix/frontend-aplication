import { useNavigate } from "react-router-dom";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { BasicInput, Button, RadioInput } from "../../../components";
import { Family } from "../../../utils/interfaces/Interfaces";
import { FieldValues, useForm } from "react-hook-form";
import { useUpdateFamily } from "../../../services/useMutation";
import { toast } from "react-toastify";

type FormValues = {
  description: string | undefined;
  code: string | undefined;
  calibrationFrequencyInMonths: number | undefined;
  calibrationTimeCounter: string | undefined;
};

function UpdateFamily() {
  const family = sessionStorage.getItem("family");
  let familyData: Family | null = null;
  if (family) {
    familyData = JSON.parse(family);
  } else {
    return <ErrorPage />;
  }

  const putFamily = useUpdateFamily(familyData?.id)


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("calibrationTimeCounter", event.target.value)
  };

  const initialValues: FormValues = {
    description: familyData?.description,
    code: familyData?.code,
    calibrationFrequencyInMonths: familyData?.calibrationFrequencyInMonths,
    calibrationTimeCounter: familyData?.calibrationTimeCounter,
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ defaultValues: initialValues });

  const notify = (type: string, message?: string) => {
    type === "success" &&
      toast.success("Família atualizada com sucesso", {
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
  const handleConfirm = (data: FieldValues) => {
    putFamily.mutate(data, {
        onSettled: (_, error) => {
            if(error){
                notify("error")
            }else{
                notify("success")
                navigate(`/consult/family/${familyData?.id}`)
            }
        }
    })
  }


  const navigate = useNavigate();

  return (
    <div className="details-general-container">
      <div className="details-general-box">
        <h1 className="detail-title">Família</h1>
        <div className="details-section" style={{ columnGap: "12px" }}>
          <BasicInput
            errors={errors}
            inputName="description"
            inputPlaceholder="descrição"
            inputStyle="large-input"
            isRequired
            inputType="text"
            register={register}
          />
          <BasicInput
            errors={errors}
            inputName="code"
            inputPlaceholder="código"
            inputStyle="medium-input"
            isRequired
            inputType="text"
            register={register}
          />
          <BasicInput
            errors={errors}
            inputName="calibrationFrequencyInMonths"
            inputPlaceholder="frequência de calibração"
            inputStyle="medium-input"
            isRequired
            inputType="number"
            register={register}
          />
        </div>
        <div>
          <h3 className="text-major">Contagem do tempo de calibração</h3>
          <div className="flex-row-direction-family-register">
            <RadioInput
              title="Inicia a partir do uso"
              name="calibrationFrequency"
              value="uso"
              id="uso"
              onChange={handleRadioChange}
              defaultChecked={familyData?.calibrationTimeCounter === "uso"}
              
            />
            <RadioInput
              title="Inicia a partir da data de calibração"
              name="calibrationFrequency"
              value="calibracao"
              id="calibracao"
              onChange={handleRadioChange}
              defaultChecked={familyData?.calibrationTimeCounter === "calibracao"}
              
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "50px",
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
                navigate(`/edit/family/${familyData?.id}`);
              }}
            >
              Cancelar
            </Button>
          </div>
          <div>
            <Button
              className="btn btn-md btn-secondary"
              onClickFunction={handleSubmit(handleConfirm)}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateFamily;

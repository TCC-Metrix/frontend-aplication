import { useNavigate } from "react-router-dom";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { BasicInput, Button } from "../../../components";
import { GeneralLaboratory } from "../../../utils/interfaces/Interfaces";
import { FieldValues, useForm } from "react-hook-form";
import { useUpdateLaboratory } from "../../../services/useMutation";
import { toast } from "react-toastify";

type FormValues = {
  calCode: string | undefined;
  description: string | undefined;
}

function UpdateLaboratory() {
  const laboratory = sessionStorage.getItem("laboratory");
  let laboratoryData: GeneralLaboratory | null = null;
  if (laboratory) {
    laboratoryData = JSON.parse(laboratory);
  } else {
    return <ErrorPage/>
  }

  const putLaboratory = useUpdateLaboratory(laboratoryData?.id)

  const initialValues: FormValues = {
    calCode: laboratoryData?.calCode,
    description: laboratoryData?.description,
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialValues });

  const notify = (type: string, message?: string) => {
    type === "success" &&
    toast.success("Funcionário atualizado com sucesso", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    })

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
        theme: "light"
      }
    )
  }
  const handleConfirm = (data: FieldValues) => {
    putLaboratory.mutate(data, {
        onSettled: (_, error) => {
            if(error){
                notify("error")
            }else{
                notify("success")
                navigate(`/consult/laboratory/${laboratoryData?.id}`)
            }
        }
    })
  }

  const navigate = useNavigate();

  return (
    <div className="details-general-container">
      <div className="details-general-box">
        <h1 className="detail-title">Laboratório</h1>
        <div className="details-section">
          <BasicInput
            errors={errors}
            inputName="calCode"
            inputPlaceholder="Cal. Code"
            inputStyle="medium-input"
            isRequired
            inputType="text"
            register={register}
          />
          <BasicInput 
            errors={errors}
            inputName="description"
            inputPlaceholder="Descrição"
            inputStyle="medium-input"
            isRequired
            inputType="text"
            register={register}
          />
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
                navigate(`/edit/laboratory/${laboratoryData?.id}`)
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
  )
}

export default UpdateLaboratory
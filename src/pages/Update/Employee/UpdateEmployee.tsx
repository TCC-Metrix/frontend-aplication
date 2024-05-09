import { useNavigate } from "react-router-dom";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { BasicInput, Button } from "../../../components";
import { GeneralEmployee } from "../../../utils/interfaces/Interfaces";
import { FieldValues, useForm } from "react-hook-form";
import { useUpdateEmployee } from "../../../services/useMutation";
import { toast } from "react-toastify";

type FormValues = {
  name: string | undefined;
  sector: string | undefined;
  email: string | undefined;
}

function UpdateEmployee() {
  const employee = sessionStorage.getItem("employee");
  let employeeData: GeneralEmployee | null = null;
  if (employee) {
    employeeData = JSON.parse(employee);
  } else {
    return <ErrorPage/>
  }

  const putEmployee = useUpdateEmployee(employeeData?.id)

  const initialValues: FormValues = {
    name: employeeData?.name,
    sector: employeeData?.sector,
    email: employeeData?.email,
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
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
    putEmployee.mutate(data, {
        onSettled: (_, error) => {
            if(error){
                notify("error")
            }else{
                notify("success")
                navigate(`/consult/employee/${employeeData?.id}`)
            }
        }
    })
  }

  const navigate = useNavigate();

  return (
    <div className="details-general-container">
      <div className="details-general-box">
        <h1 className="detail-title">Funcionário</h1>
        <div className="details-section">
          <BasicInput
            errors={errors}
            inputName="name"
            inputPlaceholder="nome"
            inputStyle="medium-input"
            isRequired
            inputType="text"
            register={register}
          />
          <BasicInput 
            errors={errors}
            inputName="sector"
            inputPlaceholder="setor"
            inputStyle="medium-input"
            isRequired
            inputType="text"
            register={register}
          />
          <BasicInput
            errors={errors}
            inputName="email"
            inputPlaceholder="email"
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
                navigate(`/edit/employee/${employeeData?.id}`)
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

export default UpdateEmployee
import { useNavigate } from "react-router-dom";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { BasicInput, Button } from "../../../components";
import { GeneralSupplier } from "../../../utils/interfaces/Interfaces";
import { FieldValues, useForm } from "react-hook-form";
import { useUpdateSupplier } from "../../../services/useMutation";
import { toast } from "react-toastify";

type FormValues = {
  name: string | undefined;
  cnpj: string | undefined;
}

function UpdateSupplier() {
  const supplier = sessionStorage.getItem("supplier");
  let supplierData: GeneralSupplier | null = null;
  if (supplier) {
    supplierData = JSON.parse(supplier);
  } else {
    return <ErrorPage/>
  }

  const putSupplier = useUpdateSupplier(supplierData?.id)

  const initialValues: FormValues = {
    name: supplierData?.name,
    cnpj: supplierData?.cnpj,
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
    putSupplier.mutate(data, {
        onSettled: (_, error) => {
            if(error){
                notify("error")
            }else{
                notify("success")
                navigate(`/consult/supplier/${supplierData?.id}`)
            }
        }
    })
  }

  const navigate = useNavigate();

  return (
    <div className="details-general-container">
      <div className="details-general-box">
        <h1 className="detail-title">Fornecedor</h1>
        <div className="details-section">
          <BasicInput
            errors={errors}
            inputName="name"
            inputPlaceholder="Nome"
            inputStyle="medium-input"
            isRequired
            inputType="name"
            register={register}
          />
          <BasicInput 
            errors={errors}
            inputName="cnpj"
            inputPlaceholder="Cnpj"
            inputStyle="medium-input"
            isRequired
            inputType="cnpj"
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
                const confirmed = window.confirm(
                  "Tem certeza que deseja sair desta página? Se sair, suas alterações não serão salvas."
                );
                if (confirmed) {
                  navigate(`/consult/supplier/${supplierData?.id}`);
                } else {
                }
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

export default UpdateSupplier
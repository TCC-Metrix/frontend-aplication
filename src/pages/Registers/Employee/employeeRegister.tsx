import "./EmployeeRegister.css"
import { BasicInput, Button } from "../../../components"
import { useNavbarStore, usePopupStore } from "../../../store"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm} from "react-hook-form"
import { z } from "zod"
import { RotatingLines } from "react-loader-spinner"
import { EmployeeRegisterPost } from "../../../utils/interfaces/Interfaces"
import { usePostEmployeeRegister } from "../../../services/useMutation"
import { useState } from "react"

const schema = z.object({
  name: z
    .string()
    .min(1, "Campo obrigatorio")
    .refine((value) => !/^\s+$/.test(value), {
      message: "Nome não pode conter apenas espaços em branco",
    }),
  edv: z
    .string()
    .min(1, "Campo obrigatório")
    .refine((value) => !/^\s+$/.test(value), {
      message: "EDV não pode conter apenas espaços em branco",
    })
    .transform((value) => parseInt(value)),
  email: z
    .string()
    .min(1, "Campo obrigatorio")
    .refine((value) => !/^\s+$/.test(value), {
      message: "Email não pode conter apenas espaços em branco",
    }),
  sector: z
    .string()
    .min(1, "Campo obrigatorio")
    .refine((value) => !/^\s+$/.test(value), {
      message: "Setor não pode conter apenas espaços em branco",
    })
})

type FormFields = z.infer<typeof schema>

const EmployeeRegister = () => {
  const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar)
  const setPopupType = usePopupStore((state) => state.setPopupType)
  const setPopupBody = usePopupStore((state) => state.setPopupBody)
  const setPopupTitle = usePopupStore((state) => state.setPopupTitle)
  const setIsPopupActive = usePopupStore((state) => state.setIsPopupActive)
  const setPopupFunction = usePopupStore((state) => state.setPopupFunction)
  const [isLoadingPostEmployeeRegister, setIsLoadingPostEmployeeRegister] =
    useState<boolean>(false)
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<FormFields>({ resolver: zodResolver(schema) })

  const createPopup = (
    type: string,
    title: string,
    body: string,
    btnFunction: () => void
  ) => {
    setPopupType(type);
    setPopupTitle(title);
    setPopupBody(body);
    setPopupFunction(() => {
      setPopupBody("");
      setPopupTitle("");
      setPopupType("none");
      btnFunction();
    });
    setIsPopupActive(true);
  };

  const postEmployeeMutation = usePostEmployeeRegister();
  const handlePostEmployeeRegister: SubmitHandler<EmployeeRegisterPost> = (
    data
  ) => {
    setIsLoadingPostEmployeeRegister(true);
    postEmployeeMutation.mutate(data, {
      onSettled: (data, error) => {
        if (error) {
          setTimeout(() => {
            setIsLoadingPostEmployeeRegister(false);
            console.error("Ocorreu um erro:", error);
            createPopup(
              "error",
              "Erro interno do servidor",
              "Estamos com problemas em nosso servidor, tente novamente",
              () => {
                setIsPopupActive(false)
              }
            );
          }, 1000);
          return;
        } else {
          console.log(data)
          setIsLoadingPostEmployeeRegister(false)
          createPopup(
            "feedback",
            "Movimentação realizada com sucesso",
            "",
            () => {
              setIsPopupActive(false);
            }
          );
        }
      },
    });
  };

  const handleConfirmEmployeeRegister = (dataApi: z.infer<typeof schema>) => {
    setIsLoadingPostEmployeeRegister(true)
    setTimeout(() => {
      setIsLoadingPostEmployeeRegister(false)

      const data = {
        name: dataApi.name,
        edv: dataApi.edv,
        email: dataApi.email,
        sector: dataApi.sector,
      }

      handlePostEmployeeRegister(data)
    }, 1000)
  }

  return (
    <>
      <div
        className="main-container-employee-register-page"
        onClick={() => {
          setActiveNavbar(false)
        }}
      >
        <div className="main-content-employee-page">
          <div className="title-employee-register-page">
            <h1 className="header-three">Cadastro: Funcionário</h1>
          </div>
          <form className="main-form">
            <BasicInput
              errors={errors}
              isRequired={true}
              inputName="name"
              inputPlaceholder="nome"
              inputStyle="large-input"
              inputType="text"
              register={register}
            />
            <BasicInput
              errors={errors}
              isRequired={true}
              inputName="email"
              inputPlaceholder="email"
              inputStyle="large-input"
              inputType="text"
              register={register}
            />
            <div className="flex-form-line-inputs-employee-register">
              <BasicInput
                errors={errors}
                isRequired={true}
                inputName="edv"
                inputPlaceholder="edv"
                inputStyle="medium-input"
                inputType="number"
                register={register}
              />
              <BasicInput
                errors={errors}
                isRequired={true}
                inputName="sector"
                inputPlaceholder="setor"
                inputStyle="medium-input"
                inputType="text"
                register={register}
              />
            </div>
            <div className="btn-confirm-employee-page">
              <Button
                onClickFunction={handleSubmit(handleConfirmEmployeeRegister)}
                className="btn btn-secondary"
              >
                {isLoadingPostEmployeeRegister ? (
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
          </form>
        </div>
      </div>
    </>
  )
}

export default EmployeeRegister
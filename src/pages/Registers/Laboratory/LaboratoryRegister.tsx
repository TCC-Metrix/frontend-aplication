import "./LaboratoryRegister.css";
import { BasicInput, Button } from "../../../components";
import { useNavbarStore } from "../../../store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { RotatingLines } from "react-loader-spinner";
import { LaboratoryRegisterPost } from "../../../utils/interfaces/Interfaces";
import { usePostLaboratoryRegister } from "../../../services/useMutation";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import request from "axios";

const schema = z.object({
  description: z
    .string()
    .min(1, "Campo obrigatorio")
    .refine((value) => !/^\s+$/.test(value), {
      message: "Nome não pode conter apenas espaços em branco",
    }),
  calibrationCode: z
    .string()
    .min(1, "Campo obrigatorio")
    .refine((value) => !/^\s+$/.test(value), {
      message: "Campo obrigatório",
    })
    .transform((value) => parseInt(value)),
});

type FormFields = z.infer<typeof schema>;

const LaboratoryRegister = () => {
  const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
  const [isLoadingPostLaboratoryRegister, setIsLoadingPostLaboratoryRegister] =
    useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const notify = (type: string, message?: string) => {
    type === "success" &&
      toast.success("Laboratório registrado com sucesso", {
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
      toast.error(`${message ? message : "Erro interno no servidor"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  };

  const postLaboratoryMutation = usePostLaboratoryRegister();

  const handlePostLaboratoryRegister: SubmitHandler<LaboratoryRegisterPost> = (
    data
  ) => {
    setIsLoadingPostLaboratoryRegister(true);
    postLaboratoryMutation.mutate(data, {
      onSettled: (error) => {
        setIsLoadingPostLaboratoryRegister(false);
        if (error && request.isAxiosError(error)) {
          const errorAxios = error as AxiosError;
          if (errorAxios.response?.data) {
            if (error.response?.data === 409) {
              notify(
                "error",
                "Laboratório com este código já está cadastrado."
              );
              return;
            }
          }
          console.error("Ocorreu um erro:", error);
          notify("error");
          return;
        } else {
          setIsLoadingPostLaboratoryRegister(false);
          reset();
          notify("success");
        }
      },
    });
  };

  const handleConfirmLaboratoryRegister = (dataApi: z.infer<typeof schema>) => {
    setIsLoadingPostLaboratoryRegister(true);

    setIsLoadingPostLaboratoryRegister(false);

    const data = {
      name: dataApi.description,
      calCode: dataApi.calibrationCode,
    };

    handlePostLaboratoryRegister(data);
  };

  return (
    <div
      className="background-container-main"
      onClick={() => {
        setActiveNavbar(false);
      }}
    >
      <div className="main-container-laboratory-register-page">
        <div className="main-content-laboratory-page">
          <div className="title-laboratory-register-page">
            <h1 className="header-three">Cadastro: Laboratório</h1>
          </div>
          <form className="main-form">
            <BasicInput
              errors={errors}
              isRequired={true}
              inputName="description"
              inputPlaceholder="descrição"
              inputStyle="large-input"
              inputType="text"
              register={register}
            />
            <BasicInput
              errors={errors}
              isRequired={true}
              inputName="calibrationCode"
              inputPlaceholder="codigo cal"
              inputStyle="large-input"
              inputType="text"
              register={register}
            />
            <div className="btn-confirm-laboratory-page">
              <Button
                onClickFunction={handleSubmit(handleConfirmLaboratoryRegister)}
                className="btn btn-secondary"
              >
                {isLoadingPostLaboratoryRegister ? (
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
    </div>
  );
};

export default LaboratoryRegister;

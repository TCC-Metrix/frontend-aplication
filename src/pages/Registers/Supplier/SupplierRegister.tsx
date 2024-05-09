import "./Supplier.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInput, Button } from "../../../components";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavbarStore } from "../../../store";
import { usePostSupplierRegister } from "../../../services/useMutation";
import { SupplierRegisterPost } from "../../../utils/interfaces/Interfaces";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { z } from "zod";
import {  toast } from "react-toastify";
import { AxiosError } from "axios";
import request from "axios";

const schema = z.object({
  name: z
    .string()
    .min(1, "Campo obrigatorio")
    .refine((value) => !/^\s+$/.test(value), {
      message: "Nome não pode conter apenas espaços em branco",
    }),
  cnpj: z
    .string()
    .transform((value) => value.replace(/[^\d]/g, "")) // Remove caracteres não numéricos
    .refine((value) => value.length === 14, {
      message: "CNPJ deve conter exatamente 14 dígitos",
    }),
});

type FormFields = z.infer<typeof schema>;

const SupplierRegister = () => {
  const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);

  const [isLoadingPostSupplierRegister, setIsLoadingPostSupplierRegister] =
    useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const notify = (type: string, message?: string) => {
    type === "success" &&
      toast.success("Fornecedor registrado com sucesso", {
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

  const postSupplierMutation = usePostSupplierRegister();

  const handlePostSupplierRegister: SubmitHandler<SupplierRegisterPost> = (
    data
  ) => {
    setIsLoadingPostSupplierRegister(true);
    postSupplierMutation.mutate(data, {
      onSettled: (data, error) => {
        setIsLoadingPostSupplierRegister(false);
        if (error && request.isAxiosError(error)) {
          const errorAxios = error as AxiosError;
          if (errorAxios.response?.data) {
            if (error.response?.status === 409) {
              notify("error", "Fornecedor com este CNPJ já está cadastrado.");
              return;
            }
          }
          notify("error", "Erro ao processar a solicitação.");
        } else {
          // Se não houver erro, assumimos que a solicitação foi bem-sucedida
          console.log("Dados do fornecedor:", data);
          notify("success");
          reset();
          setValue("cnpj", "")
        }
      },
    });
  };

  const handleConfirmSupplierRegister = (dataApi: z.infer<typeof schema>) => {
    console.log(dataApi.cnpj);

    setIsLoadingPostSupplierRegister(true);

    setIsLoadingPostSupplierRegister(false);

    const data = {
      name: dataApi.name,
      cnpj: dataApi.cnpj,
    };

    handlePostSupplierRegister(data);

   
  };

  return (
    <div
      className="background-container-main"
      onClick={() => {
        setActiveNavbar(false);
      }}
    >
      <div className="main-container-supplier-register-page">
        <div className="main-content-supplier-page">
          <div className="title-supplier-register-page">
            <h1 className="header-three">Cadastro: Fornecedor</h1>
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
              inputName="cnpj"
              inputPlaceholder="cnpj"
              inputStyle="large-input"
              inputType="text"
              register={register}
            />
            <div className="btn-confirm-supplier-page">
              <Button
                onClickFunction={handleSubmit(handleConfirmSupplierRegister)}
                className="btn btn-secondary"
              >
                {isLoadingPostSupplierRegister ? (
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

export default SupplierRegister;

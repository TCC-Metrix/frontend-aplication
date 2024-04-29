import { useForm } from "react-hook-form";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import {
  BasicInput,
  SelectInput,
  DateInputInside,
  ExpandableInput,
  BasicInputFilter,
  Button,
} from "../../../components";
import "./InstrumentRegister.css";
import {
	useAllFamilies,
	useAllSuppliers,
} from "../../../services/useFetchData";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { usePostInstrument } from "../../../services/useMutation";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavbarStore } from "../../../store";


const InstrumentRegister = () => {
  const [isLoadingInstrument, setIsLoadingInstrument] =
    useState<boolean>(false);

  const notify = (type: string) => {
    
    type === "success" && (
      toast.success('Instrumento registrado com sucesso', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    )

    type === "error" && (
      toast.error('Erro interno do servidor', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    )
    };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
    clearErrors,
    setError,
    getValues,
    reset
  } = useForm();



  const postInstrument = usePostInstrument();

  useEffect(() => {
    function handleKeyPress(event: any) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    }

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);



  const onSubmit = (data: FieldValues) => {
    // console.log(data);
    const additionalReferences = [];
    if (data.additionalReference1 !== "") {
      additionalReferences.push(data.additionalReference1);
    }

		return () => {
			document.removeEventListener("keypress", handleKeyPress);
		};
	}, []);

	const onSubmit = async (data: FieldValues) => {
		// console.log(data);
		const additionalReferences = [];
		if (data.additionalReference1 !== "") {
			additionalReferences.push(data.additionalReference1);
		}

		if (data.additionalReference2 !== "") {
			additionalReferences.push(data.additionalReference2);
		}
      
    if (data.additionalReference3 !== "") {
      additionalReferences.push(data.additionalReference3);
    }

    additionalReferences.length === 0
      ? (data.additionalReferences = null)
      : (data.additionalReferences = additionalReferences);

    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = data.acquisitionDate.match(regex);
    if (match) {
      const ano = parseInt(match[1], 10);

      if (match[1].length > 4 || isNaN(ano)) {
        setError("acquisitionDate", {
          type: "invalid",
          message: "Ano inválido",
        });
      } else if (ano < 2000 || ano > 2100) {
        setError("acquisitionDate", {
          type: "invalid",
          message: "Ano está fora do intervalo válido (2000-2100)",
        });
      } else {
        // Limpa qualquer erro existente
        clearErrors("acquisitionDate");
      }
    } else {
      setError("acquisitionDate", {
        type: "invalid",
        message: "Formato de data inválido",
      });
    }
    handlePostInstrument(data);
  };



  const {
    data: allFamilies,
    isLoading: isLoadingFamilies,
    isError: isErrorFamilies,
  } = useAllFamilies(); //busca todos as familias
  const {
    data: allSuppliers,
    isLoading: isLoadingSuppliers,
    isError: isErrorSuppliers,
  } = useAllSuppliers(); //busca todos as familias

			if (match[1].length > 4 || isNaN(ano)) {
				setError("acquisitionDate", {
					type: "invalid",
					message: "Ano inválido",
				});
			} else if (ano < 2000 || ano > 2100) {
				setError("acquisitionDate", {
					type: "invalid",
					message: "Ano está fora do intervalo válido (2000-2100)",
				});
			} else {
				// Limpa qualquer erro existente
				clearErrors("acquisitionDate");
			}
		} else {
			setError("acquisitionDate", {
				type: "invalid",
				message: "Formato de data inválido",
			});
		}
		console.log(data);
		handlePostUseOutput(data);
	};

	const {
		data: allFamilies,
		isLoading: isLoadingFamilies,
		isError: isErrorFamilies,
	} = useAllFamilies(); //busca todos as familias
	const {
		data: allSuppliers,
		isLoading: isLoadingSuppliers,
		isError: isErrorSuppliers,
	} = useAllSuppliers(); //busca todos as familias

	

  const handlePostInstrument: SubmitHandler<FieldValues> = (data) => {
    setIsLoadingInstrument(true)
    postInstrument.mutate(data, {
      onSettled: (data, error) => {
        if (error) {
          setIsLoadingInstrument(false)
          notify("error")
          return;
        } else {
          setIsLoadingInstrument(false)
          notify("success");
          reset()
          resetField("acquisitionCost")
          console.log(data);
        }
      },
    });
  };

if (isLoadingSuppliers || isLoadingFamilies) {
		return <LoadingPage />;
	}

	if (isErrorFamilies || isErrorSuppliers) {
		return <ErrorPage />;
	}

  return (
    <>
      <div className="main-container-instrument-register-page">
        <div className="text-header">
          <h1 className="header-three">Cadastrar instrumento</h1>
        </div>
        <div className="main-content">
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
            <div className="flex-form-line">
              <BasicInput
                inputPlaceholder="código"
                inputStyle="little-input"
                inputType="text"
                errors={errors}
                isRequired={true}
                inputName="code"
                register={register}
              />
              <BasicInput
                inputPlaceholder="número de série"
                inputStyle="little-input"
                inputType="text"
                errors={errors}
                isRequired={false}
                inputName="serieNumber"
                register={register}
              />
              <BasicInput
                inputPlaceholder="inventário"
                inputStyle="little-input"
                errors={errors}
                isRequired={true}
                inputName="inventory"
                register={register}
                inputType="text"
              />
            </div>
            <div className="flex-form-line">
              <DateInputInside
                placeholder="data de aquisição"
                inputStyle="medium-input"
                register={register}
                inputName="acquisitionDate"
                isRequired={true}
                errors={errors}
              />
              <BasicInputFilter
                inputStyle="classe-medium"
                inputId="supplier"
                inputName="supplierDescription"
                items={allSuppliers}
                inputPlaceholder="fornecedor"
                register={register}
                setValue={setValue}
                getValues={getValues}
                isRequired={true}
                errors={errors}
              />
            </div>
            <BasicInput
              inputPlaceholder="fabricante"
              inputStyle="large-input"
              errors={errors}
              isRequired={false}
              inputType="text"
              inputName="manufacturer"
              register={register}
            />
            <BasicInputFilter
              inputStyle="classe-large"
              inputId="familyID"
              inputName="familyDescription"
              items={allFamilies}
              inputPlaceholder="família"
              register={register}
              setValue={setValue}
              getValues={getValues}
              isRequired={true}
              errors={errors}
            />
            <div className="flex-form-line">
              <BasicInput
                inputPlaceholder="critério de aceitação"
                inputStyle="little-input"
                errors={errors}
                isRequired={false}
                inputType="text"
                inputName="acceptanceCriteria"
                register={register}
              />
              <BasicInput
                inputPlaceholder="unidade de medida"
                inputStyle="little-input"
                errors={errors}
                isRequired={false}
                inputType="text"
                inputName="measurementUnit"
                register={register}
              />
              <SelectInput
                placeholder="situação"
                optionsList={["ativo", "inativo"]}
                id="situation"
                register={register}
              />
            </div>
            <div className="flex-form-line">
              <BasicInput
                inputType="money"
                inputPlaceholder="custo de aquisição"
                inputStyle="medium-input"
                errors={errors}
                isRequired={false}
                inputName="acquisitionCost"
                register={register}
              />
              <BasicInput
                inputPlaceholder="centro de custo"
                inputStyle="medium-input"
                errors={errors}
                isRequired={false}
                inputType="text"
                inputName="costCenter"
                register={register}
              />
            </div>
            <ExpandableInput
              register={register}
              errors={errors}
              resetField={resetField}
            />
            <Button
              onClickFunction={handleSubmit(onSubmit)}
              className="btn btn-secondary btn-lg"
            >
              {isLoadingInstrument ? (
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
            <ToastContainer/>
          </form>
        </div>
      </div>
    </>
  );
};

export default InstrumentRegister;

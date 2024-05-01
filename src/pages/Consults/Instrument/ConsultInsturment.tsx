import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SelectInput, BasicInput, Button } from "../../../components";
import "./ConsultInstrument.css";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { useEffect, useState } from "react";
import { useGetInstrumentBy } from "../../../services/useMutation";
import { GeneralInstrument, SearchPattern } from "../../../utils/interfaces/Interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import instance from "../../../services/axiosInstance";
import { RootFilter } from "../../../utils/interfaces/Interfaces";
import { RotatingLines } from "react-loader-spinner";
// import { IoFilter } from "react-icons/io5";





function ConsultInsturment() {


	const [instrumentsFiltered, setInstrumentsFiltered] = useState<GeneralInstrument[] | undefined>()
	const {
		register,
		formState: { errors },
		getValues,
		watch,
		handleSubmit,
	} = useForm();







	function calculateNextPage(pageable: RootFilter): number | null {

		if (pageable.pageable.pageNumber < pageable.totalPages) {
			return pageable.pageable.pageNumber + 1
		}

		return null;
	}


	const fetchInstruments = async (pageParam = 0): Promise<RootFilter> => {
		const response = await instance.get(`/instrument/all?page=${pageParam}&size=20&sortBy=acquisitionDate&sortDirection=desc`);
		return response.data;
	};








	const {
		fetchNextPage,
		fetchPreviousPage,
		isFetching,
		hasNextPage,
		hasPreviousPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		isLoading,
		isError,
		data,
		isSuccess
	} = useInfiniteQuery({
		queryKey: ["instruments"],
		queryFn: ({ pageParam }) => fetchInstruments(pageParam),
		// refetchOnWindowFocus: false,
		initialPageParam: 0,
		getNextPageParam: (firstPage) => {
			// console.log("firstPage", firstPage)
			return calculateNextPage(firstPage)
		}


	})

	const instruments = data?.pages.flatMap((item) => item.content)












	const headersList = ["Código", "Descrição", "Família", "Status", "Data de aquisição"];

	const getInstrumentBy = useGetInstrumentBy();



	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		return <ErrorPage />;
	}

	const fetchInstrumentsFiltered = async (pageParam = 0, status: string, situation: string, column: string, value: string, sortedBy: string): Promise<RootFilter> => {
		const response = await instance.get(`/instrument/deepfilter?status=${status === "todos" ? "" : status}&situation=${situation === "todos" ? "" : situation}&column=${column}&value=${value}&sortedBy=${sortedBy}&page=${pageParam}&size=20`);
		return response.data;
	};

	const handleSubmitSearch = async (data: FieldValues) => {
		console.log(data)
		if(data.status === "todos" && data.situation === "todos" && data.sortedBy === "desc" && data.value.length === 0){
			setInstrumentsFiltered(instruments)
		}
		const data2 = await fetchInstrumentsFiltered(0, data.status, data.situation, data.column, data.value, data.sortedBy)
		setInstrumentsFiltered(data2.content)
	}



	return (
		<div className="consult-page">
			<div className="box-shadow-container">
				<div className="box-shadow-container-header">
					<h1 className="header-three">Instrumentos</h1>
					<p className="normal-text">Filtrar por</p>
					<div className="search-area">

				
						<SelectInput
							placeholder="Buscar por"
							optionsList={[
								"descrição",
								"família",
								"código",
							]}
							id="column"
							register={register}
						/>
						<BasicInput
							register={register}
							inputName="value"
							inputPlaceholder="Busque por isso "
							inputStyle="large-input"
							isRequired={false}
							inputType="text"
							errors={errors}
						/>
						
		
				
						<SelectInput id="situation" optionsList={["todos","ativo", "inativo"]} register={register} placeholder="situação" />
						<SelectInput id="status" optionsList={["todos", "em uso", "calibração externa", "disponível"]} register={register} placeholder="status" />
						<SelectInput id="sortedBy" optionsList={["mais recente", "mais antigo"]} register={register} placeholder="data de aquisição" />
			
					<Button className="btn btn-sm btn-tertiary" onClickFunction={handleSubmit(handleSubmitSearch)}> Pesquisar </Button>
					</div>
					
					

				</div>

				<div className="box-shadow-container-table-area">
					<div className="table-container-main">
						<table className="table-container">
							<thead>
								<tr className="first-line">
									{headersList.map((item, index) => {
										return <th key={index}>{item}</th>;
									})}
								</tr>
							</thead>
							<tbody>
								{instrumentsFiltered === undefined && isSuccess ? instruments?.map((item: GeneralInstrument, index) => {
									return (
										<tr key={index} className="tr-hover">
											<td className="text">
												<p className="td-text">{item.code}</p>
											</td>
											<td>{item.description}</td>
											<td>{item.familyId.description}</td>
											<td>

												{item.status === "in use" && "Em uso"}
												{item.status === "available" && "Disponível"}
											</td>
											<td>{item.acquisitionDate}</td>
										</tr>
									);
								}) : instrumentsFiltered?.map((item, index) => {
									return (
										<tr key={index} className="tr-hover">
											<td className="text">
												<p className="td-text">{item.code}</p>
											</td>
											<td>{item.description}</td>
											<td>{item.familyId.description}</td>
											<td>

												{item.status === "in use" && "Em uso"}
												{item.status === "available" && "Disponível"}
											</td>
											<td>{item.acquisitionDate}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					{isFetching && <div className="loading-area">
						<RotatingLines
							visible={true}
							strokeWidth="5"
							animationDuration="0.75"
							ariaLabel="rotating-lines-loading"
							strokeColor="#99aebb"
							width="50"
						/></div>}

					<button onClick={() => fetchNextPage()}>Load More</button>
				</div>
			</div>
		</div>
	);
}

export default ConsultInsturment;

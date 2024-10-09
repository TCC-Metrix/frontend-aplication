import { FieldValues, useForm } from "react-hook-form";
import {
	SelectInput,
	BasicInput,
	Button,
	BasicInputFilter,
} from "../../../components";
import "./ConsultInstrument.css";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { GeneralInstrument } from "../../../utils/interfaces/Interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import instance from "../../../services/axiosInstance";
import { RootFilter } from "../../../utils/interfaces/Interfaces";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAllFamilies } from "../../../services/useFetchData";
import { formatDate } from "./InstrumentDetails";

function ConsultInstrument() {
	const [isFamilyInput, setIsFamilyInput] = useState(false);
	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
		getValues,
		setValue,
	} = useForm();
	const navigate = useNavigate();

	const column = watch("column");

	useEffect(() => {
		setValue("value", "");
		setValue("valueDescription", "");
	}, [column]);

	let filterData = {
		status: watch("status"),
		situation: watch("situation"),
		column: watch("column"),
		value: watch("value"),
		sortedBy: watch("sortedBy"),
		enabled: false,
	};

	const searchTerm = watch("column");

	useEffect(() => {
		if (searchTerm === "familyID") {
			setIsFamilyInput(true);
		} else {
			setIsFamilyInput(false);
		}
	}, [searchTerm]);

	//fetchs function
	const fetchInstruments = async (pageParam = 0): Promise<RootFilter> => {
		const response = await instance.get(
			`/instrument/all?page=${pageParam}&size=15&sortBy=acquisitionDate&sortDirection=desc`
		);
		return response.data;
	};

	const fetchInstrumentsFiltered = async (
		pageParam = 0
	): Promise<RootFilter> => {
		const response = await instance.get(
			`/instrument/deepfilter?status=${
				filterData.status === "todos" ? "" : filterData.status
			}&situation=${
				filterData.situation === "todos" ? "" : filterData.situation
			}&column=${filterData.column}&value=${filterData.value}&sortedBy=${
				filterData.sortedBy
			}&page=${pageParam}&size=15`
		);
		return response.data;
	};

	function calculateNextPage(pageable: RootFilter): number | null {
		if (pageable.pageable.pageNumber < pageable.totalPages) {
			return pageable.pageable.pageNumber + 1;
		}

		return null;
	}

	const {
		data: allFamilies,
		isLoading: isLoadingFamilies,
		isError: isErrorFamilies,
	} = useAllFamilies();
	//queryFunctions

	const {
		data: dataFilter,
		refetch,
		fetchNextPage: fetchNextFilteredPage,
		hasNextPage: hasNextFilteredPage,
		isLoading: isLoadingFiltered,
		isError: isErrorFiltered,
	} = useInfiniteQuery({
		queryKey: ["instrumentsFiltered"],
		queryFn: ({ pageParam }) => fetchInstrumentsFiltered(pageParam),
		initialPageParam: 0,
		getNextPageParam: (firstPage) => {
			return calculateNextPage(firstPage);
		},
		enabled: filterData.enabled,
	});

	const {
		fetchNextPage,
		isFetching,
		isLoading,
		hasNextPage,
		isError,
		data,
		isSuccess,
	} = useInfiniteQuery({
		queryKey: ["instruments"],
		queryFn: ({ pageParam }) => fetchInstruments(pageParam),
		refetchOnWindowFocus: false,
		initialPageParam: 0,
		getNextPageParam: (firstPage) => {
			return calculateNextPage(firstPage);
		},
	});

	const instruments = useMemo(
		() => data?.pages.flatMap((item) => item.content),
		[data]
	);
	let instrumentsFiltered = useMemo(
		() => dataFilter?.pages.flatMap((item) => item.content),
		[dataFilter]
	);

	const headersList = [
		"Código",
		"Descrição",
		"Família",
		"Status",
		"Data de aquisição",
	];

	if (isLoading || isLoadingFiltered || isLoadingFamilies) {
		return <LoadingPage />;
	}

	if (isError || isErrorFiltered || isErrorFamilies) {
		return <ErrorPage />;
	}

	const handleSubmitSearch = async (data: FieldValues) => {
		console.log(data);
		if (
			data.status === "todos" &&
			data.situation === "todos" &&
			data.sortedBy === "desc" &&
			data.value === ""
		) {
			console.log("entrou");
			console.log(instruments);
			instrumentsFiltered = instruments;
		}

		if (data.status === "" && data.situation === "") {
			return;
		}

		filterData.enabled = true;

		if (data.column === "familyID") {
			if (data.value === "") {
				return;
			}
		}
		refetch();
	};

	return (
		<div className="consult-page">
			<div className="box-shadow-container">
				<div className="box-shadow-container-header">
					<h1 className="header-three">Instrumentos</h1>
					<p className="normal-text">Filtrar por</p>
					<div className="search-area">
						<SelectInput
							placeholder="Buscar por"
							optionsList={["código", "descrição", "família"]}
							id="column"
							register={register}
						/>
						{isFamilyInput ? (
							<BasicInputFilter
								register={register}
								inputName="valueDescription"
								inputPlaceholder="Busque por familia"
								inputStyle="classe-large"
								isRequired={false}
								inputId="value"
								items={allFamilies}
								getValues={getValues}
								setValue={setValue}
								errors={errors}
							/>
						) : (
							<BasicInput
								register={register}
								inputName="value"
								inputPlaceholder="Busque por isso "
								inputStyle="large-input"
								isRequired={false}
								inputType="text"
								errors={errors}
							/>
						)}

						<SelectInput
							id="situation"
							optionsList={[
								"todos",
								"ativo",
								"inativo",
								"ativo não calibrável",
							]}
							register={register}
							placeholder="situação"
						/>
						<SelectInput
							id="status"
							optionsList={[
								"todos",
								"em uso",
								"calibração externa",
								"disponível",
							]}
							register={register}
							placeholder="status"
						/>
						<SelectInput
							id="sortedBy"
							optionsList={["mais recente", "mais antigo"]}
							register={register}
							placeholder="data de aquisição"
						/>

						<Button
							className="btn btn-sm btn-tertiary"
							onClickFunction={handleSubmit(handleSubmitSearch)}
						>
							{" "}
							Pesquisar{" "}
						</Button>
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
								{instrumentsFiltered === undefined && isSuccess
									? instruments?.map((item: GeneralInstrument, index) => {
											return (
												<tr
													key={index}
													className="tr-hover"
													onClick={() => {
														navigate(`/consult/instrument/${item.id}`);
													}}
												>
													<td className="text">
														<p className="td-text">{item.code}</p>
													</td>
													<td>{item.description}</td>
													<td>{item.familyId.description}</td>
													<td>
														{item.status === "in use" && "Em uso"}
														{item.status === "available" && "Disponível"}
														{item.status === "external calibration" &&
															"calibração externa"}
													</td>
													<td>{formatDate(item.acquisitionDate)}</td>
												</tr>
											);
									  })
									: instrumentsFiltered?.map((item, index) => {
											return (
												<tr
													key={index}
													className="tr-hover"
													onClick={() =>
														navigate(`/consult/instrument/${item.id}`)
													}
												>
													<td className="text">
														<p className="td-text">{item.code}</p>
													</td>
													<td>{item.description}</td>
													<td>{item.familyId.description}</td>
													<td>
														{item.status === "in use" && "Em uso"}
														{item.status === "available" && "Disponível"}
														{item.status === "external calibration" &&
															"calibração externa"}
													</td>
													<td>{formatDate(item.acquisitionDate)}</td>
												</tr>
											);
									  })}
							</tbody>
						</table>
					</div>
					{isFetching && (
						<div className="loading-area">
							<RotatingLines
								visible={true}
								strokeWidth="5"
								animationDuration="0.75"
								ariaLabel="rotating-lines-loading"
								strokeColor="#99aebb"
								width="50"
							/>
						</div>
					)}
					<div className="load-more-area">
						{(hasNextPage === true &&
							instrumentsFiltered === undefined &&
							instruments !== undefined &&
							instruments.length >= 15) ||
						(hasNextFilteredPage === true &&
							instrumentsFiltered !== undefined &&
							instrumentsFiltered.length >= 15) ? (
							<Button
								className="btn btn-md btn-secondary"
								onClickFunction={() =>
									instrumentsFiltered !== undefined
										? fetchNextFilteredPage()
										: fetchNextPage()
								}
							>
								ver mais
							</Button>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}


export default ConsultInstrument;

import { SubmitHandler, useForm } from "react-hook-form";
import { SelectInput } from "../../../components";
import { BasicInput } from "../../../components";
import "./ConsultInstrument.css";
import { useAllInstruments } from "../../../services/useFetchData";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { useEffect, useState } from "react";
import { useGetInstrumentBy } from "../../../services/useMutation";
import { GeneralInstrument, SearchPattern } from "../../../utils/interfaces/Interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import instance from "../../../services/axiosInstance";
import { RootFilter } from "../../../utils/interfaces/Interfaces";



  

function ConsultInsturment() {


  const [instrumentsFiltered, setInstrumentsFiltered] = useState<GeneralInstrument[] | undefined>([])
	const {
		register,
		formState: { errors },
    getValues,
    watch
	} = useForm();

  const searchTerm = watch("searchTerm");
  const searchType = getValues("searchFor")

  const handleSearch: SubmitHandler<SearchPattern> = (data) => {
		getInstrumentBy.mutate(data, {
			onSettled: (data, error) => {
				if (error) {
					console.error("Ocorreu um erro:", error);
					return;
				}
				const instruments = data?.data;
        setInstrumentsFiltered(instruments)
				
				console.log(instruments)
			},
		});
	};



  
function calculateNextPage(pageable: RootFilter): number | null {
  
  if(pageable.pageable.pageNumber < pageable.totalPages){
    return pageable.pageable.pageNumber + 1
  }

  return null;
}


const fetchInstruments = async ({ pageParam = `/instrument/all?page=0&size=5` }): Promise<RootFilter> => {
  const response = await instance.get(`${pageParam}`);
  return response.data;
};

  const {
    data ,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery<RootFilter, Error>({
    queryKey: ["instruments"],
    queryFn: fetchInstruments,
    getNextPageParam: (lastPage) => calculateNextPage(lastPage),
  });

  const instruments = data?.pages[0].content

  useEffect(() => {console.log(instruments)}, [instruments])






  // const {
	// 	data: allInstruments,
	// 	isLoading: isLoadingInstruments,
	// 	isError: isErrorInstruments,
	// } = useAllInstruments();



  // useEffect(() => {
  //     handleSearch({
	// 			column: "description",
	// 			value: searchTerm,
	// 			secondColumn: "status",
	// 			secondValue: "",
	// 		})
    
	// }, [searchTerm]);



	const headersList = ["Código", "Descrição", "Família", "Status"];

  const getInstrumentBy = useGetInstrumentBy();



	// if (isLoadingInstruments) {
	// 	return <LoadingPage />;
	// }

	// if (isErrorInstruments) {
	// 	return <ErrorPage />;
	// }


  


  

	return (
		<div className="consult-page">
			<div className="box-shadow-container">
				<div className="box-shadow-container-header">
					<h1 className="header-three">Pesquisar instrumento</h1>

					<div className="box-shadow-container-inputs-area">
						<SelectInput
							placeholder="Buscar por"
							optionsList={[
								"descrição",
								"situação",
								"status",
								"família",
								"código",
							]}
							id="searchFor"
							register={register}
						/>
						<BasicInput
							register={register}
							inputName="searchTerm"
							inputPlaceholder="Busque por isso "
							inputStyle="classe-large"
							isRequired={true}
							inputType="text"
							errors={errors}
						/>
					</div>
				</div>
				<div className="box-shadow-container-table-area">
					<div className="table-container-main">
						<table className="table-container">
							<thead>
								<tr className="first-line">
									{headersList.map((item) => {
										return <th>{item}</th>;
									})}
								</tr>
							</thead>
							<tbody>
								{instruments?.map((item: GeneralInstrument) => {
									return (
										<tr className="tr-hover">
											<td className="text">
												<p className="td-text">{item.code}</p>
											</td>
											<td>{item.description}</td>
											<td>{item.familyId.description}</td>
											<td>
												{item.status === "in use" && "Em uso"}
												{item.status === "available" && "Disponível"}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
          {isFetching && <div>Fetching...</div>}
          {isFetchingNextPage && <div>Loading more...</div>}
          <button onClick={() => fetchNextPage()}>Load More</button>
				</div>
			</div>
		</div>
	);
}

export default ConsultInsturment;

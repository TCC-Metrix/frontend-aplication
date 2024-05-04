import { useQueryClient } from "@tanstack/react-query";
import { useInstrumentById } from "../../../services/useFetchData";
import ErrorPage from "../../ErrorPage/ErrorPage";
import LoadingPage from "../../LoadingPage/LoadingPage";
import "./InstrumentDetails.css"
import { useParams } from "react-router-dom"



const InstrumentDetails = () => {
  const { id } = useParams()

    const { data, isLoading, error } = useInstrumentById(id);

    function getObjectFromCache(key: string  ) {
        const queryClient = useQueryClient();
        return queryClient.getQueryData([key]);
      }

      console.log(getObjectFromCache("instrument"))

  if (isLoading) return <LoadingPage/>;
  if (error) return <ErrorPage/>;


    return (
    <div className="details-container">
        <div className="details-section-container">
            <div className="instrument-detail-area">
                <h1 className="title-dark-blue">INSTRUMENTO</h1>
                <p>{data?.description}</p>
            </div>
            <div className="other-details-area"></div>

        </div>
    </div>
  )
}

export default InstrumentDetails
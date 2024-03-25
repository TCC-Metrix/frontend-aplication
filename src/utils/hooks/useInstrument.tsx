import { useQuery } from "@tanstack/react-query";
import instance from "../../services/axiosInstance";

const fetchAllInstruments = async () => {
    const response = await instance.get('/instruments/all')
    return response?.data?.data
}


export function useAllInstruments(){
    const query = useQuery({
        queryFn: fetchAllInstruments,
        queryKey: ['instruments']
    })

    return query;
}
import { useMutation } from "@tanstack/react-query";
import { getInstrumentBySome } from "./api";
import { SearchPattern } from "../utils/interfaces/Interfaces";


export function useGetInstrumentBy(){
    return useMutation({
        mutationFn: (data: SearchPattern) => getInstrumentBySome(data),
        onMutate: () => {
        },
        onError: () => {
        },
        onSettled(data, error, variables, context) {
            console.log(data?.data)
        }
    })
}
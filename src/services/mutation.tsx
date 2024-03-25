import { useMutation } from "@tanstack/react-query";
import { getInstrumentBySome } from "./api";
import { SearchPattern } from "../utils/interfaces/Interfaces";


export function useGetInstrumentBy(){
    return useMutation({
        mutationFn: (data: SearchPattern) => getInstrumentBySome(data),
        onMutate: () => {
            console.log('mutata')
        },
        onError: () => {
            console.log("error")
        },
        onSettled(data, error, variables, context) {
            console.log('settled')
            console.log(data?.data)
        }
    })
}
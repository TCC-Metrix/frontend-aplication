import { useMutation } from "@tanstack/react-query";
import { getInstrumentBySome } from "./api";
import { SearchPattern } from "../utils/interfaces/Interfaces";



//Função que faz um POST na API para retornar os instrumentos de acordo com o filtro
export function useGetInstrumentBy(){
    return useMutation({
        mutationFn: (data: SearchPattern) => getInstrumentBySome(data),
        onMutate: () => {
        },
        onError: () => {
        },
        onSettled(data, error, variables, context) {
        }
    })
}
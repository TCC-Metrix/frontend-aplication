import { useMutation } from "@tanstack/react-query";
import { getInstrumentBySome, postInstrument, postOutputUse } from "./apiService";
import { InstrumentToPost, OutputUsePost, SearchPattern } from "../utils/interfaces/Interfaces";



//Função que faz um POST na API para retornar os instrumentos de acordo com o filtro
export function useGetInstrumentBy(){
    return useMutation({
        mutationFn: (data: SearchPattern) => getInstrumentBySome(data),
        onMutate: () => {
        },
        onError: () => {
        },
        onSettled() {
        }
    })
}

export function usePostOutputUse(){
    return useMutation({
        mutationFn: (data: OutputUsePost) => {
            return postOutputUse({
                instrumentIds: data.instrumentIds,
                area: data.area,
                shippingResponsible: data.shippingResponsible,
                receivingResponsible: data.receivingResponsible,
                outputDate: data.outputDate
            })},

    })
}


export function usePostInstrument(){
    return useMutation({
        mutationFn: (data: InstrumentToPost) => {
            return postInstrument(data)},
    })
}
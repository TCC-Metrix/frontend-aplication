import { useQueries, useQuery } from "@tanstack/react-query";
import { getInstrumentById, getInstruments } from "./api";
import { GeneralInstrument } from "../utils/interfaces/Interfaces";



//Pega todos os instrumentos
export function useAllInstruments() {
  return useQuery({
    queryKey: ["instruments"],
    queryFn: getInstruments,
    refetchOnWindowFocus: false,
  })
}

//Pega os instrumentos através dos ids
export function useInstrument(ids: (string | undefined)[] | undefined){
   return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["instruments", id],
        queryFn: () => getInstrumentById(id!)
      }
    })
   })
}

//Pega o  instrumento através do id
export function useInstrumentById(id: string | undefined) {
  return useQuery({
    queryKey: ["instrument", id],
    queryFn: () => getInstrumentById(id!),
    refetchOnWindowFocus: false,
  })
}
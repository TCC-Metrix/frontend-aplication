import { useQueries, useQuery } from "@tanstack/react-query";
import { getInstrumentById, getInstruments } from "./api";


//Retorna todos os instrumentos da API
export function useAllInstruments() {
  return useQuery({
    queryKey: ["instruments"],
    queryFn: getInstruments,
    refetchOnWindowFocus: false,
  })
}

//Retorna todos os intrumentos através do ID
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

//Retorna somente um instrumento através do ID
export function useInstrumentById(id: string | undefined) {
  return useQuery({
    queryKey: ["instrument", id],
    queryFn: () => getInstrumentById(id!),
    refetchOnWindowFocus: false,
  })
}
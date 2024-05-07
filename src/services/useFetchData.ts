import { useQuery } from "@tanstack/react-query";
import { getArea, getEmployees, getInstrumentById, getInstruments, getFamilies, getSuppliers, getInstrumentsFiltered, getLastMovement, getAllMovements } from "./apiService";


//Retorna todos os instrumentos da API
export function useAllInstruments() {
  return useQuery({
    queryKey: ["instruments"],
    queryFn: getInstruments,
    refetchOnWindowFocus: false,
  })
}

//Retorna todos os instrumentos da API
export function useAllEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
    refetchOnWindowFocus: false,
  })
}
//Retorna todos os instrumentos da API
export function useAllAreas() {
  return useQuery({
    queryKey: ["areas"],
    queryFn: getArea,
    refetchOnWindowFocus: false,
  })
}

//Retorna todas as famílias
export function useAllFamilies() {
  return useQuery({
    queryKey: ["famiies"],
    queryFn: getFamilies,
    refetchOnWindowFocus: false
  })
}

//Retorna todos os fornecedores
export function useAllSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
    refetchOnWindowFocus: false
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

//Retorna somente um instrumento através do ID
export function useMovementsByInstrument(id: string | undefined) {
  return useQuery({
    queryKey: ["all-movements", id],
    queryFn: () => getAllMovements(id!),
    refetchOnWindowFocus: false,
  })
}

export function useLastMovementByInstrument(id: string | undefined) {
  return useQuery({
    queryKey: ["last-movement", id],
    queryFn: () => getLastMovement(id!),
    refetchOnWindowFocus: false,
  })
}


export function useInstrumentDeepFiltered(pageParam = 0, status: string, situation: string, column: string, value: string, sortedBy: string){
  return useQuery({
    queryKey: ["instrumentFiltered"],
    queryFn: () => getInstrumentsFiltered(pageParam , status, situation, column, value, sortedBy),
    refetchOnWindowFocus: false,
  })
}
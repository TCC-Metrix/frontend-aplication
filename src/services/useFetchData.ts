import { useQuery } from "@tanstack/react-query";
import { getArea, getEmployees, getInstrumentById, getInstruments, getFamilies, getSuppliers, getInstrumentsFiltered, getLastMovement, getAllMovements, getFamilyFiltered, getFamilyById, getEmployeeFiltered, getEmployeeById, getSupplierFiltered, getLaboratories, getLaboratoryFiltered, getLaboratoryById, getSupplierById, getLastCalibration, getCalibrations } from "./apiService";
import { FieldValues } from "react-hook-form";

//Retorna todos os instrumentos da API
export function useAllInstruments() {
	return useQuery({
		queryKey: ["instruments"],
		queryFn: getInstruments,
		refetchOnWindowFocus: false,
	});
}

//Retorna todos os instrumentos da API
export function useAllEmployees() {
	return useQuery({
		queryKey: ["employees"],
		queryFn: getEmployees,
		refetchOnWindowFocus: false,
	});
}
//Retorna todos os instrumentos da API
export function useAllAreas() {
	return useQuery({
		queryKey: ["areas"],
		queryFn: getArea,
		refetchOnWindowFocus: false,
	});
}

//Retorna todas as famílias
export function useAllFamilies() {
	return useQuery({
		queryKey: ["families"],
		queryFn: getFamilies,
		refetchOnWindowFocus: false,
	});
}

//Retorna todos os fornecedores
export function useAllSuppliers() {
	return useQuery({
		queryKey: ["suppliers"],
		queryFn: getSuppliers,
		refetchOnWindowFocus: false,
	});
}

export function useAllLaboratories() {
	return useQuery({
		queryKey: ["laboratories"],
		queryFn: getLaboratories,
		refetchOnWindowFocus: false,
	});
}

export function useSupplierFiltered(data: FieldValues, isEnabled: boolean) {
	return useQuery({
		queryKey: ["supplier-filtered"],
		queryFn: () => getSupplierFiltered(data),
		refetchOnWindowFocus: false,
		enabled: isEnabled,
	});
}
export function useLaboratoryFiltered(data: FieldValues, isEnabled: boolean) {
	return useQuery({
		queryKey: ["laboratory-filtered"],
		queryFn: () => getLaboratoryFiltered(data),
		refetchOnWindowFocus: false,
		enabled: isEnabled,
	});
}

export function useFamilyFiltered(data: FieldValues, isEnabled: boolean) {
	return useQuery({
		queryKey: ["family-filtered"],
		queryFn: () => getFamilyFiltered(data),
		refetchOnWindowFocus: false,
		enabled: isEnabled,
	});
}

export function useEmployeeFiltered(data: FieldValues, isEnabled: boolean) {
	return useQuery({
		queryKey: ["employee-filtered"],
		queryFn: () => getEmployeeFiltered(data),
		refetchOnWindowFocus: false,
		enabled: isEnabled,
	});
}

export function useFamilyById(id: string | undefined) {
	return useQuery({
		queryKey: ["family", id],
		queryFn: () => getFamilyById(id),
		refetchOnWindowFocus: false,
	});
}

export function useEmployeeById(id: string | undefined) {
	return useQuery({
		queryKey: ["employee", id],
		queryFn: () => getEmployeeById(id),
		refetchOnWindowFocus: false,
	});
}

export function useLaboratoryById(id: string | undefined) {
	return useQuery({
		queryKey: ["laboratory", id],
		queryFn: () => getLaboratoryById(id),
		refetchOnWindowFocus: false,
	});
}
export function useSupplierById(id: string | undefined) {
	return useQuery({
		queryKey: ["supplier", id],
		queryFn: () => getSupplierById(id),
		refetchOnWindowFocus: false,
	});
}

//Retorna somente um instrumento através do ID
export function useInstrumentById(id: string | undefined) {
	return useQuery({
		queryKey: ["instrument", id],
		queryFn: () => getInstrumentById(id!),
		refetchOnWindowFocus: false,
	});
}

//Retorna somente um instrumento através do ID
export function useMovementsByInstrument(id: string | undefined) {
	return useQuery({
		queryKey: ["all-movements", id],
		queryFn: () => getAllMovements(id!),
		refetchOnWindowFocus: false,
	});
}

export function useLastMovementByInstrument(id: string | undefined) {
	return useQuery({
		queryKey: ["last-movement", id],
		queryFn: () => getLastMovement(id!),
		refetchOnWindowFocus: false,
	});
}

export function useLastCalibrationByInstrument(id: string | undefined) {
  return useQuery({
    queryKey: ["last-calibration", id],
    queryFn: () => getLastCalibration(id!),
    refetchOnWindowFocus: false,
  })
}

export function useAllCalibrations() {
	return useQuery({
		queryKey: ["calibrations"],
		queryFn: getCalibrations,
		refetchOnWindowFocus: false,
	});
}


export function useInstrumentDeepFiltered(pageParam = 0, status: string, situation: string, column: string, value: string, sortedBy: string){
  return useQuery({
    queryKey: ["instrumentFiltered"],
    queryFn: () => getInstrumentsFiltered(pageParam , status, situation, column, value, sortedBy),
    refetchOnWindowFocus: false,
  })
}

import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
	postAreaRegister,
	postFamilyRegister,
	postOutputUse,
	postReturnUse,
	postLaboratoryRegister,
	postEmployeeRegister,
	postInstrument,
	postSupplierRegister,
	postUpdateInstrument,
	postUpdateFamily,
	postUpdateArea,
	postUpdateEmployee,
	getMovementByInstrumentIds,
	postUpdateLaboratory,
	postUpdateSupplier,
	postLaboratoryOutput,
	getMovementByInstrumentIdsLabOutput,
	postLaboratoryReturn,
} from "./apiService";
import {
	AreaRegisterPost,
	FamilyRegisterPost,
	LaboratoryRegisterPost,
	EmployeeRegisterPost,
	SupplierRegisterPost,
} from "../utils/interfaces/Interfaces";
import { LaboratoryOutputPost, LaboratoryReturnPost, UsePost, UseReturnPost } from "../utils/interfaces/MovementsInterfaces";

import { UsePost, UseReturnPost, LaboratoryOutputPost, LaboratoryReturnPost } from "../utils/interfaces/MovementsInterfaces";

export function useGetLastMovementByIds() {
	return useMutation({
		mutationFn: (ids: string[]) => getMovementByInstrumentIds(ids),
		onMutate: () => {},
		onError: () => {},
		onSettled() {},
	});
}
export function useGetLastMovementByIdsLabOutput() {
	return useMutation({
		mutationFn: (ids: string[]) => getMovementByInstrumentIdsLabOutput(ids),
		onMutate: () => {},
		onError: () => {},
		onSettled() {},
	});
}

export function usePostOutputUse() {
	return useMutation({
		mutationFn: (data: UsePost) => {
			return postOutputUse({
				instrumentIds: data.instrumentIds,
				area: data.area,
				shippingResponsible: data.shippingResponsible,
				receivingResponsible: data.receivingResponsible,
				outputDate: data.outputDate,
			});
		},
	});
}


export function usePostLaboratoryOutput() {
	return useMutation({
		mutationFn: (data: LaboratoryOutputPost) => {
			return postLaboratoryOutput({
				instrumentIds: data.instrumentIds,
				shippingResponsible: data.shippingResponsible,
				motive: data.motive,
				laboratory: data.laboratory,
				outputDate: data.outputDate,
			});
		},
	});
}
export function usePostLaboratoryReturn() {
	return useMutation({
		mutationFn: (data: LaboratoryReturnPost) => {
			return postLaboratoryReturn(data);
		},
	});
}

export function usePostReturnUse() {
	return useMutation({
		mutationFn: (data: UseReturnPost) => {
			return postReturnUse({
				instrumentIds: data.instrumentIds,
				shippingArea: data.shippingArea,
				shippingResponsible: data.shippingResponsible,
				receivingResponsible: data.receivingResponsible,
				returnDate: data.returnDate,
			});
		},
	});
}

export function usePostInstrument() {
	return useMutation({
		mutationFn: (data: FieldValues) => {
			return postInstrument(data);
		},
	});
}

export function usePostFamilyRegister() {
	return useMutation({
		mutationFn: (data: FamilyRegisterPost) => {
			return postFamilyRegister({
				code: data.code,
				description: data.description,
				calibrationFrequencyInMonths: data.calibrationFrequencyInMonths,
				calibrationTimeCounter: data.calibrationTimeCounter,
			});
		},
	});
}
export function usePostLaboratoryRegister() {
	return useMutation({
		mutationFn: (data: LaboratoryRegisterPost) => {
			return postLaboratoryRegister({
				description: data.description,
				calCode: data.calCode,
			});
		},
	});
}
export function usePostEmployeeRegister() {
	return useMutation({
		mutationFn: (data: EmployeeRegisterPost) => {
			return postEmployeeRegister({
				name: data.name,
				email: data.email,
				sector: data.sector,
			});
		},
	});
}

export function useUpdateInstrument() {
	return useMutation({
		mutationFn: (data: FieldValues) => {
			return postUpdateInstrument(data, data.id);
		},
	});
}
export function useUpdateArea() {
	return useMutation({
		mutationFn: (data: FieldValues) => {
			return postUpdateArea(data, data.id);
		},
	});
}

export function useUpdateFamily(id: string | undefined) {
	return useMutation({
		mutationFn: (data: FieldValues) => {
			return postUpdateFamily(data, id);
		},
	});
}

export function useUpdateEmployee(id: string | undefined) {
	return useMutation({
		mutationFn: (data: FieldValues) => {
			return postUpdateEmployee(data, id);
		},
	});
}

export function useUpdateLaboratory(id: string | undefined) {
	return useMutation({
		mutationFn: (data: FieldValues) => {
			return postUpdateLaboratory(data, id);
		},
	});
}

export function useUpdateSupplier(id: string | undefined) {
	return useMutation({
		mutationFn: (data: FieldValues) => {
			return postUpdateSupplier(data, id);
		},
	});
}

export function usePostAreaRegister() {
	return useMutation({
		mutationFn: (data: AreaRegisterPost) => {
			return postAreaRegister({ description: data.description });
		},
	});
}
export function usePostSupplierRegister() {
	return useMutation({
		mutationFn: (data: SupplierRegisterPost) => {
			return postSupplierRegister({ name: data.name, cnpj: data.cnpj });
		},
	});
}

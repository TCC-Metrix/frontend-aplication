import { useMutation } from "@tanstack/react-query";
import {
	getInstrumentBySome,
	postAreaRegister,
	postFamilyRegister,
	postOutputUse,
	postLaboratoryRegister,
} from "./apiService";
import {
	AreaRegisterPost,
	FamilyRegisterPost,
	OutputUsePost,
	SearchPattern,
	LaboratoryRegisterPost,
} from "../utils/interfaces/Interfaces";

//Função que faz um POST na API para retornar os instrumentos de acordo com o filtro
export function useGetInstrumentBy() {
	return useMutation({
		mutationFn: (data: SearchPattern) => getInstrumentBySome(data),
		onMutate: () => {},
		onError: () => {},
		onSettled() {},
	});
}

export function usePostOutputUse() {
	return useMutation({
		mutationFn: (data: OutputUsePost) => {
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
				name: data.name,
				calCode: data.calCode,
			});
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

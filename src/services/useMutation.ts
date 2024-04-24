import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
	getInstrumentBySome,
	postAreaRegister,
	postFamilyRegister,
	postOutputUse,
  	postInstrument,
	postSupplierRegister,
} from "./apiService";
import {
	AreaRegisterPost,
	FamilyRegisterPost,
	OutputUsePost,
	SearchPattern,
	SupplierRegisterPost,
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
        mutationFn: (data: FieldValues) => {
            return postInstrument(data)},
    })
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

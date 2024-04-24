import { FieldValues } from "react-hook-form";
import {
	GeneralArea,
	GeneralEmployee,
	GeneralInstrument,
	SearchPattern,
	OutputUsePost,
	Family,
	AreaRegisterPost,
  	InstrumentToPost,
  	FamilyRegisterPost,
	SupplierRegisterPost,
} from "../utils/interfaces/Interfaces";
import instance from "./axiosInstance";

//GET - Retorna todos os instrumentos
export const getInstruments = async () => {
	return (await instance.get<GeneralInstrument[]>("instrument/all")).data;
};

//GET - Retorna todos os funcionarios
export const getEmployees = async () => {
	return (await instance.get<GeneralEmployee[]>("employee/all")).data
};

//GET - Retorna todos as famílias
export const getFamilies = async () => {
	return (await instance.get<Family[]>("family/all")).data
};


//GET - Retorna todos as famílias
export const getSuppliers = async () => {
	return (await instance.get<Family[]>("supplier/all")).data
};

//GET - Retorna todas as areas
export const getArea = async () => {
	return (await instance.get<GeneralArea[]>("area/all")).data;
};

//GET - Retorna o instrumento pelo ID
export const getInstrumentById = async (id: string) => {
	return (await instance.get<GeneralInstrument[]>(`instrument/${id}`)).data;
};

//POST - Função para retornar os instrumentos de acordo com os filtros selecionados
export const getInstrumentBySome = async (data: SearchPattern) => {
	return instance.post<GeneralInstrument[]>("instrument/filter", {
		searchRequestDto: {
			column: data.column,
			value: data.value,
			secondColumn: data.secondColumn,
			secondValue: data.secondValue,
		},
	});
};

export const postOutputUse = async (data: OutputUsePost) => {
	return instance.post<OutputUsePost>("use_output", data);
};


export const postInstrument = async (data: FieldValues) => {
	console.log("postando")
	return instance.post<InstrumentToPost>("instrument", data);
};

export const postFamilyRegister = async (data: FamilyRegisterPost) => {
	return instance.post<FamilyRegisterPost>("family", data);
};

export const postAreaRegister = async (data: AreaRegisterPost) => {
	return instance.post<AreaRegisterPost>("area", data);
};
export const postSupplierRegister = async (data: SupplierRegisterPost) => {
	return instance.post<SupplierRegisterPost>("supplier", data);
};

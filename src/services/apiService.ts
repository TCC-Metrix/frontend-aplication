import { FieldValues } from "react-hook-form";
import {
	GeneralArea,
	GeneralEmployee,
	GeneralInstrument,
	SearchPattern,
	OutputUsePost,
	Family,
	AreaRegisterPost,
	LaboratoryRegisterPost,
	EmployeeRegisterPost,
  InstrumentToPost,
  FamilyRegisterPost,
	SupplierRegisterPost,
	RootFilter,
	RootMovement,

} from "../utils/interfaces/Interfaces";
import instance from "./axiosInstance";


interface InstrumentsFiltered {
	content: GeneralInstrument[]
  }
  

//GET - Retorna todos os instrumentos
export const getInstruments = async () => {
	return (await instance.get<InstrumentsFiltered>("instrument/all?page=1&size=5")).data;
};

//GET - Retorna todos os funcionarios
export const getEmployees = async () => {
	return (await instance.get<GeneralEmployee[]>("employee/all")).data;
};

//GET - Retorna todos as famílias
export const getFamilies = async () => {
	return (await instance.get<Family[]>("family/all")).data;
};

//GET - Retorna todos as famílias
export const getSuppliers = async () => {
	return (await instance.get<Family[]>("supplier/all")).data;
};

//GET - Retorna todas as areas
export const getArea = async () => {
	return (await instance.get<GeneralArea[]>("area/all")).data;
};

//GET - Retorna os instrumentos filtrados
export const getInstrumentsFiltered = async (pageParam = 0, status: string, situation: string, column: string, value: string, sortedBy: string) => {
	return (await instance.get<RootFilter>(`/instrument/deepfilter?status=${status === "todos" ? "" : status}&situation=${situation === "todos" ? "" : situation}&column=${column}&value=${value}&sortedBy=${sortedBy}&page=${pageParam}&size=20`)).data;
};


export const getLastMovement = async (id: string) => {
	return (await instance.get<RootMovement>(`movement/last?id=${id}`)).data
}


//GET - Retorna o instrumento pelo ID
export const getInstrumentById = async (id: string) => {
	return (await instance.get<GeneralInstrument>(`instrument/filter/${id}`)).data;
};

//POST - Função para retornar os instrumentos de acordo com os filtros selecionados
export const getInstrumentBySome = async (data: SearchPattern, pageParam = 0) => {
	return instance.post<GeneralInstrument[]>(`instrument/filter?page=${pageParam}&size=3`, {
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
	return instance.post<InstrumentToPost>("instrument", data);
};

export const postFamilyRegister = async (data: FamilyRegisterPost) => {
	return instance.post<FamilyRegisterPost>("family", data);
};

export const postAreaRegister = async (data: AreaRegisterPost) => {
	return instance.post<AreaRegisterPost>("area", data);
};

export const postLaboratoryRegister = async (data: LaboratoryRegisterPost) => {
	return instance.post<LaboratoryRegisterPost>("laboratory", data)
};
export const postEmployeeRegister = async (data: EmployeeRegisterPost) => {
	return instance.post<EmployeeRegisterPost>("employee", data)
}
export const postSupplierRegister = async (data: SupplierRegisterPost) => {
	return instance.post<SupplierRegisterPost>("supplier", data);
};


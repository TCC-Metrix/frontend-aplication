import { FieldValues } from "react-hook-form";
import {
	GeneralArea,
	GeneralEmployee,
	GeneralInstrument,
	SearchPattern,
	Family,
	AreaRegisterPost,
	LaboratoryRegisterPost,
	EmployeeRegisterPost,
	InstrumentToPost,
	FamilyRegisterPost,
	SupplierRegisterPost,
	RootFilter,
	GeneralSupplier,
	GeneralLaboratory,
	GeneralCalibrations,
} from "../utils/interfaces/Interfaces";
import instance from "./axiosInstance";
import { HistoryMovement, LaboratoryOutputPost, LaboratoryReturnPost, MovUseOutputData, RootMovement, UsePost, UseReturnPost } from "../utils/interfaces/MovementsInterfaces";

interface InstrumentsFiltered {
	content: GeneralInstrument[];
}

//GET - Retorna todos os instrumentos
export const getInstruments = async () => {
	return (
		await instance.get<InstrumentsFiltered>("instrument/all?page=1&size=5")
	).data;
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
	return (await instance.get<GeneralSupplier[]>("supplier/all")).data;
};
export const getCalibrations = async () => {
	return (await instance.get<GeneralCalibrations[]>("instrument/calibration")).data;
};

export const getLaboratories = async () => {
	return (await instance.get<GeneralLaboratory[]>("laboratory/all")).data;
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
	return (await instance.get<RootMovement>(`movement/last?id=${id}`)).data;
};

export const getLastCalibration = async (id: string) => {
	return (await instance.get<HistoryMovement>(`movement/calibration/last?id=${id}`)).data
}

//GET - Retorna o instrumento pelo ID
export const getInstrumentById = async (id: string) => {
	return (await instance.get<GeneralInstrument>(`instrument/filter/${id}`))
		.data;
};

//GET - Retorna a família filtrada
export const getFamilyFiltered = async (data: FieldValues) => {
	return (
		await instance.get<Family[]>(
			`family/filter?column=${data.column}&value=${data.value}`
		)
	).data;
};

//GET - Retorna a família pelo id
export const getFamilyById = async (id: string | undefined) => {
	return (await instance.get<Family>(`family/${id === undefined ? "" : id}`))
		.data;
};

//GET - Retorna os funcionários pelo id
export const getEmployeeById = async (id: string | undefined) => {
	return (
		await instance.get<GeneralEmployee>(
			`employee/${id === undefined ? "" : id}`
		)
	).data;
};
export const getLaboratoryById = async (id: string | undefined) => {
	return (
		await instance.get<GeneralLaboratory>(
			`laboratory/${id === undefined ? "" : id}`
		)
	).data;
};

export const getSupplierById = async (id: string | undefined) => {
	return (
		await instance.get<GeneralSupplier>(
			`supplier/${id === undefined ? "" : id}`
		)
	).data;
};

//GET - Retorna os funcionários filtrados
export const getEmployeeFiltered = async (data: FieldValues) => {
	return (
		await instance.get<GeneralEmployee[]>(
			`employee/filter?column=${data.column}&value=${data.value}`
		)
	).data;
};
export const getSupplierFiltered = async (data: FieldValues) => {
	return (
		await instance.get<GeneralSupplier[]>(
			`supplier/filter?column=${data.column}&value=${data.value}`
		)
	).data;
};
export const getLaboratoryFiltered = async (data: FieldValues) => {
	return (
		await instance.get<GeneralLaboratory[]>(
			`laboratory/filter?column=${data.column}&value=${data.value}`
		)
	).data;
};

//GET - Retorna as movimentações pelo ID do instrumento
export const getAllMovements = async (id: string) => {
	return (await instance.get<HistoryMovement[]>(`movement/filter/instrument/${id}`)).data;
};

//POST - Função para retornar os instrumentos de acordo com os filtros selecionados
export const getInstrumentBySome = async (
	data: SearchPattern,
	pageParam = 0
) => {
	return instance.post<GeneralInstrument[]>(
		`instrument/filter?page=${pageParam}&size=3`,
		{
			searchRequestDto: {
				column: data.column,
				value: data.value,
				secondColumn: data.secondColumn,
				secondValue: data.secondValue,
			},
		}
	);
};

export const postOutputUse = async (data: UsePost) => {
	return instance.post<UsePost>("use_output", data);
};

export const postLaboratoryOutput = async (data: LaboratoryOutputPost) => {
	return instance.post<LaboratoryOutputPost>("laboratory_output", data);
};
export const postLaboratoryReturn = async (data: LaboratoryReturnPost) => {
	return instance.post<LaboratoryReturnPost>("laboratory_return", data);
};

export const postReturnUse = async (data: UseReturnPost) => {
	return instance.post<UseReturnPost>("use_return", data);
};

export const postInstrument = async (data: FieldValues) => {
	return instance.post<InstrumentToPost>("instrument", data);
};

export const postFamilyRegister = async (data: FamilyRegisterPost) => {
	return instance.post<FamilyRegisterPost>("family", data);
};

export const postUpdateInstrument = async (data: FieldValues, id: string) => {
	return instance.put<FieldValues>(`instrument/${id}`, data);
};
export const postUpdateArea = async (data: FieldValues, id: string) => {
	return instance.put<FieldValues>(`area/${id}`, data);
};
export const postUpdateFamily = async (
	data: FieldValues,
	id: string | undefined
) => {
	return instance.put<FieldValues>(`family/${id}`, data);
};

export const postUpdateEmployee = async (
	data: FieldValues,
	id: string | undefined
) => {
	return instance.put<FieldValues>(`employee/${id}`, data);
};

export const postUpdateLaboratory = async (
	data: FieldValues,
	id: string | undefined
) => {
	return instance.put<FieldValues>(`laboratory/${id}`, data);
};

export const postUpdateSupplier = async (
	data: FieldValues,
	id: string | undefined
) => {
	return instance.put<FieldValues>(`supplier/${id}`, data);
};

export const postAreaRegister = async (data: AreaRegisterPost) => {
	return instance.post<AreaRegisterPost>("area", data);
};

export const postLaboratoryRegister = async (data: LaboratoryRegisterPost) => {
	return instance.post<LaboratoryRegisterPost>("laboratory", data);
};
export const postEmployeeRegister = async (data: EmployeeRegisterPost) => {
	return instance.post<EmployeeRegisterPost>("employee", data);
};
export const postSupplierRegister = async (data: SupplierRegisterPost) => {
	return instance.post<SupplierRegisterPost>("supplier", data);
};

export const getMovementByInstrumentIds = async (ids: string[]) => {
	return instance.post<MovUseOutputData[]>("movement/filter/instruments/last", {
		instrumentIds: ids,
	});
};
export const getMovementByInstrumentIdsLabOutput = async (ids: string[]) => {
	return instance.post<RootMovement[]>("movement/filter/instruments/last", {
		instrumentIds: ids,
	});
};

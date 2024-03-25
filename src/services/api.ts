import { GeneralInstrument, SearchPattern } from "../utils/interfaces/Interfaces";

import instance from "./axiosInstance";

export const getInstruments = async () => {
	return (await instance.get<GeneralInstrument[]>("instrument/all")).data
};


export const getInstrumentById = async (id: string) => {
	return (await instance.get<GeneralInstrument[]>(`instrument/${id}`)).data
}

export const getInstrumentBySome = async (data: SearchPattern) => {
	return instance.post<GeneralInstrument[]>('instrument/filter', {
		searchRequestDto: {
			column: data.column,
			value: data.value,
			secondColumn: data.secondColumn,
			secondValue: data.secondValue
		}
	})
  };
  


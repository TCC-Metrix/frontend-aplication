import { GeneralInstrument } from "../utils/interfaces/Interfaces";
import instance from "./axiosInstence";

export const getInstruments = async () => {
	return (await instance.get<GeneralInstrument[]>("instrument/all")).data
};


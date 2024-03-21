import { Instruments } from "../utils/interfaces/Interfaces";
import instance from "./axiosInstence";

export const getInstruments = async () => {
	return (await instance.get<Instruments[]>("instrument/all")).data
};

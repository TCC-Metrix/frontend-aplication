import { useQuery } from "@tanstack/react-query";
import { getInstruments } from "./api";
import { GeneralInstrument } from "../utils/interfaces/Interfaces";


export function useInstrument() {
  return useQuery({
    queryKey: ["instruments"],
    queryFn: getInstruments,
    refetchOnWindowFocus: false,
  })
}



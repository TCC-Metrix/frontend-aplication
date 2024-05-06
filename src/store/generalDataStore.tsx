import { create } from 'zustand';
import { GeneralInstrument } from '../utils/interfaces/Interfaces';

// Defina o objeto de instrumento inicial
const initialInstrument: GeneralInstrument = {
  id: "",
  code: "",
  description: "",
  serieNumber: "",
  inventory: "",
  acquisitionDate: "",
  supplier: "",
  manufacturer: "",
  familyId: {
    id: "",
    code: "",
    description: "",
    calibrationFrequencyInMonths: 0,
    calibrationTimeCounter: ""
  },
  additionalReferences: [],
  acceptanceCriteria: "",
  measurementUnit: "",
  situation: "",
  situationReason: "",
  situationJustification: "",
  acquisitionCost: "",
  costCenter: "",
  calibrationFrequency: 0,
  status: "",
  nextCalibration: ""
};

type State = {
  instrument: GeneralInstrument;
  setInstrument: (instrumentReceived: GeneralInstrument) => void;
  resetInstrument: () => void;
};

const useGeneralDataStore = create<State>((set) => ({
  instrument: initialInstrument,
  setInstrument: (instrumentReceived) => set({ instrument: instrumentReceived }),
  resetInstrument: () => set({ instrument: initialInstrument }), // Redefine o instrumento para o valor inicial
}));

export default useGeneralDataStore;

import { Area, GeneralEmployee, GeneralLaboratory, GeneralSupplier } from "./Interfaces"

export interface RootMovement {
	movement: Movement
	useOutput?: UseOutput
	useReturn?: UseReturn,
	laboratoryOutput?: LaboratoryOutput
	laboratoryReturn?: LaboratoryReturn
  }


  export interface Movement {
	id: string
	type: string
	instrument: string
	laboratoryOutput: string
	useOutput: string
	useReturn: string
	createdAt: string
  }


  export interface UseOutput {
	id: string
	movement: string[]
	receivingArea: Area
	shippingResponsible: GeneralEmployee
	receivingResponsible: GeneralEmployee
	outputDate: string
  }


  export interface UseReturn {
	id: string
	movement: string[]
	shippingArea: Area
	shippingResponsible: GeneralEmployee
	receivingResponsible: GeneralEmployee
	returnDate: string
  }


  
  export interface LaboratoryOutput {
	id: string
	movements: string[]
	shippingResponsible: GeneralEmployee
	laboratory: GeneralLaboratory
	motive: string
	outputDate: string
  }


  export interface MovUseOutputData {
	code: string
	description: string
	outputDate: string
	reason: string
	employee: string
	area: any
  }


  export interface UsePost {
	instrumentIds: string[];
	shippingResponsible: string;
	receivingResponsible: string;
	area: string;
	outputDate: string;
}

export interface LaboratoryOutputPost {
	instrumentIds: string[];
	shippingResponsible: string;
	motive: string;
	laboratory: string;
	outputDate: string;
}

export interface LaboratoryReturnPost {
	returnResponsible: string,
	movement: string,
	returnDate: string,
	calibrationDate: string,
	calibrationCost: string,
	certificateNumber: string,
	certificatePath: string,
	conclusion: string,
}

  export interface UseReturnPost {
	instrumentIds: string[];
	shippingResponsible: string;
	receivingResponsible: string;
	shippingArea: string;
	returnDate: string;
}

  
export interface InstrumentUseOutput {
	id: string;
	code: string;
	description: string;
	additionalReferences: [];
	nextCalibrationHide: string;
}



  export interface HistoryMovement {
    movementId: string;
    outputDate: string;
    returnDate?: any; // Propriedade opcional
    receivedBy?: string; // Propriedade opcional
    shippedBy?: string; // Propriedade opcional
    calibrationDate?: any; // Propriedade opcional
    certificateNumber?: any; // Propriedade opcional
    reason: string;
    laboratory?: string; // Propriedade opcional
	conclusion?: string;
  }

  
  export interface LaboratoryReturn {
	id: string
	movement: string
	calibrationCost: string
	certificateNumber: string
	certificatePath: string
	conclusion: string
	returnResponsible: GeneralEmployee
	returnDate: string
	calibrationDate: string
  }

  export interface FamilyRegisterGet {
	id: string;
	code: string;
	description: string;
	calibrationFrequencyInMonths: number;
	calibrationTimeCounter: string;
}


  export interface GeneralCalibrations {
	id: string
	code: string
	description: string
	serieNumber: string
	inventory: string
	acquisitionDate: string
	supplier: GeneralSupplier
	manufacturer: string
	familyId: FamilyRegisterGet
	additionalReferences: string[]
	acceptanceCriteria: string
	measurementUnit: string
	situation: string
	situationReason: string
	situationJustification: string
	situationChangedDate: string
	acquisitionCost: string
	costCenter: string
	calibrationFrequency: number
	status: string
	nextCalibration: string
  }
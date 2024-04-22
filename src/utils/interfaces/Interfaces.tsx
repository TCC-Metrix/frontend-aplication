export interface DropdownState {
	Mov: boolean;
	Cad: boolean;
	Cons: boolean;
	Rel: boolean;
	[key: string]: boolean; // Adicionando a assinatura de índice
}

export interface List {
	name: string;
	link: string;
}

export interface MenuOptionProps {
	name: string; // Tipo para o componente de ícone
	text: string; // Texto a ser exibid
}

export interface GeneralInstrument {
  id: string
  code: string
  description: string
  serieNumber: string
  inventory: string
  acquisitionDate: string
  supplier: string
  manufacturer: string
  familyId: Family
  additionalReferences: []
  acceptanceCriteria: string
  measurementUnit: string
  situation: string
  situationReason: string
  situationJustification: string
  acquisitionCost: string
  costCenter: string
  calibrationFrequency: number
  status: string
  nextCalibration: string
}

export interface SearchPattern {
	column: string;
	value: string;
	secondColumn: string;
	secondValue: string;
}

export interface OutputUsePost {
	instrumentIds: string[];
	shippingResponsible: string;
	receivingResponsible: string;
	area: string;
	outputDate: string;
}

export interface FamilyRegisterPost {
	code: string;
	description: string;
	calibrationFrequencyInMonths: number;
	calibrationTimeCounter: string;
}
export interface AreaRegisterPost {
	description: string;
}
export interface SupplierRegisterPost {
	name: string;
	cnpj: string;
}

export interface Option {
	value: string;
}

export interface Family {
	id: string;
	code: string;
	description: string;
	calibrationFrequencyInMonths: number;
	calibrationTimeCounter: string;
}

export interface InstrumentToModalTableUseOutput {
	id: string;
	code: string;
	description: string;
	family: string;
	calibrationFrequency: number;
	nextCalibration: string;
	additionalReferences: [];
	nextCalibrationHide: string;
}

export interface GeneralEmployee {
	id: string;
	name: string;
	email: string;
	sector: string;
}

export interface GeneralArea {
	id: string;
	description: string;
}

export interface InstrumentUseOutput {
	id: string;
	code: string;
	description: string;
	additionalReferences: [];
	nextCalibrationHide: string;
}


export interface GeneralSupplier {
  id: string;
  name: string;
  cnpj: string;
}


export interface InstrumentToPost {
  code: string
  description: string
  serieNumber: string
  inventory: string
  acquisitionDate: string
  supplier: string
  manufacturer: string
  familyId: string
  additionalReferences: []
  acceptanceCriteria: string
  measurementUnit: string
  situation: string
  acquisitionCost: string
  costCenter: string
  calibrationFrequency: number
}


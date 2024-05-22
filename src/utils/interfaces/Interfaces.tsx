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
  supplier: GeneralSupplier
  manufacturer: string
  familyId: Family
  additionalReferences: ["", "", ""]
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




export interface FamilyRegisterPost {
	code: string;
	description: string;
	calibrationFrequencyInMonths: number;
	calibrationTimeCounter: string;
}

export interface LaboratoryRegisterPost {
	description: string;
	calCode: number;
}

export interface EmployeeRegisterPost {
	name: string;
	email: string;
	sector: string;
}

export interface AreaRegisterPost {
	description: string;
}
export interface SupplierRegisterPost {
	name: string;
	cnpj: string;
}


export interface GeneralSupplier {
	id: string;
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
	edv: number;
	sector: string;
}

export interface GeneralArea {
	id: string;
	description: string;
}



export interface GeneralSupplier {
  id: string;
  name: string;
  cnpj: string;
}

export interface GeneralLaboratory {
	id: string;
	description: string;
	calCode: string;
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


// Itens da busca paginada

export interface Sort {
	empty: boolean
	sorted: boolean
	unsorted: boolean
  }

  export interface Sort2 {
	empty: boolean
	sorted: boolean
	unsorted: boolean
  }

export interface Pageable {
	pageNumber: number
	pageSize: number
	sort: Sort
	offset: number
	paged: boolean
	unpaged: boolean
  }

export interface RootFilter {
	content: GeneralInstrument[]
	pageable: Pageable
	last: boolean
	totalPages: number
	totalElements: number
	size: number
	number: number
	sort: Sort2
	first: boolean
	numberOfElements: number
	empty: boolean
  }




  export interface Area {
	id: string;
	description: string
  }













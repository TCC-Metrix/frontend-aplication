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
	name: string // Tipo para o componente de ícone
	text: string; // Texto a ser exibid
}


export interface GeneralInstrument {
  id: string
  code: string
  description: string
  serieNumber: string
  inventory: string
  acquisitionDate: string
  supplier: any
  manufacturer: any
  familyId: Family
  additionalReference1: any
  additionalReference2: any
  additionalReference3: any
  additionalReference4: any
  acceptanceCriteria: any
  measurementUnit: any
  situation: string
  situationReason: any
  situationJustification: any
  acquisitionCost: any
  costCenter: any
  calibrationFrequency: number
  status: string
  nextCalibration: string
}


export interface ModalInstrument {
	code: string
	description: string
	familyId: string
	calibrationFrequency: number
	nextCalibration: string
  }


export interface SearchPattern {
  column: string,
  value: string,
  secondColumn: string,
  secondValue: string
}
        
export interface Option {
	value: string;
}


export interface Family {
  id: string
  code: string
  description: string
  calibrationFrequencyInMonths: number
  calibrationTimeCounter: string
}

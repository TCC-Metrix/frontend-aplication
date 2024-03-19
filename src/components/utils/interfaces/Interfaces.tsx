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

export type PreInstrument = Instruments[]

export interface Instruments {
  id: string
  code: string
  description: string
  serieNumber: string
  inventory: string
  acquisitionDate: string
  supplier: any
  manufacturer: any
  familyId: FamilyId
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

export interface FamilyId {
  id: string
  code: string
  description: string
  calibrationFrequencyInMonths: number
  calibrationTimeCounter: string
}

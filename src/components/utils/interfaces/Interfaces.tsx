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
	img: string // Tipo para o componente de ícone
	text: string; // Texto a ser exibido
}

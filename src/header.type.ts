
export interface Header {
	depth: number;
	slug: string;
	text: string;
	parent: Header|null;
	children: Header[];
}

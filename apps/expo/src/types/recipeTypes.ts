export interface Recipe {
	id: number;
	title: string;
	image: string;
	imageType: string;
	nutrition: Nutrition;
}

export interface Nutrition {
	nutrients: Nutrient[];
}

export interface Nutrient {
	name: string;
	amount: number;
	unit: string;
}

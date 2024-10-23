export interface IPricingRules {
	[sku: string]: {
		price: number;
		specialPrice?: {
			quantity: number;
			price: number;
		};
	};
}

export interface IBasket {
	[sku: string]: number;
}

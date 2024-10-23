import { useState } from "react";
import { IBasket, IPricingRules } from "../interfaces/stock-interface";

export const useCalculateTotal = () => {
	const [basket, setBasket] = useState<IBasket>({});
	const [total, setTotal] = useState(0);

	const pricingRules: IPricingRules = {
		A: { price: 50, specialPrice: { quantity: 3, price: 130 } },
		B: { price: 30, specialPrice: { quantity: 2, price: 45 } },
		C: { price: 20 },
		D: { price: 15 },
	};

	const calculateTotal = (basket: IBasket, rules: IPricingRules): number => {
		let total = 0;

		for (const sku in basket) {
			const quantity = basket[sku];
			const rule = rules[sku];

			if (rule.specialPrice && quantity >= rule.specialPrice.quantity) {
				const offerQuantity = Math.floor(quantity / rule.specialPrice.quantity);
				const normalQuantity = quantity % rule.specialPrice.quantity;
				total +=
					offerQuantity * rule.specialPrice.price + normalQuantity * rule.price;
			} else {
				total += quantity * rule.price;
			}
		}

		return total;
	};

	const addItemToBasket = (sku: string) => {
		setBasket((prevBasket) => {
			const updatedBasket = {
				...prevBasket,
				[sku]: (prevBasket[sku] || 0) + 1,
			};
			const newTotal = calculateTotal(updatedBasket, pricingRules);
			setTotal(newTotal);
			return updatedBasket;
		});
	};

	const removeItemFromBasket = (sku: string) => {
		setBasket((prevBasket) => {
			if (prevBasket[sku] > 1) {
				// If more than 1, decrease quantity
				const updatedBasket = { ...prevBasket, [sku]: prevBasket[sku] - 1 };
				setTotal(calculateTotal(updatedBasket, pricingRules));
				return updatedBasket;
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { [sku]: _, ...rest } = prevBasket;
				setTotal(calculateTotal(rest, pricingRules));
				return rest;
			}
		});
	};

	return { total, basket, addItemToBasket, removeItemFromBasket };
};

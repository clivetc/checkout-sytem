import { useCallback, useState } from "react";
import { IBasket, IPricingRules } from "../interfaces/stock-interface";

export const PRICING_RULES: IPricingRules = {
	A: { price: 50, specialPrice: { quantity: 3, price: 130 } },
	B: { price: 30, specialPrice: { quantity: 2, price: 45 } },
	C: { price: 20 },
	D: { price: 15 },
};

export const useCalculateTotal = () => {
	const [basket, setBasket] = useState<IBasket>({});
	const [total, setTotal] = useState(0);

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

	const calculateSubtotal = (
		sku: string,
		quantity: number,
		rules: IPricingRules,
	): number => {
		const rule = rules[sku];
		if (!rule) return 0;
		if (rule.specialPrice && quantity >= rule.specialPrice.quantity) {
			const offerQuantity = Math.floor(quantity / rule.specialPrice.quantity);
			const normalQuantity = quantity % rule.specialPrice.quantity;
			return (
				offerQuantity * rule.specialPrice.price + normalQuantity * rule.price
			);
		} else {
			return quantity * rule.price;
		}
	};

	const addItemToBasket = useCallback((sku: string): void => {
		setBasket((prevBasket) => {
			const updatedBasket = {
				...prevBasket,
				[sku]: (prevBasket[sku] || 0) + 1,
			};
			setTotal(calculateTotal(updatedBasket, PRICING_RULES));
			return updatedBasket;
		});
	}, []);

	const removeItemFromBasket = useCallback((sku: string): void => {
		setBasket((prevBasket) => {
			if (prevBasket[sku] > 1) {
				const updatedBasket = { ...prevBasket, [sku]: prevBasket[sku] - 1 };
				setTotal(calculateTotal(updatedBasket, PRICING_RULES));
				return updatedBasket;
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { [sku]: _, ...rest } = prevBasket;
				setTotal(calculateTotal(rest, PRICING_RULES));
				return rest;
			}
		});
	}, []);

	return {
		total,
		basket,
		addItemToBasket,
		removeItemFromBasket,
		calculateSubtotal,
	};
};

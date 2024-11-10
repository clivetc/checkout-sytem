import {
	Box,
	Button,
	Flex,
	Text,
	Heading,
	Divider,
	Collapse,
} from "@chakra-ui/react";
import { IBasket, IPricingRules } from "../interfaces/stock-interface";
import { PRICING_RULES } from "../hooks/useCalculateTotal";

interface IProps {
	basket: IBasket;
	addItemToBasket: (sku: string) => void;
	removeItemFromBasket: (sku: string) => void;
	calculateSubtotal: (
		sku: string,
		quantity: number,
		rules: IPricingRules,
	) => number;
}

const DisplayBasket = ({
	basket,
	addItemToBasket,
	removeItemFromBasket,
	calculateSubtotal,
}: IProps) => {
	return (
		<Box mt={8} p={6} bg="gray.100" borderRadius="lg" shadow="md">
			<Heading size="lg" mb={4} color="teal.700" textAlign="center">
				Your Basket
			</Heading>
			<Collapse in={Object.keys(basket).length === 0} animateOpacity>
				<Text fontSize="lg" color="gray.500" textAlign="center">
					No items in the basket.
				</Text>
			</Collapse>
			{Object.entries(basket).map(([key, quantity]) => {
				const subtotal = calculateSubtotal(key, quantity, PRICING_RULES);
				return (
					<Box
						key={key}
						mb={4}
						p={3}
						border="1px solid"
						borderColor="gray.200"
						borderRadius="md"
					>
						<Flex justifyContent="space-between" alignItems="center">
							<Box>
								<Text fontSize="lg" fontWeight="semibold" color="gray.800">
									{key} - Qty: {quantity}
								</Text>
								<Text fontSize="sm" color="gray.500">
									Subtotal: £{(subtotal / 100).toFixed(2)}
								</Text>
							</Box>
							<Flex alignItems="center">
								<Button
									onClick={() => removeItemFromBasket(key)}
									size="sm"
									colorScheme="red"
									variant="ghost"
								>
									-
								</Button>
								<Text fontSize="lg" fontWeight="bold" color="gray.700" mx={2}>
									{quantity}
								</Text>
								<Button
									onClick={() => addItemToBasket(key)}
									size="sm"
									colorScheme="teal"
									variant="ghost"
								>
									+
								</Button>
							</Flex>
						</Flex>
						<Divider mt={3} />
					</Box>
				);
			})}
		</Box>
	);
};

export default DisplayBasket;

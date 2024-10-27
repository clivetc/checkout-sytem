import { Box, Button, Flex, Text, Heading, Divider } from "@chakra-ui/react";
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
		<Box mt={8} p={5} bg="gray.50" borderRadius="md" shadow="md">
			<Heading size="md" mb={4} color="teal.600">
				Your Basket
			</Heading>
			{Object.keys(basket).length === 0 ? (
				<Text fontSize="lg" color="gray.500">
					No items in the basket.
				</Text>
			) : (
				Object.entries(basket).map(([key, quantity]) => {
					const subtotal = calculateSubtotal(key, quantity, PRICING_RULES);
					return (
						<Box key={key} mb={4}>
							<Flex justifyContent="space-between" alignItems="center">
								<Box>
									<Text fontSize="lg" fontWeight="semibold" color="gray.700">
										{key} {quantity}
									</Text>
									<Text fontSize="sm" color="gray.500">
										Subtotal: £{(subtotal / 100).toFixed(2)}
									</Text>
								</Box>
								<Flex alignItems="center" gap={3}>
									<Button
										onClick={() => removeItemFromBasket(key)}
										size="sm"
										colorScheme="red"
										variant="outline"
									>
										-
									</Button>
									<Text fontSize="lg" fontWeight="bold" color="gray.700">
										{quantity}
									</Text>
									<Button
										onClick={() => addItemToBasket(key)}
										size="sm"
										colorScheme="teal"
									>
										+
									</Button>
								</Flex>
							</Flex>
							<Divider my={3} />
						</Box>
					);
				})
			)}
		</Box>
	);
};

export default DisplayBasket;

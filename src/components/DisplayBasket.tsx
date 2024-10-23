import { Box, Button, Flex, Text, Heading, Divider } from "@chakra-ui/react";
import { IBasket } from "../interfaces/stock-interface";

interface IProps {
	basket: IBasket;
	addItemToBasket: (sku: string) => void;
	removeItemFromBasket: (sku: string) => void;
}

const DisplayBasket = ({
	basket,
	addItemToBasket,
	removeItemFromBasket,
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
				Object.entries(basket).map(([key, quantity]) => (
					<Box key={key} mb={4}>
						<Flex justifyContent="space-between" alignItems="center">
							<Text fontSize="lg" fontWeight="medium" color="gray.700">
								{key}
							</Text>
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
				))
			)}
		</Box>
	);
};

export default DisplayBasket;

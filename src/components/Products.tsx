import { Box, Button, Flex, Text, Heading } from "@chakra-ui/react";
import { IPricingRules } from "../interfaces/stock-interface";

interface IProps {
	data: IPricingRules;
	addItemToBasket: (sku: string) => void;
}

const Products = ({ data, addItemToBasket }: IProps) => {
	return (
		<Box p={5}>
			<Flex justify="center" wrap="wrap" gap={6}>
				{Object.entries(data).map(([key, value]) => (
					<Box
						key={key}
						p={5}
						bg="white"
						shadow="md"
						borderRadius="lg"
						borderWidth="1px"
						width="250px"
						textAlign="center"
						_hover={{ shadow: "lg" }}
					>
						<Heading size="md" mb={3} color="gray.700">
							{key} ({value.price}p)
						</Heading>
						{value.specialPrice && (
							<Text fontSize="sm" color="gray.600" mb={3}>
								Special Offer: {value.specialPrice.quantity} for{" "}
								{value.specialPrice.price}p
							</Text>
						)}
						<Button
							onClick={() => addItemToBasket(key)}
							colorScheme="teal"
							width="full"
							mt={4}
						>
							Add to Basket
						</Button>
					</Box>
				))}
			</Flex>
		</Box>
	);
};

export default Products;

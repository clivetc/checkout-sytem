import { Box, Button, Flex, Text, Heading, useToast } from "@chakra-ui/react";
import { IPricingRules } from "../interfaces/stock-interface";

interface IProps {
	data: IPricingRules;
	addItemToBasket: (sku: string) => void;
}

const Products = ({ data, addItemToBasket }: IProps) => {
	const toast = useToast();

	const handleAddToBasket = (sku: string) => {
		addItemToBasket(sku);
		toast({
			title: `${sku} added to basket`,
			status: "success",
			duration: 2000,
			isClosable: true,
			position: "top",
		});
	};

	return (
		<Box p={5}>
			<Flex justify="center" wrap="wrap" gap={6}>
				{Object.entries(data).map(([key, value]) => (
					<Box
						key={key}
						p={5}
						bg="white"
						shadow="lg"
						borderRadius="lg"
						borderWidth="1px"
						width="280px"
						textAlign="center"
						transition="all 0.2s"
						_hover={{ transform: "scale(1.05)", shadow: "xl" }}
					>
						<Heading size="md" mb={3} color="gray.700">
							{key} - £{(value.price / 100).toFixed(2)}
						</Heading>
						{value.specialPrice && (
							<Text fontSize="sm" color="teal.600" mb={3}>
								Special: {value.specialPrice.quantity} for £
								{(value.specialPrice.price / 100).toFixed(2)}
							</Text>
						)}
						<Button
							onClick={() => handleAddToBasket(key)}
							colorScheme="teal"
							width="full"
							mt={4}
							variant="solid"
							fontWeight="bold"
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

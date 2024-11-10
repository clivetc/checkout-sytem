import { Box, Text, Divider, HStack, Icon, Button } from "@chakra-ui/react";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";

interface IProps {
	total: number;
}

const CheckoutDisplay = ({ total }: IProps) => {
	return (
		<Box
			mt={6}
			p={5}
			bg="white"
			shadow="md"
			borderRadius="lg"
			textAlign="center"
		>
			<Divider mb={4} />
			<Text fontSize="2xl" fontWeight="bold" color="teal.700">
				Total Amount
			</Text>
			<Text fontSize="3xl" fontWeight="bold" color="gray.800" mt={2}>
				£{(total / 100).toFixed(2)}
			</Text>
			<Text fontSize="sm" color="gray.500" mt={1} fontStyle="italic">
				Thank you for shopping with us!
			</Text>
			<Divider mt={4} mb={4} />

			{/* Payment Methods */}
			<Text fontSize="md" fontWeight="semibold" color="gray.600" mb={2}>
				We Accept
			</Text>
			<HStack spacing={4} justify="center">
				<Icon as={FaCcVisa} boxSize={8} color="blue.600" />
				<Icon as={FaCcMastercard} boxSize={8} color="red.600" />
				<Icon as={FaPaypal} boxSize={8} color="blue.500" />
			</HStack>
			<Button
				mt={6}
				colorScheme="blue"
				size="lg"
				width="full"
				onClick={() => alert("Payment here")}
			>
				Proceed to Payment
			</Button>
		</Box>
	);
};

export default CheckoutDisplay;

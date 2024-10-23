import { Box, Text } from "@chakra-ui/react";

interface IProps {
	total: number;
}

const CheckoutDisplay = ({ total }: IProps) => {
	return (
		<Box>
			<Text fontStyle={"italic"}>Total: £{(total / 100).toFixed(2)}</Text>
		</Box>
	);
};

export default CheckoutDisplay;

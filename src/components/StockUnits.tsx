import { Box, Text } from "@chakra-ui/react";
import { useCalculateTotal } from "../hooks/useCalculateTotal";
import CheckoutDisplay from "./CheckoutDisplay";
import DisplayBasket from "./DisplayBasket";
import Products from "./Products";
import data from "./sample-data.json";

const StockUnits = () => {
	const {
		total,
		basket,
		addItemToBasket,
		removeItemFromBasket,
		calculateSubtotal,
	} = useCalculateTotal();

	return (
		<Box bg="gray.50" maxH="100vh" p={5}>
			<Text fontSize={"3xl"} fontWeight={"bold"}>
				Checkout System
			</Text>

			<Products data={data} addItemToBasket={addItemToBasket} />
			<DisplayBasket
				basket={basket}
				addItemToBasket={addItemToBasket}
				removeItemFromBasket={removeItemFromBasket}
				calculateSubtotal={calculateSubtotal}
			/>
			<CheckoutDisplay total={total} />
		</Box>
	);
};

export default StockUnits;

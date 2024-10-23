import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import StockUnits from "./components/StockUnits";

function App() {
	return (
		<ChakraProvider>
			<StockUnits />
		</ChakraProvider>
	);
}

export default App;

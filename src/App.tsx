import {Routes, Route} from "react-router-dom"
import { MoveUseOutput } from "./pages/Movements/SaidaParaUso/MovUseOutput";
import './App.css'

function App() {

	return (
		<>
			<Routes>
				<Route path="/" element={<MoveUseOutput />}></Route>
			</Routes>
		</>
	);
}

export default App;

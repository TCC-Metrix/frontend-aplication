import {Routes, Route} from "react-router-dom"
import { MovSaidaUso } from "./pages/Movimentacoes/SaidaParaUso/MovSaidaUso";
import './App.css'

function App() {

	return (
		<>
			<Routes>
				<Route path="/" element={<MovSaidaUso />}></Route>
			</Routes>
		</>
	);
}

export default App;

import {Routes, Route} from "react-router-dom"
import { MoveUseOutput } from "./pages/Movements/UseOutput/MovUseOutput";
import './App.css'
import NavBar from "./components/Navbar/Navbar";
import useStore from "./store/store";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
	const activeNavbar = useStore((state) => state.activeNavbar);
	const setActiveNavbar = useStore((state) => state.setActiveNavbar);

	return (
		<>	
			<NavBar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar}/>
			<Routes>
				<Route path="/" element={<MoveUseOutput />}></Route>
				<Route path="/error" element={<ErrorPage />}></Route>
			</Routes>
		</>
	);
}

export default App;

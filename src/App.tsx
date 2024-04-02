import {Routes, Route} from "react-router-dom"
import { MoveUseOutput } from "./pages/Movements/UseOutput/MovUseOutput";
import './App.css'
import NavBar from "./components/Navbar/Navbar";
import useStore from "./store/store";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Popup from "./components/Popup/Popup";

function App() {
	const activeNavbar = useStore((state) => state.activeNavbar);
	const setActiveNavbar = useStore((state) => state.setActiveNavbar);
	const popupBody = useStore((state) => state.popupBody);
	const isPopupActive = useStore((state) => state.isPopupActive);
	const popupTitle = useStore((state) => state.popupTitle)
	const popupType = useStore((state) => state.popupType)
	

	return (
		<>	
			<NavBar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar}/>
			<Popup isActive={isPopupActive} title={popupTitle} type={popupType} body={popupBody}/>
			<Routes>
				<Route path="/" element={<MoveUseOutput />}></Route>
				<Route path="/error" element={<ErrorPage />}></Route>
			</Routes>
		</>
	);
}

export default App;

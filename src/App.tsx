import {Routes, Route} from "react-router-dom"
import { MoveUseOutput } from "./pages/Movements/UseOutput/MovUseOutput";
import './App.css'
import NavBar from "./components/Navbar/Navbar";
import { useNavbarStore, usePopupStore } from "./store";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Popup from "./components/Popup/Popup";

function App() {
	const activeNavbar = useNavbarStore((state) => state.activeNavbar);
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const popupBody = usePopupStore((state) => state.popupBody);
	const isPopupActive = usePopupStore((state) => state.isPopupActive);
	const popupTitle = usePopupStore((state) => state.popupTitle)
	const popupType = usePopupStore((state) => state.popupType)
	let popupBtnFunction = usePopupStore((state) => state.popupBtnFunction)
	

	return (
		<>	
			<NavBar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar}/>
			<Popup isActive={isPopupActive} title={popupTitle} type={popupType} body={popupBody} btnFunction={popupBtnFunction}/>
			<Routes>
				<Route path="/" element={<MoveUseOutput />}></Route>
				<Route path="/error" element={<ErrorPage />}></Route>
			</Routes>
		</>
	);
}

export default App;

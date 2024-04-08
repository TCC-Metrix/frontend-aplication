import { Routes, Route } from "react-router-dom";
import { MoveUseOutput } from "./pages/Movements/UseOutput/MovUseOutput";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import { useNavbarStore, usePopupStore } from "./store";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Popup from "./components/Popup/Popup";
import PreLogin from "./pages/Auth/PreLogin/PreLogin";
import { ProtectedRoute } from "./authSSO/protectedRoute";
import InstrumentRegister from "./pages/Registers/InstrumentRegister";
import Logout from "./pages/Logout/Logout";

function App() {
	const activeNavbar = useNavbarStore((state) => state.activeNavbar);
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const popupBody = usePopupStore((state) => state.popupBody);
	const isPopupActive = usePopupStore((state) => state.isPopupActive);
	const popupTitle = usePopupStore((state) => state.popupTitle);
	const popupType = usePopupStore((state) => state.popupType);
	const popupBtnFunction = usePopupStore((state) => state.popupBtnFunction);

	return (
		<>
			<Popup
				isActive={isPopupActive}
				title={popupTitle}
				type={popupType}
				body={popupBody}
				btnFunction={popupBtnFunction}
			/>

			<Routes>
				<Route path="/login" element={<PreLogin />}></Route>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<NavBar
								activeNavbar={activeNavbar}
								setActiveNavbar={setActiveNavbar}
							/>
							<MoveUseOutput />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/instrument-register"
					element={
						<ProtectedRoute>
							<NavBar
								activeNavbar={activeNavbar}
								setActiveNavbar={setActiveNavbar}
							/>
							<InstrumentRegister />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/error"
					element={
						<ProtectedRoute>
							<NavBar
								activeNavbar={activeNavbar}
								setActiveNavbar={setActiveNavbar}
							/>
							<ErrorPage />
						</ProtectedRoute>
					}
				></Route>
				<Route path="/logout" element={<Logout />}></Route>
			</Routes>
		</>
	);
}

export default App;

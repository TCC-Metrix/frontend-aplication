import { Routes, Route } from "react-router-dom";
import { useNavbarStore, usePopupStore } from "./store";
import Popup from "./components/Popup/Popup";
import PreLogin from "./pages/Auth/PreLogin/PreLogin";
import { ProtectedRoute } from "./authSSO/protectedRoute";
import NavBar from "./components/Navbar/Navbar";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { MoveUseOutput } from "./pages/Movements/UseOutput/MovUseOutput";
import InstrumentRegister from "./pages/Registers/Instrument/InstrumentRegister";
import "./App.css";
import LaboratoryRegister from "./pages/Registers/Laboratory/LaboratoryRegister";
import SupplierRegister from "./pages/Registers/Supplier/SupplierRegister";
import FamilyRegister from "./pages/Registers/Family/FamilyRegister";
import AreaRegister from "./pages/Registers/Area/AreaRegister";
import EmployeeRegister from "./pages/Registers/Employee/employeeRegister";

import UseReturn from "./pages/Movements/UseReturn/UseReturn";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ConsultInsturment from "./pages/Consults/Instrument/ConsultInsturment";

function App() {
	const activeNavbar = useNavbarStore((state) => state.activeNavbar);
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const popupBody = usePopupStore((state) => state.popupBody);
	const isPopupActive = usePopupStore((state) => state.isPopupActive);
	const popupTitle = usePopupStore((state) => state.popupTitle);
	const popupType = usePopupStore((state) => state.popupType);
	const popupBtnFunction = usePopupStore((state) => state.popupBtnFunction);

	const location = useLocation();

	useEffect(() => {
		setActiveNavbar(false);
	}, [location]);

	return (
		<>
			<Popup
				isActive={isPopupActive}
				title={popupTitle}
				type={popupType}
				body={popupBody}
				btnFunction={popupBtnFunction}
			/>

			<ProtectedRoute>
				<NavBar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />
			</ProtectedRoute>

			<Routes>
				<Route path="/login" element={<PreLogin />}></Route>
				<Route
					path="/movement/use/output"
					element={
						<ProtectedRoute>
							<MoveUseOutput />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/register/instrument"
					element={
						<ProtectedRoute>
							<InstrumentRegister />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/error"
					element={
						<ProtectedRoute>
							<ErrorPage />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/register/laboratory"
					element={
						<ProtectedRoute>
							<LaboratoryRegister />
						</ProtectedRoute>
					}
				></Route>
				<Route path="/login" element={<PreLogin />}></Route>
				<Route
					path="/movement/use/output"
					element={
						<ProtectedRoute>
							<MoveUseOutput />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/movement/use/return"
					element={
						<ProtectedRoute>
							<UseReturn />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/register/family"
					element={
						<ProtectedRoute>
							<FamilyRegister />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/register/supplier"
					element={
						<ProtectedRoute>
							<SupplierRegister />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/register/area"
					element={
						<ProtectedRoute>
							<AreaRegister />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/register/employee"
					element={
						<ProtectedRoute>
							<EmployeeRegister />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/consult/instrument"
					element={
						<ProtectedRoute>
							<ConsultInsturment />
						</ProtectedRoute>
					}
				></Route>
			</Routes>
		</>
	);
}

export default App;

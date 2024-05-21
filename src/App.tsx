import { Routes, Route } from "react-router-dom";
import { useNavbarStore } from "./store";
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
import { UseReturn } from "./pages/Movements/UseReturn/UseReturn";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import ConsultInstrument from "./pages/Consults/Instrument/ConsultInstrument";
import InstrumentDetails from "./pages/Consults/Instrument/InstrumentDetails";
import UpdateInstrument from "./pages/Update/Instrument/UpdateInstrument";
import { ToastContainer } from "react-toastify";
import InstrumentHistory from "./pages/History/InstrumentHistory";
import ConsultFamily from "./pages/Consults/Family/ConsultFamily";
import FamilyDetails from "./pages/Consults/Family/FamilyDetails";
import UpdateFamily from "./pages/Update/Family/UpdateFamily";
// import ConsultLaboratory from "./pages/Consults/Laboratory/ConsultLaboratory";
import ConsultArea from "./pages/Consults/Area/ConsultArea";
import ConsultEmployee from "./pages/Consults/Employee/ConsultEmployee";
import EmployeeDetails from "./pages/Consults/Employee/EmployeeDetails";
import UpdateEmployee from "./pages/Update/Employee/UpdateEmployee";
import { LaboratoryOutput } from "./pages/Movements/LaboratoryOutput/LaboratoryOutput";
import ConsultSupplier from "./pages/Consults/Supplier/ConsultSupplier";
import LaboratoryDetails from "./pages/Consults/Laboratory/LaboratoryDetails";
import UpdateLaboratory from "./pages/Update/Laboratory/UpdateLaboratory";
import SupplierDetails from "./pages/Consults/Supplier/SupplierDetails";
import UpdateSupplier from "./pages/Update/Supplier/UpdateSupplier";
import LaboratoryReturn from "./pages/Movements/LaboratoryReturn/LaboratoryReturn";
import ConsultLaboratory from "./pages/Consults/Laboratory/ConsultLaboratory";


function App() {
	const activeNavbar = useNavbarStore((state) => state.activeNavbar);
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);

	const location = useLocation();
	const previousLocation = useRef(location);

	useEffect(() => {
		setActiveNavbar(false);
		// Verifica se a localização atual é diferente da localização anterior
		if (location.pathname === previousLocation.current.pathname) {
			//   window.location.reload();
		} else if (
			location.pathname === "/movement/use/output" ||
			location.pathname === "/movement/use/return"
		) {
			window.location.reload();
		}

		// Atualiza a localização anterior com a localização atual
		previousLocation.current = location;
	}, [location]);

	return (
		<>
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
							<ConsultInstrument />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/consult/instrument/:id"
					element={
						<ProtectedRoute>
							<InstrumentDetails />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/edit/instrument/:id"
					element={
						<ProtectedRoute>
							<UpdateInstrument />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/consult/family"
					element={
						<ProtectedRoute>
							<ConsultFamily />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/consult/employee"
					element={
						<ProtectedRoute>
							<ConsultEmployee />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/consult/family/:id"
					element={
						<ProtectedRoute>
							<FamilyDetails />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/consult/employee/:id"
					element={
						<ProtectedRoute>
							<EmployeeDetails />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/edit/family/:id"
					element={
						<ProtectedRoute>
							<UpdateFamily />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/edit/employee/:id"
					element={
						<ProtectedRoute>
							<UpdateEmployee />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/history/instrument/:id"
					element={
						<ProtectedRoute>
							<InstrumentHistory />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/consult/area"
					element={
						<ProtectedRoute>
							<ConsultArea />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="movement/laboratory/output"
					element={
						<ProtectedRoute>
							<LaboratoryOutput />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/consult/supplier"
					element={
						<ProtectedRoute>
							<ConsultSupplier />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/consult/laboratory"
					element={
						<ProtectedRoute>
							<ConsultLaboratory />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/consult/laboratory/:id"
					element={
						<ProtectedRoute>
							<LaboratoryDetails />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/edit/laboratory/:id"
					element={
						<ProtectedRoute>
							<UpdateLaboratory />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/consult/supplier/:id"
					element={
						<ProtectedRoute>
							<SupplierDetails />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/edit/supplier/:id"
					element={
						<ProtectedRoute>
							<UpdateSupplier />
						</ProtectedRoute>
					}
				></Route>
<Route
          path="/consult/area"
          element={
            <ProtectedRoute>
              <ConsultArea />
            </ProtectedRoute>
          }
        ></Route>
      <Route
          path="movement/laboratory/output"
          element={
            <ProtectedRoute>
              <LaboratoryOutput />
            </ProtectedRoute>
          }
        ></Route>
        
      <Route
          path="movement/laboratory/return"
          element={
            <ProtectedRoute>
              <LaboratoryReturn />
            </ProtectedRoute>
          }
        ></Route>
        
        <Route
          path="/consult/supplier"
          element={
            <ProtectedRoute>
              <ConsultSupplier />
            </ProtectedRoute>
          }
        ></Route>
        {/* <Route
          path="/consult/laboratory"
          element={
            <ProtectedRoute>
              <ConsultLaboratory />
            </ProtectedRoute>
          }
        ></Route> */}

			</Routes>
			<ToastContainer />
		</>
	);
        
}

export default App;
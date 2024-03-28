import { useState } from "react";
import NavBar from "../Navbar/Navbar";
import { Loading } from "../..";
import "./LoadingPage.css"

const LoadingPage = () => {
	const [activeNavbar, setActiveNavbar] = useState<boolean>(true);
	return (
		<div className="container-loading">
			<NavBar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />
			<div className="loarder-gif">
				<img src={Loading} alt="Loading" className=""></img>
			</div>
		</div>
	);
};

export default LoadingPage;

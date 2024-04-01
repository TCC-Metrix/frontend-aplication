import { useState } from "react";
import NavBar from "../../components/Navbar/Navbar";
import "./ErrorPage.css";
import { CiCircleAlert } from "react-icons/ci";

const ErrorPage = () => {
	const [activeNavbar, setActiveNavbar] = useState<boolean>(true);
	return (
		<>
			<NavBar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />
			<div className="container-error-page">
				<CiCircleAlert size={100} className="color-icon-error-page"/>
				<div className="header-phrase-page-error">
					<h1 className="error-page-text-main header-three">
						Ops... Erro interno do servidor
					</h1>
					<p className="description-error-page normal-text">
						Tente novamente mais tarde!
					</p>
				</div>
			</div>
		</>
	);
};

export default ErrorPage;

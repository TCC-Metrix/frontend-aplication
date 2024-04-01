import useStore from "../../store/store";
import "./ErrorPage.css";
import { CiCircleAlert } from "react-icons/ci";

const ErrorPage = () => {
	const setActiveNavbar = useStore((state) => state.setActiveNavbar);
	const handlePageClicked = () => {
		setActiveNavbar(false)
	}
	return (
		<>
			<div className="container-error-page" onClick={handlePageClicked}>
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

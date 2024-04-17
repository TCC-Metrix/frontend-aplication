import { Loading } from "../..";
import { useNavbarStore } from "../../store";
import "./LoadingPage.css";

const LoadingPage = () => {
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	return (
		<div
			className="container-loading"
			onClick={() => {
				setActiveNavbar(false);
			}}
		>
			<div className="loarder-gif">
				<img src={Loading} alt="Loading" className=""></img>
			</div>
		</div>
	);
};

export default LoadingPage;

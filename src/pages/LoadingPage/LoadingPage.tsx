import { Loading } from "../..";
import "./LoadingPage.css"

const LoadingPage = () => {
	return (
		<div className="container-loading">
			<div className="loarder-gif">
				<img src={Loading} alt="Loading" className=""></img>
			</div>
		</div>
	);
};

export default LoadingPage;

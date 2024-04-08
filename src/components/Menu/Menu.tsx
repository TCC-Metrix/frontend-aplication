import { useMsal } from "@azure/msal-react";
import MenuOption from "../MenuOption/MenuOption";
import "./Menu.css";
import { useEffect, useState } from "react";
import { callMsGraph } from "../../authSSO/MsGraphApiCall";
import { loginRequest } from "../../authSSO/authConfig";
import { AccountInfo, InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
const Menu = () => {
	const { instance, inProgress } = useMsal();
	const [imageUrl, setImageUrl] = useState<string | undefined>("");
	const account = instance.getActiveAccount();

	useEffect(() => {
		if (!imageUrl && inProgress === InteractionStatus.None) {
				callMsGraph()
						.then((response) => {
								setImageUrl(response?.blobUrl);
						})
						.catch((e) => {
								if (e instanceof InteractionRequiredAuthError) {
										instance.acquireTokenRedirect({
												...loginRequest,
												account: instance.getActiveAccount() as AccountInfo,
										});
								}
						});
		}
}, [inProgress, instance, imageUrl, account?.name]);



	return (
		<>
			<div className="name-img text">
				<img src={imageUrl} alt="logo-rexroth" className="img-profile"></img>
				<div>
					<p className="text-major">{account?.name}</p>
				</div>
			</div>
			<div className="menu-infos-container">
				<div className="border"></div>
				<MenuOption name={"exit"} text="Sair" />
			</div>
		</>
	);
};

export default Menu;

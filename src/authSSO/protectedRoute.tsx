import { useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
	const { accounts } = useMsal();

	if (!accounts[0]) {
		return <Navigate to="/login" />;
	}

	return children;
};

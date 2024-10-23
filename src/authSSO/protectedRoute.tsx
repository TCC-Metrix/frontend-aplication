import { useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
	children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { accounts } = useMsal();

	if (!accounts[0]) {
		return <Navigate to="/login" />;
	}

	const account = accounts[0]
	const roles = account.idTokenClaims?.roles || []

	const hasAccess = roles.includes('MetrixAdmin') || roles.includes('MetrixUser')

	if (!hasAccess) {
		return <Navigate to="/error" />;
	}

	return children;
};

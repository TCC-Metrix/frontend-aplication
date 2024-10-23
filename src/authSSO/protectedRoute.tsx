import { useMsal } from "@azure/msal-react";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
	children: ReactNode;
	requiredRoles?: string[];
}

export const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
	const { accounts } = useMsal();
	const location = useLocation()

	if (!accounts[0]) {
		return <Navigate to="/login" />;
	}

	const account = accounts[0]
	const roles = account.idTokenClaims?.roles || []

	const hasAccess = requiredRoles ? requiredRoles.some((role) => roles.includes(role)) : true

	if (!hasAccess) {
		return <Navigate to="/errorLogin" state={{ from: location }} />
	}

	return children;
};

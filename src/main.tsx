import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./authSSO/msalInstance.ts";

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 3, retryDelay: 1000 } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MsalProvider instance={msalInstance}>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</BrowserRouter>
		</MsalProvider>
	</React.StrictMode>
);

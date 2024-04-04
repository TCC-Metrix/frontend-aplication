import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authSSO/authConfig.tsx";

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 3, retryDelay: 1000 } },
});

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MsalProvider instance={msalInstance}>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<App />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</BrowserRouter>
		</MsalProvider>
	</React.StrictMode>
);

'use client';

import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client/react";
import { PropsWithChildren } from "react";
import { store } from "../store";
import { apolloClient } from "../lib/apolloClient";
import { SessionProvider } from "../context/SessionContext";
import { RoleProvider } from "../context/RoleContext";

export function Providers({ children }: PropsWithChildren) {
	return (
		<ReduxProvider store={store}>
			<ApolloProvider client={apolloClient}>
				<SessionProvider>
					<RoleProvider>{children}</RoleProvider>
				</SessionProvider>
			</ApolloProvider>
		</ReduxProvider>
	);
}



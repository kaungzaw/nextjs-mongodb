import { UserProvider } from "@auth0/nextjs-auth0";
import { ApolloProvider } from "@apollo/client";
import client from "utils/apolloClient";
import BaseLayout from "components/BaseLayout";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp;

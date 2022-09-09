import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://nextjs-mongodb-smoky.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

export default apolloClient;

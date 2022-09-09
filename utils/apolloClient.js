import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri:
    process.env.VERCEL_ENV === "production"
      ? "https://nextjs-mongodb-smoky.vercel.app/api/graphql"
      : "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default apolloClient;

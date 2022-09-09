import { createServer } from "@graphql-yoga/node";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createContext } from "graphql/context";
import {
  authDirectiveTransformer,
  authDirectiveTypeDefs,
} from "graphql/directives/auth";

import {
  typeDefs as userTypeDefs,
  resolvers as userResolvers,
} from "graphql/modules/user";

import {
  typeDefs as postTypeDefs,
  resolvers as postResolvers,
} from "graphql/modules/post";

const directiveTypeDefs = [authDirectiveTypeDefs];

let schema = makeExecutableSchema({
  typeDefs: [...directiveTypeDefs, userTypeDefs, postTypeDefs],
  resolvers: [userResolvers, postResolvers],
});

schema = authDirectiveTransformer(schema);

const server = createServer({
  schema,
  context: createContext,
  endpoint: "/api/graphql",
  // graphiql: false
});

export default server;

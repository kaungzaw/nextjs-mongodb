import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";
import { GraphQLYogaError } from "@graphql-yoga/node";
import { gql } from "@apollo/client";

export function authDirectiveTransformer(schema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        "requireAuth"
      )?.[0];

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          if (!context.session) {
            throw new GraphQLYogaError("Unauthenticated");
          }
          const result = await resolve(source, args, context, info);
          return result;
        };
        return fieldConfig;
      }
    },
  });
}

export const authDirectiveTypeDefs = gql`
  directive @requireAuth on FIELD_DEFINITION
`;

import { gql } from "@apollo/client";

const type = "Post";
const createInputType = `Create${type}Input`;
const updateInputType = `Update${type}Input`;
const attributes = `
  _id: String!
  text: String!
  like: Int!
  dislike: Int!
  createdAt: String!
  createdBy: String!
`;
const createInputAttributes = `
  text: String!
`;
const updateInputAttributes = `
  text: String
  like: Int
  dislike: Int
  createdAt: String
  createdBy: String
`;

const types = gql`
  type ${type} {
    ${attributes}
  }

  input ${createInputType} {
    ${createInputAttributes}
  }

  input ${updateInputType} {
    ${updateInputAttributes}
  }

  type Query {
    posts(filter: ${updateInputType}): [${type}!]
  }

  type Mutation {
    create${type}(data: ${createInputType}!): ${type}! @requireAuth
    update${type}(_id: String!, update: ${updateInputType}!): ${type}!  @requireAuth
    delete${type}(_id: String!): ${type}!  @requireAuth
    like${type}(_id: String!): ${type}!  @requireAuth
    dislike${type}(_id: String!): ${type}!  @requireAuth
  }
`;

export default types;

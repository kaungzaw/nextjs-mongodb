import { gql } from "@apollo/client";

const type = "User";
const inputType = "UserInput";
const attributes = `
  _id: String!
  name: String!
`;

const types = gql`
  type ${type} {
    ${attributes}
  }

  input ${inputType} {
    ${attributes}
  }

  type Query {
    users: [${type}!] @requireAuth
  }
`;

export default types;

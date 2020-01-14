import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    users {
      id
      email
      password
      username
    }
  }
`;

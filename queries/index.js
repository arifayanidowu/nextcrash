import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    users {
      id
      email
      firstname
      lastname
      eid
      division
      subdivision
      phone
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation AddUser(
    $lastname: String!
    $firstname: String!
    $eid: String!
    $code: String!
    $phone: String!
    $division: String!
    $subdivision: String!
    $email: String!
  ) {
    addUser(
      lastname: $lastname
      firstname: $firstname
      eid: $eid
      code: $code
      phone: $phone
      division: $division
      subdivision: $subdivision
      email: $email
    ) {
      lastname
      firstname
      eid
      code
      phone
      division
      subdivision
      email
    }
  }
`;

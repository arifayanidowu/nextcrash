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
      online
    }
  }
`;

export const GET_USER = gql`
  query User($id: String!) {
    user(id: $id) {
      firstname
      lastname
      division
      subdivision
      email
      eid
      code
      phone
    }
  }
`;

export const AUTH_USER = gql`
  {
    authUser {
      id
      email
      firstname
      lastname
      eid
      division
      subdivision
      phone
      online
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

export const EDIT_USER = gql`
  mutation EditUser(
    $id: String
    $lastname: String!
    $firstname: String!
    $eid: String!
    $code: String!
    $phone: String!
    $division: String!
    $subdivision: String!
    $email: String!
  ) {
    editUser(
      id: $id
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

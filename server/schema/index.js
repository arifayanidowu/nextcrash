const { gql, ApolloError, ApolloServer } = require("apollo-server-express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const typeDefs = gql`
  type User {
    id: ID
    email: String
    password: String
    username: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(email: String!, password: String!, username: String!): User
  }
`;

const resolvers = {
  Query: {
    users: async (_, {}, { User }) => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Mutation: {
    addUser: async (_, { email, password, username }, { User }) => {
      try {
        const isEmail = await User.findOne({ email });
        if (isEmail) {
          throw new ApolloError("User already exist.");
        }
        const user = await new User();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.email = email;
        user.password = hash;
        user.username = username;

        return user.save();
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
};

const context = ({ req }) => {
  return {
    User
  };
};

const server = new ApolloServer({ typeDefs, resolvers, context });

module.exports = server;

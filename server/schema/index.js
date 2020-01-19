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

  type AuthData {
    token: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(email: String!, password: String!, username: String!): User
    login(email: String, password: String): AuthData
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
    },
    login: async (_, { email, password }, { User }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new ApolloError("User does not exist");
        }
        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
          throw new ApolloError("Password incorrect");
        } else {
          let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
          });
          return { token };
        }
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
};

const getUser = token => {
  if (token) {
    return jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  } else {
    return null;
  }
};

const context = ({ req }) => {
  const token = req.headers.authorization || "";
  const currentUser = getUser(token);
  return {
    User,
    currentUser
  };
};

const server = new ApolloServer({ typeDefs, resolvers, context });

module.exports = server;

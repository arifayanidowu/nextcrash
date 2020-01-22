const {
  gql,
  ApolloError,
  ApolloServer,
  AuthenticationError
} = require("apollo-server-express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const typeDefs = gql`
  type User {
    id: ID
    email: String
    firstname: String
    lastname: String
    eid: String
    phone: String
    code: String
    division: String
    subdivision: String
    role: String
    password: String
  }

  type AuthData {
    token: String
  }

  type Query {
    users: [User]
    user: User
    authUser: User
  }

  type Mutation {
    addUser(
      email: String!
      firstname: String!
      lastname: String!
      code: String!
      division: String!
      subdivision: String!
      phone: String!
      eid: String!
    ): User
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
    },

    authUser: async (_, {}, { User, currentUser }) => {
      if (!currentUser || currentUser === null) {
        throw new AuthenticationError("Unauthorized");
      }
      try {
        const user = await User.findOne({ _id: currentUser.userId });
        // console.log(user);
        return user;
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Mutation: {
    addUser: async (
      _,
      { email, firstname, lastname, code, eid, division, subdivision, phone },
      { User }
    ) => {
      try {
        const isEmail = await User.findOne({ email });
        if (isEmail) {
          throw new ApolloError("User already exist.");
        }
        const password = "password";
        const user = await new User();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.email = email;
        user.password = hash;
        user.firstname = firstname;
        user.lastname = lastname;
        user.code = code;
        user.eid = eid;
        user.division = division;
        user.subdivision = subdivision;
        user.phone = phone;
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

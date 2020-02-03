const {
  gql,
  ApolloError,
  ApolloServer,
  AuthenticationError
} = require("apollo-server-express");
const User = require("../models/User");
const Vendor = require("../models/Vendor");
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
    online: Boolean
    company_name: String
  }

  type VendorReg {
    id: ID
    email: String
    password: String
    company_name: String
  }

  type General_info {
    company_name: String
    registration_no: String
    office_address: String
    city: String
    state: String
    country: String
    company_tel: String
    company_email: String
    company_website: String
    contact_person: String
    designation: String
    contact_tel: String
    contact_email: String
  }

  input General_input {
    registration_no: String
    office_address: String
    city: String
    state: String
    country: String
    company_tel: String
    company_email: String
    company_website: String
    contact_person: String
    designation: String
    contact_tel: String
    contact_email: String
  }

  input Business_input {
    num_of_employee: String
    year_est: String
    tax_num: String
    vat_reg_no: String
  }

  type Business_info {
    num_of_employee: String
    year_est: String
    tax_num: String
    vat_reg_no: String
  }

  input Bank_input {
    acct_name: String
    acct_no: String
    bank: String
    sortCode: String
    branch: String
    bank_contact_phone: String
  }

  type Bank_details {
    acct_name: String
    acct_no: String
    bank: String
    sortCode: String
    branch: String
    bank_contact_phone: String
  }

  input Work_input {
    ref_company_name: String
    ref_company_address: String
    ref_contact_person: String
    ref_contact_designation: String
    ref_contact_email: String
    ref_contact_phone: String
  }

  type Work_reference {
    ref_company_name: String
    ref_company_address: String
    ref_contact_person: String
    ref_contact_designation: String
    ref_contact_email: String
    ref_contact_phone: String
  }

  input Individual_input {
    individual_name: String
    individual_address: String
    individual_email: String
    individual_phone: String
  }

  type Individual_reference {
    individual_name: String
    individual_address: String
    individual_email: String
    individual_phone: String
  }

  type Vendor {
    id: ID
    email: String
    password: String
    company_name: String
    role: String
    general_info: General_info
    business_info: Business_info
    bank_details: Bank_details
    work_reference: Work_reference
    individual_reference: Individual_reference
  }

  type AuthData {
    token: String
  }

  type Query {
    users: [User]
    user(id: String): User
    authUser: User
    vendors: [Vendor]
    vendor(id: String): Vendor
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
    editUser(
      id: ID
      email: String!
      firstname: String!
      lastname: String!
      code: String!
      division: String!
      subdivision: String!
      phone: String!
      eid: String!
    ): User

    vendorReg(company_name: String, email: String, password: String): VendorReg

    editVendor(
      id: ID
      company_name: String
      role: String
      general_info: General_input
      business_info: Business_input
      bank_details: Bank_input
      work_reference: Work_input
      individual_reference: Individual_input
    ): Vendor
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

    user: async (_, { id }, { User }) => {
      try {
        const user = await User.findOne({ _id: id });
        return user;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    vendor: async (_, { id }, { Vendor }) => {
      try {
        const vendor = await Vendor.findOne({ _id: id });
        return vendor;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    vendors: async (_, {}, { Vendor }) => {
      try {
        const vendors = await Vendor.find({});
        return vendors;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    authUser: async (_, {}, { User, currentUser, Vendor }) => {
      if (!currentUser || currentUser === null) {
        throw new AuthenticationError("Unauthorized");
      }
      try {
        const user = await User.findOne({ _id: currentUser.userId });
        const vendor = await Vendor.findOne({ _id: currentUser.vendorId });
        // console.log(user);
        if (user) {
          return user;
        } else if (vendor) {
          return vendor;
        } else {
          return null;
        }
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
    editUser: async (
      _,
      {
        id,
        email,
        firstname,
        lastname,
        code,
        eid,
        division,
        subdivision,
        phone
      },
      { User }
    ) => {
      try {
        const user = await User.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              email,
              firstname,
              lastname,
              code,
              eid,
              division,
              subdivision,
              phone
            }
          },
          { new: true }
        );
        return user;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    login: async (_, { email, password }, { User, Vendor }) => {
      try {
        const user = await User.findOne({ email });
        const vendor = await Vendor.findOne({ email });

        if (user) {
          const comparePass = await bcrypt.compare(password, user.password);
          if (!comparePass) {
            throw new ApolloError("Password incorrect");
          } else {
            let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: "1d"
            });

            await User.findOneAndUpdate(
              { email: email },
              { $set: { online: true } },
              { new: true }
            );

            return { token };
          }
        } else if (vendor) {
          const comparePass = await bcrypt.compare(password, vendor.password);
          if (!comparePass) {
            throw new ApolloError("Password incorrect");
          } else {
            let token = jwt.sign(
              { vendorId: vendor._id },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d"
              }
            );
            return { token };
          }
        } else {
          throw new ApolloError("User does not exist");
        }
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    vendorReg: async (_, { company_name, email, password }, { Vendor }) => {
      try {
        const isEmail = await Vendor.findOne({ email });
        if (isEmail) {
          throw new ApolloError("User already exist.");
        }
        const vendor = await new Vendor();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        vendor.email = email;
        vendor.company_name = company_name;
        vendor.password = hash;
        return vendor.save();
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    editVendor: async (
      _,
      {
        id,
        company_name,

        registration_no,
        office_address,
        city,
        state,
        country,
        company_tel,
        company_email,
        company_website,
        contact_person,
        designation,
        contact_tel,
        contact_email,
        num_of_employee,
        year_est,
        tax_num,
        vat_reg_no,
        acct_name,
        acct_no,
        bank,
        sortCode,
        branch,
        bank_contact_phone,
        ref_company_name,
        ref_company_address,
        ref_contact_person,
        ref_contact_designation,
        ref_contact_email,
        ref_contact_phone,

        individual_name,
        individual_address,
        individual_email,
        individual_phone
      },
      { Vendor }
    ) => {
      try {
        const payload = {
          company_name,
          general_info: {
            registration_no,
            office_address,
            city,
            state,
            country,
            company_tel,
            company_email,
            company_website,
            contact_person,
            designation,
            contact_tel,
            contact_email
          },
          business_info: { num_of_employee, year_est, tax_num, vat_reg_no },
          bank_details: {
            acct_name,
            acct_no,
            bank,
            sortCode,
            branch,
            bank_contact_phone
          },
          work_reference: {
            ref_company_name,
            ref_company_address,
            ref_contact_person,
            ref_contact_designation,
            ref_contact_email,
            ref_contact_phone
          },
          individual_reference: {
            individual_name,
            individual_address,
            individual_email,
            individual_phone
          }
        };
        const updatedVendor = await Vendor.findOneAndUpdate(
          { _id: id },
          { $set: payload },
          { new: true }
        );
        return updatedVendor;
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
    currentUser,
    Vendor
  };
};

const server = new ApolloServer({ typeDefs, resolvers, context });

module.exports = server;

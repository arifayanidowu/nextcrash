import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";

import Cookie from "js-cookie";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  fetch: fetch
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem("token");
  const token = Cookie.get("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const linkErr = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink, linkErr),
  cache: new InMemoryCache(),
  ssrForceFetchDelay: 100,
  ssrMode: true
});

export default client;

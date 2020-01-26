import App from "next/app";
import React, { useState, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ApolloProvider } from "@apollo/react-hooks";

import themeConfig from "../theme";
import Layout from "../components/Layout";
import axios from "axios";

import client from "../connect";
import { parseCookies } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import CookieComponent from "../components/CookieComponent";
import Cookie from "js-cookie";

const useDarkMode = () => {
  const [theme, setTheme] = useState(themeConfig);

  const {
    palette: { type }
  } = theme;

  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light"
      }
    };
    setTheme(updatedTheme);
  };

  return [theme, toggleDarkMode];
};

function MyApp({ Component, pageProps }) {
  const [theme, toggleDarkMode] = useDarkMode();
  const themeConfig = createMuiTheme(theme);
  const [privacy, setPrivacy] = useState(false);
  const privacyToken = Cookie.get("privacyToken");

  useEffect(() => {
    const abortController = new AbortController();

    if (privacyToken) {
      setPrivacy(false);
    } else {
      setPrivacy(true);
    }

    return () => {
      abortController.abort();
    };
  });

  const handleSetCookie = () => {
    Cookie.set("privacyToken", "Accepted", { expires: 1 });
    setPrivacy(false);
  };

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={themeConfig}>
        <CssBaseline />

        <Layout toggleDarkMode={toggleDarkMode} {...pageProps}>
          <Component {...pageProps} toggleDarkMode={toggleDarkMode} />
        </Layout>
        <CookieComponent privacy={privacy} handleSetCookie={handleSetCookie} />
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const { token } = parseCookies(ctx);
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!token) {
    const isProtectedRoute =
      ctx.pathname === "/vendor/add" ||
      ctx.pathname === "/users" ||
      ctx.pathname === "/users/create" ||
      ctx.pathname === "/notifications";

    if (isProtectedRoute) {
      redirectUser(ctx, "/login");
    }

    pageProps.user = null;
  } else {
    pageProps.token = token;

    const res = await axios({
      method: "POST",
      url: `${baseUrl}/graphql`,
      data: {
        query: `
            {
              authUser {
                id
                email
                eid
                firstname
                lastname
                division
                subdivision
                phone
                online
              }
            }
        
        `
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    pageProps.user = await res.data.data;
  }
  return {
    pageProps
  };
};

export default MyApp;

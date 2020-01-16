import App from "next/app";
import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ApolloProvider } from "@apollo/react-hooks";

import themeConfig from "../theme";
import Layout from "../components/Layout";

import client from "../connect";

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

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={themeConfig}>
        <CssBaseline />

        <Layout toggleDarkMode={toggleDarkMode} {...pageProps}>
          <Component {...pageProps} toggleDarkMode={toggleDarkMode} />
        </Layout>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  appProps.pageProps.auth = true;

  return { ...appProps };
};

export default MyApp;

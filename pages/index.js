import React from "react";
import HomeComponent from "../components/HomeComponent";
import { Typography } from "@material-ui/core";
import Landing from "../components/Landing";

const Home = ({ toggleDarkMode, token }) => {
  return (
    <div>
      {!token ? <Landing /> : <HomeComponent toggleDarkMode={toggleDarkMode} />}
    </div>
  );
};

export default Home;

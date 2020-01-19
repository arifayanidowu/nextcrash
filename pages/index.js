import React from "react";
import HomeComponent from "../components/HomeComponent";
import { Typography } from "@material-ui/core";
import Landing from "../components/Landing";

const Home = ({ toggleDarkMode, auth }) => {
  return (
    // <div>
    //   {auth ? <Landing /> : <HomeComponent toggleDarkMode={toggleDarkMode} />}
    // </div>
    <div>
      <HomeComponent toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default Home;

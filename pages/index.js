import React from "react";
import HomeComponent from "../components/HomeComponent";

const Home = ({ toggleDarkMode }) => {
  return (
    <div>
      <HomeComponent toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default Home;

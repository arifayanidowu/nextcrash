import React from "react";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";

const Home = ({ toggleDarkMode, token, user }) => {
  return (
    <div>
      {!token ? (
        <Landing />
      ) : (
        <Dashboard toggleDarkMode={toggleDarkMode} user={user} />
      )}
    </div>
  );
};

export default Home;

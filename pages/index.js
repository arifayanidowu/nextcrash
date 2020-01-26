import React from "react";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import Policy from "../components/Policy";

const Home = ({ toggleDarkMode, token, user }) => {
  return (
    <div>
      {!token ? (
        <>
          <Landing />
          <Policy />
        </>
      ) : (
        <Dashboard toggleDarkMode={toggleDarkMode} user={user} />
      )}
    </div>
  );
};

export default Home;

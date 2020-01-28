import React from "react";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import Policy from "../components/Policy";
import Footer from "../components/Footer";

const Home = ({ toggleDarkMode, token, user }) => {
  return (
    <div>
      {!token ? (
        <>
          <Landing />
          <Policy />
          <Footer />
        </>
      ) : (
        <Dashboard toggleDarkMode={toggleDarkMode} user={user} />
      )}
    </div>
  );
};

export default Home;

import React from "react";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import Policy from "../components/Policy";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  bgColor: {
    backgroundImage: "url(/wavy.png)",
    backgroundPosition: "50% 80%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
    // backgroundAttachment: "fixed"
  }
}));

const Home = ({ toggleDarkMode, token, user }) => {
  const classes = useStyles();
  return (
    <div>
      {!token ? (
        <>
          <Landing />
          <div className={classes.bgColor}>
            <Policy />
            <Footer />
          </div>
        </>
      ) : (
        <Dashboard toggleDarkMode={toggleDarkMode} user={user} />
      )}
    </div>
  );
};

export default Home;

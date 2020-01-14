import React from "react";
import { Button } from "@material-ui/core";
import Navbar from "./Navbar";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

export default function Layout({ children, toggleDarkMode }) {
  const classes = useStyles();
  return (
    <>
      <Navbar toggleDarkMode={toggleDarkMode} />
      <div className={classes.root}>{children}</div>
    </>
  );
}

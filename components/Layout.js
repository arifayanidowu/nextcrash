import React from "react";
import { Button } from "@material-ui/core";
import Navbar from "./Navbar";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
    marginTop: 40
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function Layout({ children, toggleDarkMode }) {
  const classes = useStyles();
  return (
    <>
      <title>RSEDGE</title>
      <Navbar toggleDarkMode={toggleDarkMode}>{children}</Navbar>
    </>
  );
}

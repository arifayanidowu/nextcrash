import React from "react";
import { Button } from "@material-ui/core";
import Navbar from "./Navbar";
import { makeStyles } from "@material-ui/styles";
import PerfectScrollbar from "react-perfect-scrollbar";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(6),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
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
    padding: theme.spacing(3),
    paddingTop: theme.spacing(8),
    marginTop: 40
  }
}));

export default function Layout({ children, toggleDarkMode, auth }) {
  const classes = useStyles();
  return (
    <>
      <title>RSEDGE</title>
      <Navbar toggleDarkMode={toggleDarkMode}>
        <PerfectScrollbar>
          <div className={classes.content}>{children}</div>
        </PerfectScrollbar>
      </Navbar>
    </>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "60vh",
    backgroundImage: "url(/wavy.png)",
    backgroundPosition: "50% 80%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "relative",
    overflow: "hidden"
  },
  logo: {
    textTransform: "uppercase",
    marginTop: 80,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "50%"
  },
  footer: {
    marginTop: 80,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",

    "& > *": {
      color: theme.palette.common.white,
      marginRight: 10
    }
  },
  center: {
    textAlign: "center"
  },
  copyright: {
    marginTop: 80,
    textAlign: "center",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      marginTop: 130
    }
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.center}>
        <img src="/gelly.png" width="80" className={classes.logo} />
      </div>

      <div className={classes.footer}>
        <Link href="/">
          <a>Terms of Use</a>
        </Link>
        <Link href="/">
          <a>Privacy Policy</a>
        </Link>
        <Link href="/">
          <a>Cookie Policy</a>
        </Link>
      </div>
      <div className={classes.copyright}>
        &copy; Copyright {new Date().getFullYear()}, RusselSmith Edge
      </div>
    </div>
  );
}

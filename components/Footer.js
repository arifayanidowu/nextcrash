import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Divider } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "60vh",
    padding: theme.spacing(8),
    position: "relative",
    overflow: "hidden"
  },
  logo: {
    textTransform: "uppercase",
    marginTop: 80,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "50%",
    position: "relative",
    height: "100%"
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
    marginTop: 40,
    textAlign: "center",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      marginTop: 80
    }
  },
  divider: {
    background: "#172837",
    margin: "auto",
    marginTop: -50,
    zIndex: -1,
    width: "40%"
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.center}>
        <img src="/gelly.png" width="80" className={classes.logo} />
        <Divider variant="middle" className={classes.divider} />
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

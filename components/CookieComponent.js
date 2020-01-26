import React, { useState, useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    transition: "all 300ms ease-out",
    backgroundColor: "#ff7043",
    color: theme.palette.background.paper,
    zIndex: 1000000,
    overflow: "hidden",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  link: {
    color: theme.palette.background.paper
  }
}));

const CustomButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.background.paper}`,
    transititon: "all 300ms ease-out",
    cursor: "pointer",
    color: "#ff7043",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.background.paper
    }
  }
}))(Button);

export default function CookieComponent({ privacy, handleSetCookie }) {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{ display: privacy ? "block" : "none" }}
    >
      <Typography
        variant="overline"
        style={{ fontFamily: "Rubik", fontWeight: 900 }}
        gutterBottom
      >
        Why We Use Cookies
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Typography paragraph style={{ fontSize: 14, fontWeight: 700 }}>
            This site uses cookies to make your browsing experience more
            convenient and personal. Cookies store useful information on your
            computer to help us improve the efficiency and relevance of our site
            for you. In some cases, they are essential to making the site work
            properly. By accessing this site, you consent to the use of cookies.
            For more information, refer to RSEDGE’s{" "}
            <Link href="/">
              <a className={classes.link}> privacy policy</a>
            </Link>{" "}
            and{" "}
            <Link href="/">
              <a className={classes.link}>cookie policy.</a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <CustomButton size="large" onClick={handleSetCookie}>
            I Understand
          </CustomButton>
        </Grid>
      </Grid>
    </div>
  );
}

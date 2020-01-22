import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundImage: "url(/bg-pattern.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    // backgroundColor: "#000",
    position: "relative",
    overflor: "hidden"
    // backgroundAttachment: "fixed"
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.75)"
  },
  text: {
    // color: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
    textTransform: "uppercase",
    fontWeight: 600
  },
  icon: {
    opacity: 1,
    transform: "translateX(0)",
    transition: "transform 300ms ease-in-out"
  },
  iconAnimate: {
    "&:hover svg": {
      animation: "$slideIn 300ms ease-in-out forwards"
    }
  },
  "@keyframes slideIn": {
    from: {
      opacity: 0,
      transform: "translateX(-5px)"
    },
    to: {
      opacity: 1,
      transform: "translateX(3px)"
    }
  },
  ball: {
    position: "absolute",
    top: "50%",
    left: "10%",
    animation: "$bounce 2s 300ms ease-in-out alternate infinite",
    animationPlayState: "running",
    // borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      top: "80%"
    }
  },
  "@keyframes bounce": {
    "0%": {
      transform: "translateY(-5px)"
    },

    "100%": {
      transform: "translateY(5px)"
    }
  }
}));

export default function Landing() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root}>
      {/* <div className={classes.overlay} /> */}
      <div className={classes.center}>
        <Typography className={classes.text} variant="h3" gutterBottom>
          Welcome to Russelsmith Edge
        </Typography>

        <Typography className={classes.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, rem!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.iconAnimate}
          onClick={() => router.push("/login")}
        >
          Get Started <ChevronRightIcon className={classes.icon} />
        </Button>
      </div>
      <div>
        <img
          className={classes.ball}
          width="100px"
          height="100px"
          src="/magnet.png"
          alt="ball"
        />
      </div>
    </div>
  );
}

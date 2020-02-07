import React, { useState } from "react";
import { Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Link from "next/link";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import { handleLogin } from "../utils/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import Feedback from "./Feedback";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundImage: "url(/login-bg.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
    // height: "100vh"
    // backgroundImage:
    //   "radial-gradient(circle at 17% 36%, rgba(35, 35, 35,0.06) 0%, rgba(35, 35, 35,0.06) 25%,rgba(42, 42, 42,0.06) 25%, rgba(42, 42, 42,0.06) 50%,rgba(48, 48, 48,0.06) 50%, rgba(48, 48, 48,0.06) 75%,rgba(55, 55, 55,0.06) 75%, rgba(55, 55, 55,0.06) 100%),radial-gradient(circle at 4% 82%, rgba(0, 0, 0,0.06) 0%, rgba(0, 0, 0,0.06) 25%,rgba(39, 39, 39,0.06) 25%, rgba(39, 39, 39,0.06) 50%,rgba(78, 78, 78,0.06) 50%, rgba(78, 78, 78,0.06) 75%,rgba(117, 117, 117,0.06) 75%, rgba(117, 117, 117,0.06) 100%),radial-gradient(circle at 45% 66%, rgba(64, 64, 64,0.06) 0%, rgba(64, 64, 64,0.06) 25%,rgba(91, 91, 91,0.06) 25%, rgba(91, 91, 91,0.06) 50%,rgba(117, 117, 117,0.06) 50%, rgba(117, 117, 117,0.06) 75%,rgba(144, 144, 144,0.06) 75%, rgba(144, 144, 144,0.06) 100%),linear-gradient(129deg, rgb(29, 29, 29),rgb(24, 24, 24))"
  },
  card: {
    minWidth: 275,
    width: "50%",
    margin: "auto",
    padding: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
      width: "80%"
    }
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
  center: {
    textAlign: "center",
    height: "100vh",
    paddingTop: "150px"
  },
  form: {},
  textField: {
    marginBottom: theme.spacing(3)
  },
  link: {
    color: theme.palette.secondary.black
  }
}));

export default function ForgotPass() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: ""
  });

  const handleChange = e => {
    setState(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  return (
    <div className={classes.root}>
      <div className={classes.center}>
        <Card className={classes.card}>
          <Typography align="center" variant="h3" gutterBottom>
            Forgot Your Password?
          </Typography>
          <Typography align="center" variant="subtitle1" gutterBottom>
            Fill out your email address, and we’ll send you instructions to
            reset your password.
          </Typography>
          <form className={classes.form}>
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              placeholder="Email"
              fullWidth
              className={classes.textField}
              onChange={handleChange}
              value={state.email}
            />
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              type="submit"
              size="large"
              disabled={!state.email || loading}
            >
              {loading ? (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  Loading...
                  <CircularProgress size={20} />
                </span>
              ) : (
                <>
                  Email me some help <ArrowForwardIcon />
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

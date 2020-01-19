import React, { useState } from "react";
import { Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh"
    // backgroundImage:
    //   "radial-gradient(circle at 17% 36%, rgba(35, 35, 35,0.06) 0%, rgba(35, 35, 35,0.06) 25%,rgba(42, 42, 42,0.06) 25%, rgba(42, 42, 42,0.06) 50%,rgba(48, 48, 48,0.06) 50%, rgba(48, 48, 48,0.06) 75%,rgba(55, 55, 55,0.06) 75%, rgba(55, 55, 55,0.06) 100%),radial-gradient(circle at 4% 82%, rgba(0, 0, 0,0.06) 0%, rgba(0, 0, 0,0.06) 25%,rgba(39, 39, 39,0.06) 25%, rgba(39, 39, 39,0.06) 50%,rgba(78, 78, 78,0.06) 50%, rgba(78, 78, 78,0.06) 75%,rgba(117, 117, 117,0.06) 75%, rgba(117, 117, 117,0.06) 100%),radial-gradient(circle at 45% 66%, rgba(64, 64, 64,0.06) 0%, rgba(64, 64, 64,0.06) 25%,rgba(91, 91, 91,0.06) 25%, rgba(91, 91, 91,0.06) 50%,rgba(117, 117, 117,0.06) 50%, rgba(117, 117, 117,0.06) 75%,rgba(144, 144, 144,0.06) 75%, rgba(144, 144, 144,0.06) 100%),linear-gradient(129deg, rgb(29, 29, 29),rgb(24, 24, 24))"
  },
  card: {
    minWidth: 275,
    width: "70%",
    margin: "auto",
    padding: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3)
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
    paddingTop: theme.spacing(20)
  },
  form: {},
  textField: {
    marginBottom: theme.spacing(3)
  }
}));

export default function Login() {
  const classes = useStyles();
  const [togglePassword, setTogglePassword] = useState(false);

  const onToggle = () => {
    setTogglePassword(!togglePassword);
  };
  return (
    <div className={classes.root}>
      <div className={classes.center}>
        <Card className={classes.card}>
          <Typography align="center" variant="h3" gutterBottom>
            LOGIN
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
            />
            <TextField
              id="password"
              type={togglePassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              placeholder="Password"
              fullWidth
              className={classes.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onToggle}>
                      {togglePassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              variant="contained"
              fullWidth
              color="secondary"
              type="submit"
              size="large"
            >
              Login
            </Button>
          </form>
          <Grid
            container
            justify="space-between"
            alignContent="flex-start"
            style={{ marginTop: 5 }}
          >
            <Link href="/">
              <a>Forgot Password?</a>
            </Link>

            <Link href="/">
              <a>Are you a New Vendor? click to Create an Account</a>
            </Link>
          </Grid>
        </Card>
      </div>
    </div>
  );
}

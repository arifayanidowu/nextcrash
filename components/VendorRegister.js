import React from "react";
import {
  Typography,
  makeStyles,
  Grid,
  Paper,
  Divider,
  CardHeader,
  CardContent,
  FormControl
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from "next/link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useTheme } from "@material-ui/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useMutation } from "@apollo/react-hooks";
import { VENDOR_REG } from "../queries";
import Feedback from "./Feedback";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundImage: "url(/login-bg.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    height: "100%"
  },
  center: {
    padding: theme.spacing(8),
    flexGrow: 1,
    textAlign: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4)
    }
  },
  card: {
    margin: "auto",
    marginTop: theme.spacing(8)
  },
  form: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(6)
  },
  info: {
    padding: theme.spacing(4)
  },
  textField: {
    marginBottom: theme.spacing(4)
  },
  content: {
    backgroundImage: "url(/dots.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  link: {
    color: "#333",
    margin: theme.spacing(3),
    display: "block"
  },
  message: {
    fontFamily: "Rubik"
  }
}));

const INIT_STATE = {
  email: "",
  password: "",
  company_name: "",
  open: false,
  message: "",
  success: false
};

export default function VendorRegister() {
  const classes = useStyles();
  const [value, setValue] = React.useState(INIT_STATE);
  const [togglePassword, setTogglePassword] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(4);
  const [vendorReg, { loading }] = useMutation(VENDOR_REG);
  const theme = useTheme();

  const handleChange = event => {
    event.persist();
    const { target } = event;
    setValue(prevState => ({ ...prevState, [target.id]: target.value }));
  };

  const onToggle = () => {
    setTogglePassword(!togglePassword);
  };

  const onSetTerms = e => {
    setTerms(!terms);
  };

  const isValidated = !(
    value.email &&
    value.password &&
    value.company_name &&
    terms
  );

  const handleCloseFeed = () => {
    setValue(prevState => ({ ...prevState, open: false }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    vendorReg({
      variables: {
        email: value.email,
        password: value.password,
        company_name: value.company_name
      }
    })
      .then(doc => {
        setValue(INIT_STATE);
        setValue(prevState => ({
          ...prevState,
          open: !value.open,
          message:
            "Your Account has been registered, Please kindly visit the link sent to your email to verify your account.",
          success: true
        }));
        setTerms(false);

        console.log(doc.data);
      })
      .catch(err => {
        console.error(err);
        setValue(INIT_STATE);
        setValue(prevState => ({
          ...prevState,
          open: !value.open,
          message:
            "An Unexpected error has occurred, Please kindly check your details and try again.",
          success: false
        }));
      });
  };

  return (
    <div className={classes.root}>
      {value.success ? (
        <Feedback
          handleCloseFeed={handleCloseFeed}
          open={value.open}
          severity="success"
          message={value.message}
        />
      ) : (
        <Feedback
          handleCloseFeed={handleCloseFeed}
          open={value.open}
          severity="error"
          message={value.message}
        />
      )}
      <div className={classes.center}>
        <Card className={classes.card} elevation={5}>
          <CardHeader
            title={
              <Typography
                align="center"
                variant="h5"
                gutterBottom
                style={{
                  marginBottom: 25,
                  fontFamily: "Rubik",
                  fontWeight: 900
                }}
              >
                NEW VENDOR REGISTRATION
              </Typography>
            }
          />
          <Grid container spacing={2} style={{ borderTop: "1px solid #ccc" }}>
            <Grid item md={6} xs={12} className={classes.content}>
              <div className={classes.info}>
                <Typography variant="h3" component="h1" gutterBottom>
                  HOW TO REGISTER
                </Typography>
                <Typography
                  paragraph
                  style={{ lineHeight: 2 }}
                  className={classes.message}
                >
                  To begin the registration process, kindly follow the steps
                  listed below.
                </Typography>
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  variant="outlined"
                  style={{
                    backgroundColor: "transparent",
                    textAlign: "start"
                  }}
                >
                  <Step>
                    <StepLabel>
                      <Typography className={classes.message}>
                        kindly fill the form fields with the required details
                      </Typography>
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      <Typography className={classes.message}>
                        You will receive an email with a link to verify your
                        account
                      </Typography>
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      <Typography className={classes.message}>
                        When you click on the link in the email message, you
                        will be asked to login
                      </Typography>
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      <Typography className={classes.message}>
                        login and complete the rest of the registration process.
                      </Typography>
                    </StepLabel>
                  </Step>
                </Stepper>

                <Typography
                  variant="subtitle1"
                  color="secondary"
                  className={classes.message}
                >
                  * Please kindly follow the steps listed above.
                </Typography>
              </div>
            </Grid>

            <Grid item md={6} xs={12}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  id="company_name"
                  type="text"
                  label="Company Name"
                  placeholder="Company Name"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                  value={value.company_name}
                  onChange={handleChange}
                />
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                  value={value.email}
                  onChange={handleChange}
                />
                <TextField
                  id="password"
                  type={togglePassword ? "text" : "password"}
                  label="Password"
                  placeholder="Password"
                  variant="outlined"
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
                  value={value.password}
                  onChange={handleChange}
                />
                <FormControl
                  component="fieldset"
                  fullWidth
                  style={{ marginBottom: 15 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={terms}
                        onChange={onSetTerms}
                        value="terms"
                      />
                    }
                    label={
                      <span style={{ fontFamily: "Rubik" }}>
                        I agree to RusselSmith's{" "}
                        <Link href="/terms">
                          <a style={{ color: theme.palette.secondary.light }}>
                            Terms of Use
                          </a>
                        </Link>{" "}
                        &amp;{" "}
                        <Link href="/privacy">
                          <a style={{ color: theme.palette.secondary.light }}>
                            Privacy Policy
                          </a>
                        </Link>
                      </span>
                    }
                  />
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="secondary"
                  size="large"
                  disabled={isValidated || loading}
                  style={{
                    cursor: isValidated ? "not-allowed" : "pointer",
                    pointerEvents: "all"
                  }}
                >
                  {loading ? (
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      Loading... <CircularProgress size={20} />
                    </span>
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
              </form>
              <Link href="/login">
                <a className={classes.link}>Already have an account? Login</a>
              </Link>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  );
}

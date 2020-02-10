import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { countries } from "../utils/countries";
import { divisions, subdivisions } from "../utils/divisions";
import { CREATE_USER, GET_USERS } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    width: "100%",
    margin: "auto",
    padding: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3)
    }
  },
  textField: {
    marginBottom: theme.spacing(3)
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120
  },
  option: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    lineHeight: 2
  },
  label: {
    background: theme.palette.background.paper,
    padding: 3
  },
  select: {
    "&:focus": {
      background: theme.palette.background.paper
    }
  }
}));

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, char =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const INIT_STATE = {
  lastname: "",
  firstname: "",
  email: "",
  eid: "",
  division: "",
  subdivision: "",
  phone: ""
};

export default function CreateAccount({ user }) {
  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [code, setCode] = useState(null);
  const [state, setState] = useState(INIT_STATE);
  const [age, setAge] = useState("");
  const [addUser] = useMutation(CREATE_USER, {
    refetchQueries: [
      {
        query: GET_USERS
      }
    ],
    variables: {
      id: user.authUser.id
    }
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const defaultProps = {
    options: countries,
    getOptionLabel: option => option.phone,
    renderOption: option => (
      <React.Fragment>
        {/* <span>{countryToFlag(option.code)}</span> */}
        {option.label} ({option.code}) +{option.phone}
      </React.Fragment>
    )
  };

  const handleChange = e => {
    e.persist();
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleAge = e => {
    e.persist();
    setAge(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      ...state,
      code: `+${code.phone}`
    };
    setLoading(true);
    addUser({
      variables: {
        firstname: payload.firstname,
        lastname: payload.lastname,
        eid: payload.eid,
        email: payload.email,
        code: payload.code,
        division: payload.division,
        subdivision: payload.subdivision,
        phone: payload.phone
      }
    })
      .then(doc => {
        setState(INIT_STATE);
        setCode(null);
        setLoading(false);
        setTimeout(() => {
          router.push("/users");
        }, 1000);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <Typography align="center" variant="h5" component="h1" gutterBottom>
        Create User Account
      </Typography>
      {/* <Typography>uchechi ngonadi</Typography> */}
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                id="lastname"
                name="lastname"
                type="text"
                label="Lastname"
                variant="outlined"
                placeholder="Lastname"
                fullWidth
                className={classes.textField}
                value={state.lastname}
                required
                onChange={handleChange}
                error={!state.lastname ? true : false}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="firstname"
                name="firstname"
                type="text"
                label="Firstname"
                variant="outlined"
                placeholder="Firstname"
                fullWidth
                className={classes.textField}
                required
                value={state.firstname}
                onChange={handleChange}
                error={!state.firstname ? true : false}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                // margin="normal"
                fullWidth
                required
                error={!state.division ? true : false}
              >
                <InputLabel
                  ref={inputLabel}
                  htmlFor="division"
                  className={classes.label}
                >
                  Divisions
                </InputLabel>
                <Select
                  native
                  // labelWidth={labelWidth}
                  inputProps={{
                    name: "division",
                    id: "division"
                  }}
                  value={state.division}
                  onChange={handleChange}
                  className={classes.select}
                >
                  <option className={classes.option} value="" />
                  {divisions.map((division, i) => (
                    <option
                      className={classes.option}
                      key={i}
                      value={division.name}
                    >
                      {division.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
                // required
              >
                <InputLabel
                  ref={inputLabel}
                  htmlFor="subdivision"
                  id="subdivision"
                  className={classes.label}
                >
                  Sub Divisions
                </InputLabel>
                <Select
                  native
                  // labelWidth={labelWidth}
                  labelId="subdivision"
                  inputProps={{
                    name: "subdivision",
                    id: "subdivision"
                  }}
                  name="subdivision"
                  onChange={handleChange}
                  value={state.subdivision}
                  disabled={
                    state.division === "Topside" ||
                    state.division === "Subsea" ||
                    state.division === "UAV & Digital Solutions" ||
                    state.division === "Niger Delta Regional" ||
                    state.division === "Operations & Production"
                  }
                >
                  <option value="" />
                  {state.division === "Topside" ? (
                    <option value="Topside">Topside</option>
                  ) : state.division === "Subsea" ? (
                    <option value="Subsea">Subsea</option>
                  ) : state.division === "UAV & Digital Solutions" ? (
                    <option value="UAV & Digital Solutions">
                      UAV & Digital Solutions
                    </option>
                  ) : state.division === "Niger Delta Regional" ? (
                    <option value="Niger Delta Regional">
                      Niger Delta Regional
                    </option>
                  ) : state.division === "Operations & Production" ? (
                    <option value="Operations & Production">
                      Operations & Production
                    </option>
                  ) : (
                    subdivisions.map((sub, i) => (
                      <option key={i} value={sub.name}>
                        {sub.name}
                      </option>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                placeholder="Email"
                fullWidth
                className={classes.textField}
                required
                value={state.email}
                onChange={handleChange}
                error={!state.email ? true : false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="eid"
                name="eid"
                type="text"
                label="EID"
                variant="outlined"
                placeholder="EID"
                fullWidth
                className={classes.textField}
                required
                value={state.eid}
                onChange={handleChange}
                error={!state.eid ? true : false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                className={classes.textField}
                id="country-code"
                {...defaultProps}
                value={code}
                onChange={(event, newValue) => {
                  setCode(newValue);
                }}
                style={{ marginTop: -15 }}
                autoComplete
                autoHighlight
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Country code"
                    margin="normal"
                    fullWidth
                    required
                    variant="outlined"
                    error={!code ? true : false}
                    value={code}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "disabled",
                      name: "code"
                    }}
                    helperText={
                      !code ? (
                        <Typography variant="inherit" color="secondary">
                          * Please Select Country Code
                        </Typography>
                      ) : (
                        ""
                      )
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="phone"
                name="phone"
                type="text"
                label="Phone"
                variant="outlined"
                placeholder="Phone"
                fullWidth
                className={classes.textField}
                required
                value={state.phone}
                onChange={handleChange}
                error={!state.phone ? true : false}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            disabled={
              !(
                state.division &&
                state.phone &&
                state.lastname &&
                state.firstname &&
                state.email &&
                code &&
                state.eid
              ) || loading
            }
            style={{
              cursor:
                !(
                  state.division &&
                  state.phone &&
                  state.lastname &&
                  state.firstname &&
                  state.email &&
                  code &&
                  state.eid
                ) || loading
                  ? "not-allowed"
                  : "pointer",
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
                Loading...
                <CircularProgress size={20} />
              </span>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}

import React from "react";
import { Typography, makeStyles, Grid, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  //   root: {
  //     width: "100%",
  //     backgroundImage: "url(/login-bg.png)",
  //     backgroundSize: "cover",
  //     backgroundPosition: "center",
  //     backgroundRepeat: "no-repeat"
  //   },
  center: {
    // padding: theme.spacing(6),
    flexGrow: 1,
    textAlign: "center",
    height: "100vh"
  },
  card: {
    margin: "auto",
    marginTop: theme.spacing(4),
    padding: theme.spacing(4)
  },
  textField: {
    marginBottom: theme.spacing(4)
  }
}));

export default function Add() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [togglePassword, setTogglePassword] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    setValue(value + 1);
  };

  const handlePrev = () => {
    setValue(value - 1);
  };

  const onToggle = () => {
    setTogglePassword(!togglePassword);
  };

  return (
    <div>
      <div className={classes.center}>
        <Card className={classes.card}>
          <Typography align="center" variant="h5" gutterBottom>
            New Vendor Registration
          </Typography>
          <form>
            <AppBar position="static">
              {/* <Paper square> */}
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                centered
              >
                <Tab label="General Information" {...a11yProps(0)} />
                <Tab label="Business Information" {...a11yProps(1)} />
                <Tab label="Bank Details" {...a11yProps(2)} />
                <Tab label="Work Reference" {...a11yProps(3)} />
              </Tabs>
              {/* </Paper> */}
            </AppBar>
            <TabPanel value={value} index={0}>
              <TextField
                id="company_name"
                type="text"
                label="Company Name"
                placeholder="Company Name"
                variant="outlined"
                fullWidth
                className={classes.textField}
              />
              <TextField
                id="email"
                type="email"
                label="Email"
                placeholder="Email"
                variant="outlined"
                fullWidth
                className={classes.textField}
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
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
          </form>
          <Grid container justify="center" spacing={3}>
            <Grid item>
              {value > 0 && (
                <Button
                  variant="contained"
                  onClick={handlePrev}
                  disabled={value <= 0}
                >
                  Prev
                </Button>
              )}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={value >= 3}
                style={{ cursor: value >= 3 && "not-allowed" }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  );
}

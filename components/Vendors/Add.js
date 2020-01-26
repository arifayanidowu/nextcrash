import React from "react";
import { Typography, makeStyles, Grid, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { countries } from "../../utils/countries";

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, char =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

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
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4)
  },
  textField: {
    marginBottom: theme.spacing(4)
  }
}));

export default function Add() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [code, setCode] = React.useState(null);

  const defaultProps = {
    options: countries,
    getOptionLabel: option => option.label,
    renderOption: option => (
      <React.Fragment>
        <span>{countryToFlag(option.code)}</span>
        {option.label} ({option.code})
      </React.Fragment>
    )
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    setValue(value + 1);
  };

  const handlePrev = () => {
    setValue(value - 1);
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
                <Tab
                  style={{ fontFamily: "Rubik" }}
                  label="General Information"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ fontFamily: "Rubik" }}
                  label="Business Information"
                  {...a11yProps(1)}
                />
                <Tab
                  style={{ fontFamily: "Rubik" }}
                  label="Bank Details"
                  {...a11yProps(2)}
                />
                <Tab
                  style={{ fontFamily: "Rubik" }}
                  label="Work Reference"
                  {...a11yProps(3)}
                />
              </Tabs>
              {/* </Paper> */}
            </AppBar>
            <TabPanel value={value} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="company_name"
                    type="text"
                    label="Company Name"
                    placeholder="Company Name"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="registration_number"
                    type="text"
                    label="Registration Number"
                    placeholder="Registration Number"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    required
                    id="office_address"
                    type="text"
                    label="Office Address"
                    placeholder="Office Address"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="city"
                    type="text"
                    label="City"
                    placeholder="City"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="state"
                    type="text"
                    label="State"
                    placeholder="State"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
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
                        label="Country"
                        margin="normal"
                        fullWidth
                        required
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "disabled",
                          name: "code"
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="company_phone"
                    type="tel"
                    label="Company Telephone"
                    placeholder="Company Telephone"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="company_email"
                    type="email"
                    label="Company Email"
                    placeholder="Company Email"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="company_website"
                    type="url"
                    label="Company Website"
                    placeholder="Company Website"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="contact_person"
                    type="text"
                    label="Contact Person"
                    placeholder="Contact Person"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="designation"
                    type="text"
                    label="Designation"
                    placeholder="Designation"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="contact_telephone"
                    type="tel"
                    label="Contact Telephone"
                    placeholder="Contact Telephone"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="contact_email"
                    type="email"
                    label="Contact Email"
                    placeholder="Contact Email"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="no_of_employee"
                    type="text"
                    label="No Of Employee"
                    placeholder="No Of Employee"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="year_established"
                    type="text"
                    label="Year Established"
                    placeholder="Year Established"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="tax_no"
                    type="text"
                    label="Tax Identification No."
                    placeholder="Tax Identification No."
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="vat_no"
                    type="text"
                    label="VAT Registration No."
                    placeholder="VAT Registration No."
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="acct_name"
                    type="text"
                    label="Account Name"
                    placeholder="Account Name"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="acct_no"
                    type="text"
                    label="Account Number"
                    placeholder="Account Number"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="bank"
                    type="text"
                    label="Bank"
                    placeholder="Bank"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="sort_code"
                    type="text"
                    label="Sort Code"
                    placeholder="Sort Code"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="branch"
                    type="text"
                    label="Branch"
                    placeholder="Branch"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="bank_contact_phone"
                    type="text"
                    label="Contact Phone"
                    placeholder="Contact Phone"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="coy_name"
                    type="text"
                    label="Company Name"
                    placeholder="Company Name"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="coy_address"
                    type="text"
                    label="Company Address"
                    placeholder="Company Address"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="coy_person"
                    type="text"
                    label="Contact Person"
                    placeholder="Contact Person"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="contact_designation"
                    type="text"
                    label="Contact Designation"
                    placeholder="Contact Designation"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="contact_email"
                    type="email"
                    label="Contact Email"
                    placeholder="Contact Email"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="contact_phone"
                    type="tel"
                    label="Contact Phone"
                    placeholder="Contact Phone"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item md={12}>
                  <Typography variant="h6" component="h1" align="left">
                    Individual Reference:
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    id="ref_name"
                    type="text"
                    label="Name"
                    placeholder="Name"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    id="ref_address"
                    type="text"
                    label="Address"
                    placeholder="Address"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    id="ref_email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    id="ref_phone"
                    type="tel"
                    label="Phone"
                    placeholder="Phone"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                >
                  submit
                </Button>
              </Grid>
            </TabPanel>
          </form>
          <Grid container justify="center" spacing={3}>
            <Grid item>
              <Button
                variant="contained"
                onClick={handlePrev}
                disabled={value <= 0}
                style={{
                  cursor: value <= 0 && "not-allowed",
                  pointerEvents: "auto"
                }}
              >
                <ChevronLeftIcon /> Prev
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={value >= 3}
                style={{
                  cursor: value >= 3 && "not-allowed",
                  pointerEvents: "auto"
                }}
              >
                Next <ChevronRightIcon />
              </Button>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  );
}

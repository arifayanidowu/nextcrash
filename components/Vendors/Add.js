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
import { EDIT_VENDOR, GET_VENDOR } from "../../queries";
import { useMutation, useQuery } from "@apollo/react-hooks";
import axios from "axios";

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

const INIT_STATE = {
  company_name: "",
  registration_no: "",
  office_address: "",
  city: "",
  state: "",
  country: "",
  company_tel: "",
  company_email: "",
  company_website: "",
  contact_person: "",
  designation: "",
  contact_tel: "",
  contact_email: "",
  num_of_employee: "",
  year_est: "",
  tax_num: "",
  vat_reg_no: "",
  acct_name: "",
  acct_no: "",
  bank: "",
  sortCode: "",
  branch: "",
  bank_contact_phone: "",
  ref_company_name: "",
  ref_company_address: "",
  ref_contact_person: "",
  ref_contact_designation: "",
  ref_contact_email: "",
  ref_contact_phone: "",
  individual_name: "",
  individual_address: "",
  individual_email: "",
  individual_phone: ""
};

export default function Add({ user }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState(INIT_STATE);
  const [code, setCode] = React.useState(null);
  const [editVendor] = useMutation(EDIT_VENDOR);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      company_name: user.authUser.company_name
    }));
  }, [user]);

  const { data, loading, error } = useQuery(GET_VENDOR, {
    variables: {
      id: user.authUser.id
    }
  });

  if (error) {
    return <p>Error!!!</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  // React.useEffect(() => {
  //   setState(prevState => ({
  //     ...prevState,
  //     company_name: data.vendor.company_name,
  //     registration_no: data.vendor.general_info.registration_no,
  //     office_address: data.vendor.general_info.office_address,
  //     city: data.vendor.general_info.city,
  //     state: data.vendor.general_info.state,
  //     country: data.vendor.general_info.country,
  //     company_tel: data.vendor.general_info.company_tel,
  //     company_email: data.vendor.general_info.company_email,
  //     company_website: data.vendor.general_info.company_website,
  //     contact_person: data.vendor.general_info.contact_person,
  //     designation: data.vendor.general_info.designation,
  //     contact_tel: data.vendor.general_info.contact_tel,
  //     contact_email: data.vendor.general_info.contact_email,
  //     num_of_employee: data.vendor.business_info.num_of_employee,
  //     year_est: data.vendor.business_info.year_est,
  //     tax_num: data.vendor.business_info.tax_num,
  //     vat_reg_no: data.vendor.business_info.vat_reg_no,
  //     acct_name: "",
  //     acct_no: "",
  //     bank: "",
  //     sortCode: "",
  //     branch: "",
  //     bank_contact_phone: "",
  //     ref_company_name: "",
  //     ref_company_address: "",
  //     ref_contact_person: "",
  //     ref_contact_designation: "",
  //     ref_contact_email: "",
  //     ref_contact_phone: "",
  //     individual_name: "",
  //     individual_address: "",
  //     individual_email: "",
  //     individual_phone: ""
  //   }));
  // }, [data]);

  console.log(data);

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

  const handleInputChange = e => {
    e.persist();
    setState(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const handleNext = () => {
    setValue(value + 1);
  };

  const handlePrev = () => {
    setValue(value - 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      ...state,
      country: code.label
    };

    editVendor({
      variables: {
        id: user.authUser.id,
        company_name: payload.company_name,

        registration_no: payload.registration_no,
        office_address: payload.office_address,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        company_tel: payload.company_tel,
        company_email: payload.company_email,
        company_website: payload.company_website,
        contact_person: payload.contact_person,
        designation: payload.designation,
        contact_tel: payload.contact_tel,
        contact_email: payload.contact_email,
        num_of_employee: payload.num_of_employee,
        year_est: payload.year_est,
        tax_num: payload.tax_num,
        vat_reg_no: payload.vat_reg_no,
        acct_name: payload.acct_name,
        acct_no: payload.acct_no,
        bank: payload.bank,
        sortCode: payload.sortCode,
        branch: payload.branch,
        bank_contact_phone: payload.bank_contact_phone,
        ref_company_name: payload.ref_company_name,
        ref_company_address: payload.ref_company_address,
        ref_contact_person: payload.ref_contact_person,
        ref_contact_designation: payload.ref_contact_designation,
        ref_contact_email: payload.ref_contact_email,
        ref_contact_phone: payload.ref_contact_phone,
        individual_name: payload.individual_name,
        individual_address: payload.individual_address,
        individual_email: payload.individual_email,
        individual_phone: payload.individual_phone
      }
    })
      .then(doc => {
        console.log(doc);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <div className={classes.center}>
        <Card className={classes.card}>
          <Typography align="center" variant="h5" gutterBottom>
            New Vendor Registration
          </Typography>
          <form onSubmit={handleSubmit}>
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
                    value={state.company_name}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="registration_no"
                    type="text"
                    label="Registration Number"
                    placeholder="Registration Number"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.registration_no}
                    onChange={handleInputChange}
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
                    value={state.office_address}
                    onChange={handleInputChange}
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
                    value={state.city}
                    onChange={handleInputChange}
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
                    value={state.state}
                    onChange={handleInputChange}
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
                    id="company_tel"
                    type="tel"
                    label="Company Telephone"
                    placeholder="Company Telephone"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.company_tel}
                    onChange={handleInputChange}
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
                    value={state.company_email}
                    onChange={handleInputChange}
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
                    value={state.company_website}
                    onChange={handleInputChange}
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
                    value={state.contact_person}
                    onChange={handleInputChange}
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
                    value={state.designation}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="contact_tel"
                    type="tel"
                    label="Contact Telephone"
                    placeholder="Contact Telephone"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.contact_tel}
                    onChange={handleInputChange}
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
                    value={state.contact_email}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="num_of_employee"
                    type="text"
                    label="No Of Employee"
                    placeholder="No Of Employee"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.num_of_employee}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="year_est"
                    type="text"
                    label="Year Established"
                    placeholder="Year Established"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.year_est}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="tax_num"
                    type="text"
                    label="Tax Identification No."
                    placeholder="Tax Identification No."
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.tax_num}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="vat_reg_no"
                    type="text"
                    label="VAT Registration No."
                    placeholder="VAT Registration No."
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    state={state.vat_reg_no}
                    onChange={handleInputChange}
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
                    value={state.acct_name}
                    onChange={handleInputChange}
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
                    value={state.acct_no}
                    onChange={handleInputChange}
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
                    value={state.bank}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="sortCode"
                    type="text"
                    label="Sort Code"
                    placeholder="Sort Code"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.sortCode}
                    onChange={handleInputChange}
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
                    value={state.branch}
                    onChange={handleInputChange}
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
                    value={state.bank_contact_phone}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="ref_company_name"
                    type="text"
                    label="Company Name"
                    placeholder="Company Name"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.ref_company_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="ref_company_address"
                    type="text"
                    label="Company Address"
                    placeholder="Company Address"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.ref_company_address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="ref_contact_person"
                    type="text"
                    label="Contact Person"
                    placeholder="Contact Person"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.ref_contact_person}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="ref_contact_designation"
                    type="text"
                    label="Contact Designation"
                    placeholder="Contact Designation"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.ref_contact_designation}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="ref_contact_email"
                    type="email"
                    label="Contact Email"
                    placeholder="Contact Email"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.ref_contact_email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="ref_contact_phone"
                    type="tel"
                    label="Contact Phone"
                    placeholder="Contact Phone"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.ref_contact_phone}
                    onChange={handleInputChange}
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
                    id="individual_name"
                    type="text"
                    label="Name"
                    placeholder="Name"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.individual_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    id="individual_address"
                    type="text"
                    label="Address"
                    placeholder="Address"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.individual_address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    id="individual_email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.individual_email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    id="individual_phone"
                    type="tel"
                    label="Phone"
                    placeholder="Phone"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={state.individual_phone}
                    onChange={handleInputChange}
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

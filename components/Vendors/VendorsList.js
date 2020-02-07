import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { IconButton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useQuery } from "@apollo/react-hooks";
import { GET_VENDORS } from "../../queries";

import Loader from "../Loader";
import SearchComponent from "../SearchComponent";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

export default function VendorsList() {
  const classes = useStyles();
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { loading, error, data } = useQuery(GET_VENDORS, {
    errorPolicy: "all"
  });
  const [load, setLoad] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Typography variant="h3">Failed to fetch data!!</Typography>;
  }

  const updateSearch = e => {
    setSearch(e.target.value.substr(0, 20));
  };

  const filteredVendors = () =>
    data.vendors.filter(vendor => {
      if (search !== "") {
        return (
          vendor.company_name.toLowerCase().indexOf(search.toLowerCase()) !==
            -1 ||
          vendor.general_info.company_email
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1 ||
          vendor.general_info.contact_person
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1 ||
          vendor.general_info.contact_tel
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1 ||
          vendor.general_info.contact_email
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1
        );
      } else {
        return vendor;
      }
    });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Vendors List
      </Typography>
      <SearchComponent
        updateSearch={updateSearch}
        placeholder="Search Vendors"
      />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Company Name
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Company Email
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Contact Person
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Contact Telephone
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Contact Email
                </TableCell>

                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVendors()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell component="th" scope="row" align="center">
                        {row.company_name}
                      </TableCell>
                      <TableCell align="center">
                        {(row.general_info && row.general_info.company_email) ||
                          row.email}
                      </TableCell>
                      <TableCell align="center">
                        {row.general_info && row.general_info.contact_person}
                      </TableCell>
                      <TableCell align="center">
                        {row.general_info && row.general_info.contact_tel}
                      </TableCell>
                      <TableCell align="center">
                        {row.general_info && row.general_info.contact_email}
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            router.push(`/vendor/edit?id=${row.id}`)
                          }
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={filteredVendors().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

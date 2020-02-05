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
import { GET_USERS } from "../../queries";

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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { loading, error, data } = useQuery(GET_USERS, { errorPolicy: "all" });
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

  const filteredUsers = () =>
    data.users.filter(user => {
      if (search !== "") {
        return (
          user.firstname.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          user.lastname.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          user.division.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          user.subdivision.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          user.eid.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      } else {
        return user;
      }
    });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Vendors List
      </Typography>
      <SearchComponent updateSearch={updateSearch} placeholder="Search Users" />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Firstname
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Lastname
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  EID
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Division
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Rubik", fontWeight: 900 }}
                >
                  Subdivision
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
              {filteredUsers()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell component="th" scope="row" align="center">
                        {row.firstname}
                      </TableCell>
                      <TableCell align="center">{row.lastname}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.eid}</TableCell>
                      <TableCell align="center">{row.division}</TableCell>

                      <TableCell align="center">{row.subdivision}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            router.push(`/users/edit?id=${row.id}`)
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredUsers().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

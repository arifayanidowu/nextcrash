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
import { IconButton, Typography, Grid, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS, DELETE_USER } from "../queries";
import Loader from "./Loader";
import SearchComponent from "./SearchComponent";
import { useRouter } from "next/router";
import Actions from "./Actions";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import Cookie from "js-cookie";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

export default function UsersComponent({ user }) {
  const classes = useStyles();
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [backdrop, setBackdrop] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { loading, error, data } = useQuery(GET_USERS, {
    errorPolicy: "all"
  });
  // const [data, setData] = React.useState(null);
  const [getId, setGetId] = React.useState(null);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }]
  });

  const [load, setLoad] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [openAction, setOpenAction] = React.useState(false);

  const handleClickOpenAction = id => {
    setOpenAction(true);
    setGetId(id);
  };

  const handleCloseBackdrop = () => {
    setBackdrop(false);
  };

  const handleCloseAction = () => {
    setOpenAction(false);
  };

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

  const handleAction = id => {
    setBackdrop(true);

    deleteUser({
      variables: {
        id: id
      }
    })
      .then(doc => {
        setBackdrop(false);
        handleCloseAction();
      })
      .catch(err => {
        console.error(err);
        setBackdrop(false);
      });
  };

  const filteredUsers = () =>
    data.users.filter(userData => {
      if (userData.id === user.authUser.id) {
        return null;
      } else if (search !== "") {
        return userData.firstname
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1 ||
          userData.lastname.toLowerCase().indexOf(search.toLowerCase()) !==
            -1 ||
          userData.email.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          userData.division.toLowerCase().indexOf(search.toLowerCase()) !==
            -1 ||
          userData.subdivision.toLowerCase().indexOf(search.toLowerCase()) !==
            -1 ||
          userData.eid.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          userData.subdivision === ""
          ? "Nil".toLowerCase().indexOf(search.toLowerCase()) !== -1
          : "";
      } else {
        return user;
      }
    });

  return (
    <>
      {/* <Backdrop
        className={classes.backdrop}
        open={backdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="primary" />
      </Backdrop> */}
      <Actions
        openAction={openAction}
        message="Are you sure you want to delete this user"
        title="Delete"
        action="Delete"
        handleCloseAction={handleCloseAction}
        handleAction={handleAction}
        contentId={getId}
      />
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>
      <SearchComponent updateSearch={updateSearch} placeholder="Search Users" />
      <Grid container justify="space-between">
        <Grid item xs={4} md={4}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: 10 }}
            onClick={() => router.push("/users/create")}
          >
            Add new User
          </Button>
        </Grid>
        <Grid item xs={8} md={8} />
      </Grid>
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

                      <TableCell align="center">
                        {row.subdivision ? row.subdivision : "Nil"}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            router.push(`/users/edit?id=${row.id}`)
                          }
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleClickOpenAction(row.id)}
                        >
                          <DeleteIcon color="secondary" />
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

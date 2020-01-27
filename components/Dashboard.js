import React from "react";
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/styles";
import { currencyFormat } from "../utils/currencyFormat";

import Charts, { PieComponent } from "./Charts";

const useStyles = makeStyles(theme => ({
  root: {},
  flex: {
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    width: "100%"
  },
  item: {
    padding: theme.spacing(2),
    textAlign: "center",
    "&:not(:last-child)": {
      borderRight: "0.5px solid #f6f6f6"
    },
    [theme.breakpoints.down("sm")]: {
      "&:not(:last-child)": {
        borderBottom: "0.5px solid #f9f9f9",
        borderRight: "none"
      }
    }
  },
  cardHeader: {
    borderBottom: "1px solid #f6f6f6"
  },
  grid: {
    marginBottom: theme.spacing(4)
  }
}));

export default function Dashboard({ user }) {
  const classes = useStyles();
  return (
    <div>
      <Typography
        variant="overline"
        style={{ fontWeight: 900, fontFamily: "Rubik", color: "#637b86" }}
      >
        analytics
      </Typography>

      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={12}>
          <Paper elevation={1} className={classes.flex}>
            <Grid item md={3} xs={12} className={classes.item}>
              <Typography variant="overline" style={{ color: "#637b86" }}>
                Total Income
              </Typography>
              <Typography variant="h6">{currencyFormat(854355)}</Typography>
            </Grid>
            <Grid item md={3} xs={12} className={classes.item}>
              <Typography variant="overline" style={{ color: "#637b86" }}>
                Total Budget
              </Typography>
              <Typography variant="h6">{currencyFormat(373250.5)}</Typography>
            </Grid>
            <Grid item md={3} xs={12} className={classes.item}>
              <Typography variant="overline" style={{ color: "#637b86" }}>
                Total Purchase orders
              </Typography>
              <Typography variant="h6">{currencyFormat(123532)}</Typography>
            </Grid>
            <Grid item md={3} xs={12} className={classes.item}>
              <Typography variant="overline" style={{ color: "#637b86" }}>
                Total purchase requisitions
              </Typography>
              <Typography variant="h6">{currencyFormat(26000)}</Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        className={classes.grid}
        alignContent="center"
        justify="center"
      >
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={<Typography variant="overline">Stats</Typography>}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              // className={classes.cardHeader}
            />
            <Divider />
            <CardContent style={{ overflowX: "auto" }}>
              <Charts />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={<Typography variant="overline">Budgets</Typography>}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              // className={classes.cardHeader}
            />
            <Divider />
            <CardContent style={{ overflowX: "auto" }}>
              <PieComponent />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

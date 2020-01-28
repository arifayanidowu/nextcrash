import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Divider
} from "@material-ui/core";
import { useRouter } from "next/router";
import ScrollAnimation from "react-animate-on-scroll";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    minHeight: 800,
    // backgroundImage: "url(/people.jpg)",
    backgroundImage: "url(/sunny.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: theme.spacing(6),
    position: "relative"
  },
  card: {
    height: "100%",
    maxHeight: 500
    // maxWidth: 345
  },
  center: {
    marginTop: theme.spacing(4)
  },
  cardContent: {
    backgroundColor: "#eeeeee",
    height: "100%"
  },
  divider: {
    width: 100,
    border: "3px solid #fff",
    borderRadius: 50,
    background: "#fff",
    margin: "auto"
  }
}));

export default function Policy() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <Typography
        align="center"
        style={{ fontFamily: "Rubik", color: "#4D444", color: "#fefefe" }}
        variant="h3"
        gutterBottom
      >
        WHO WE ARE
      </Typography>
      <Divider variant="middle" className={classes.divider} />
      <Grid
        container
        spacing={3}
        className={classes.center}
        // alignItems="center"
      >
        <Grid item xs={12} md={4}>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              alt="Vision"
              height="240"
              image="/vision.jpg"
              title="Our Vision"
            />
            <CardContent className={classes.cardContent}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#404043" }}
              >
                OUR VISION
              </Typography>
              <Typography paragraph>
                To become a world-class integrated oilfield services company.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt="Vision"
              height="240"
              image="/mission.jpg"
              title="Our Mission"
            />
            <CardContent className={classes.cardContent}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#404043" }}
              >
                OUR MISSION
              </Typography>
              <Typography paragraph>
                To promote a Culture of Excellence through Commitment,
                Innovation, Reliability, Safety and Cost effectiveness.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt="Vision"
              height="240"
              image="/handshake.jpg"
              title="Our Values"
            />
            <CardContent className={classes.cardContent}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#404043" }}
              >
                OUR VALUES
              </Typography>
              <Typography paragraph>
                Professional excellence, Integrity and Honesty in all business
                dealings and with our stakeholders, clients and customers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push("/vendor/register")}
        >
          Get started
        </Button>
      </div>
    </div>
  );
}

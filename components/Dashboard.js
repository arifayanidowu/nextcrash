import React from "react";
import { Typography } from "@material-ui/core";

export default function Dashboard({ user }) {
  return (
    <div>
      <Typography variant="h6">
        Welcome back, {user.authUser.firstname + " " + user.authUser.lastname}
      </Typography>
    </div>
  );
}

import React from "react";
import UsersComponent from "../../components/UsersComponent";

export default function index({ toggleDarkMode, user }) {
  return (
    <div>
      <UsersComponent toggleDarkMode={toggleDarkMode} user={user} />
    </div>
  );
}

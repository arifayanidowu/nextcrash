import React from "react";
import UsersComponent from "../../components/UsersComponent";

export default function index({ toggleDarkMode }) {
  return (
    <div>
      <UsersComponent toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

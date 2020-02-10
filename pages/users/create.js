import React from "react";
import CreateAccount from "../../components/CreateAccount";

export default function create({ user }) {
  return (
    <div>
      <CreateAccount user={user} />
    </div>
  );
}

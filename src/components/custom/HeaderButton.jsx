import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function HeaderButton() {
  return (
    <Link to={"/sign-in"}>
      <Button>Sign In</Button>
    </Link>
  );
}

export default HeaderButton;

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function ViewTripsButton() {
  return (
    <Link to={"/my-trips"}>
      <Button>View Trips</Button>
    </Link>
  );
}

export default ViewTripsButton;

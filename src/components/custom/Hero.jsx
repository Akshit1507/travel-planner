import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551]">
          Embark on Your Ideal Journey with AI:
        </span>
        <br></br>
        Custom-Built Itineraries Just for You
      </h1>
      <p className="text-xl text-gray-500 text-center">
        A smarter way to travel design trips that match your interests and
        budget effortlessly. Your personalized adventure awaits!
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started, It's Free</Button>
      </Link>
      <img src="demoImage3.png" className="mt-4 mb-10" />
    </div>
  );
}

export default Hero;

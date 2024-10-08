// // import React from "react";
// // import { Button } from "../ui/button";
// // import { UserButton, useUser } from "@clerk/clerk-react";
// // import { Link } from "react-router-dom";
// // import HeaderButton from "./HeaderButton";

// // function Header() {
// //   const { isSignedIn, user } = useUser();
// //   return (
// //     <div className="p-3 shadow-sm flex justify-between items-center px-5">
// //       <img src="/logo.svg" />
// //       <div>{isSignedIn ? <UserButton /> : <HeaderButton />}</div>
// //     </div>
// //   );
// // }

// // export default Header;

// import React from "react";
// import { Button } from "../ui/button";
// import { UserButton, useUser } from "@clerk/clerk-react";
// import { Link, useLocation } from "react-router-dom";
// import ViewTripsButton from "./ViewTripsButton";

// function Header() {
//   const { isSignedIn } = useUser();
//   const location = useLocation();

//   const handleSignInClick = () => {
//     localStorage.setItem("redirectAfterSignIn", location.pathname);
//   };

//   return (
//     <div className="p-3 shadow-sm flex justify-between items-center px-5">
//       <img src="/logo.svg" />
//       <div>
//         <ViewTripsButton />
//         {isSignedIn ? (
//           <UserButton />
//         ) : (
//           <Link to="/sign-in" onClick={handleSignInClick}>
//             <Button>Sign In</Button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Header;

import React from "react";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import ViewTripsButton from "./ViewTripsButton";

function Header() {
  const { isSignedIn } = useUser();
  const location = useLocation();

  const handleSignInClick = () => {
    localStorage.setItem("redirectAfterSignIn", location.pathname);
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to={"/"}>
        <div className="flex items-center space-x-2">
          <img src="/anywhere-door.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-extrabold text-black-600">
            AnywhereDoor
          </span>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        {/* View Trips Button */}
        <ViewTripsButton />

        {/* Gap between ViewTripsButton and Sign In/User Button */}
        {isSignedIn ? (
          <UserButton className="ml-4" />
        ) : (
          <Link to="/sign-in" onClick={handleSignInClick}>
            <Button className="ml-4">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;

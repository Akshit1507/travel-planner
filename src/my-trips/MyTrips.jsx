// import { db } from "@/service/firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserTripCardItem from "./components/UserTripCardItem";
// import { useUser } from "@clerk/clerk-react";
// import Header from "@/components/custom/Header";

// const MyTrips = () => {
//   const navigate = useNavigate();
//   const [userTrips, setUserTrips] = useState([]);
//   const { isSignedIn, user } = useUser();
//   const GetUserTrips = async () => {
//     if (!user) {
//       navigate("/");
//       return;
//     }

//     const q = query(
//       collection(db, "Trips"),
//       where("userEmail", "==", user?.primaryEmailAddress.emailAddress)
//     );

//     const trips = [];
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       trips.push(doc.data());
//     });

//     setUserTrips(trips);
//   };
//   useEffect(() => {
//     GetUserTrips();
//   }, [user]);
//   return (
//     <>
//       <Header />
//       <div className="sm:px-10 md: px-32 lg:px-56">
//         <h2 className="font-bold text-4xl text-center">My Trips</h2>
//         <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
//           {userTrips.map((trip, index) => (
//             <UserTripCardItem trip={trip} key={index} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyTrips;

import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import { useUser } from "@clerk/clerk-react";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const { isSignedIn, user } = useUser();

  const GetUserTrips = async () => {
    if (!user) {
      return; // Exit if user is not signed in
    }

    const q = query(
      collection(db, "Trips"),
      where("userEmail", "==", user?.primaryEmailAddress.emailAddress)
    );

    const trips = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      trips.push(doc.data());
    });

    setUserTrips(trips);
  };

  useEffect(() => {
    if (isSignedIn) {
      GetUserTrips();
    }
  }, [user, isSignedIn]);

  if (!isSignedIn) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Please log in to view your saved trips.
            </p>
            <Link to="/sign-in">
              <Button className="bg-[#f56551] text-white hover:bg-[#e0534b]">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56">
        <h2 className="font-bold text-4xl text-center">My Trips</h2>
        <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
          {userTrips.map((trip, index) => (
            <UserTripCardItem trip={trip} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyTrips;

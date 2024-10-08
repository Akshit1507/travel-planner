import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Header from "./components/custom/Header.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./components/custom/CreateTrip.jsx";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/clerk-react";
import SignInPage from "./components/custom/SignInPage.jsx";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/MyTrips.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </ClerkProvider>
  </StrictMode>
);

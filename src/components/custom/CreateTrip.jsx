import { toast } from "sonner";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "../../constants/options.jsx";
import { Button } from "../ui/button";
import { Input } from "../ui/input.jsx";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { chatSession } from "@/service/AIModel.jsx";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  useUser,
} from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog.jsx";
import Header from "./Header.jsx";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const handleOnChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const onGenerateTrip = async () => {
    if (!isSignedIn) {
      toast("Please sign in to generate your trip !");
      return;
    }
    if (formData?.numberOfDays > 5) {
      toast("Please number of days less than 5");
      return;
    } else if (
      !formData?.location ||
      !formData?.numberOfDays ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please fill all the fields !");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location.label
    )
      .replace("{totalDays}", formData?.numberOfDays)
      .replace("{traveler}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.numberOfDays);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const docId = Date.now().toString();
    await setDoc(doc(db, "Trips", docId), {
      userChoice: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.primaryEmailAddress.emailAddress,
      id: docId,
    });
    console.log(JSON.parse(TripData));
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">
          Tell us your travel preferences 🚢✈️⛱️
        </h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information
        </p>
        <div className="mt-20 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is destination of choice ?
            </h2>
            {/* <Input
              placeholder={"Ex. Delhi, India"}
              type="text"
              onChange={(e) => handleOnChange("location", e.target.value)}
            /> */}
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                placeholder: "Search for places...",
                onChange: (v) => {
                  setPlace(v);
                  handleOnChange("location", v);
                },
              }}
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planning your trip ?
            </h2>
            <Input
              placeholder={"Ex.3"}
              type="number"
              onChange={(e) => handleOnChange("numberOfDays", e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">What is your budget ?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                    formData?.budget == item.title && "shadow-lg border-black"
                  }`}
                  onClick={() => handleOnChange("budget", item.title)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              Who do you plan on travelling with on your next adventure ?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelList.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                    formData?.traveller == item.people &&
                    "shadow-lg border-black"
                  }`}
                  onClick={() => {
                    handleOnChange("traveller", item.people);
                  }}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="my-10 justify-end flex">
          <Button onClick={onGenerateTrip} disabled={loading}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateTrip;

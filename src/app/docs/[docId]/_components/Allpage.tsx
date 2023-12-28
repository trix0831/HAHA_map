"use client"
// import { InputAdornmentTypeMap } from "@mui/material";
import MapComponent from "./map";
import type { Activity } from "@/lib/types/db";
import { useEffect } from "react";
import { useActivity } from "@/hooks/useActivity";

type memberType = {
  displayId: string;
  username: string;
  email: string;
}

type inputType = {
  activity: Activity | undefined;
  members: memberType[];
}

function AllPage({activity, members}: inputType) {
  const {location, setDes, setLoca, save, setDateE, setDateS, setMem, setSchLoca, setSchName} = useActivity();
  useEffect(() => {
    console.log("useEffect");
    console.log(activity);
    console.log("end");
    if(activity){
      setDes(activity.description);
      setLoca(activity.location);
      setDateE(activity.dateEnd);
      setDateS(activity.dateStart);
      setSchLoca(activity.schedule_location);
      setSchName(activity.schedule_name);
    }
    setMem(members);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, members]);

  
  // const [participateState, setParticipateState] = useState("participate");

  //define a function that alert("clicked")
  // const a = () => {
  //   if(participateState === "participate")
  //     setParticipateState("participated");
  //   else
  //     setParticipateState("participate");
  // };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col justify-center">
          <div style={{height: "70vh"}} className="w-1/2">
            {/* <Map zoom={7} center={position}></Map> */}
            <MapComponent
              location={location}
              setLoca={setLoca}
              saveLoca = {save}
            />

          </div>
        </div>
      </div>
    </>
  );
}

export default AllPage;

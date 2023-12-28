"use client"
// import { InputAdornmentTypeMap } from "@mui/material";
import MapComponent from "./map";
import type { Activity } from "@/lib/types/db";
import { useEffect } from "react";
import { useActivity } from "@/hooks/useActivity";
import { Button } from "@mui/material";
import { useState } from "react";
import ScheduleList from "./ScheduleList";

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

    console.log(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, members]);

  
  const [participateState, setParticipateState] = useState("participate");

  const toggleParticipate = () => {
    if(participateState === "participate")
      setParticipateState("participated");
    else
      setParticipateState("participate");
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-7">
          <div className="flex flex-col justify-center col-span-6">
            <div style={{height: "70vh"}} className="w-1/2">
              {/* <Map zoom={7} center={position}></Map> */}
              <p className="text-2xl font-bold py-3">{activity?.title}</p>
              <MapComponent
                location={location}
                setLoca={setLoca}
              />
            </div>
          </div>

          <div className="flex flex-col justify-start mt-16 col-span-1">
            <Button 
              className={`fixed right-20 mr-14 top-3 z-50 w-fit  ${participateState === 'participate' ? 'bg-white' : 'bg-green-500 text-white'}`}
              variant="outlined"
              onClick={toggleParticipate} 
              >
                {participateState}
            </Button>

            <p className="ml-5 font-semibold text-xl">Schedule</p>

            <Button 
              className={`fixed right-10 top-14 z-50 w-fit `}
              variant="outlined"
              onClick={toggleParticipate} 
              >
              Add Schedule
            </Button>

            
            <ScheduleList activity={activity} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPage;

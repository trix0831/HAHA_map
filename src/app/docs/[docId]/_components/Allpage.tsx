"use client"
import MapComponent from "./map";
import type { Activity } from "@/lib/types/db";
import { useEffect } from "react";
import { useActivity } from "@/hooks/useActivity";
import { Button } from "@mui/material";
import { useState } from "react";
import ScheduleList from "./ScheduleList";
import AddScheduleDialog from "./AddScheduleDialog";

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
  const {updateLocation,postSchedule,location, setDes, setLoca, setDateE, setDateS, setMem, setSchLoca, setSchName, scheduleLocation, scheduleName} = useActivity();
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

  
  const [participateState, setParticipateState] = useState("participate");

  const toggleParticipate = () => {
    if(participateState === "participate")
      setParticipateState("participated");
    else
      setParticipateState("participate");
  };
  console.log("Location");
  console.log(location);
  // const forSchInput = {setName:setSchName, setSchLoca:setSchLoca, location:location, save:save, schLoca:scheduleLocation};

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-5">
          <div className="flex flex-col align-top col-span-3">
            <div style={{height: "70vh"}} className="w-1/2">
              <p className="text-2xl font-bold py-3">{activity?.title}</p>
              <MapComponent
                location={location}
                setLoca={setLoca}
                saveLoca={updateLocation}
              />
            </div>
          </div>

          <div className="flex flex-col justify-start mt-16 col-span-2">
            <Button 
              className={`fixed right-20 mr-14 top-3 z-50 w-fit  ${participateState === 'participate' ? 'bg-white' : 'bg-green-500 text-white'} hover:text-blue-500`}
              variant="outlined"
              onClick={toggleParticipate} 
              >
                {participateState}
            </Button>

            <div className="flex justify-between">
              <p className="ml-5 font-semibold text-xl">Schedule</p>
              <AddScheduleDialog 
                setName={setSchName}
                setSchLoca={setSchLoca}
                location={location}
                save={postSchedule}
                schLoca={scheduleLocation}
                schName = {scheduleName}
              />
            </div>
            
            <ScheduleList activity={activity} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPage;

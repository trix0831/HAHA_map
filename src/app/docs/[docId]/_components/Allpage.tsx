"use client"
import MapComponent from "./map";
import type { Activity_detial } from "@/lib/types/db";
import { useEffect } from "react";
import { useActivity } from "@/hooks/useActivity";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ScheduleList from "./ScheduleList";
import AddScheduleDialog from "./AddScheduleDialog";
import ShareDialog from "./ShareDialog";

type memberType = {
  displayId: string;
  username: string;
  email: string;
}

type inputType = {
  activity: Activity_detial | undefined;
  members: memberType[];
}

function AllPage({activity, members}: inputType) {
  const { docId } = useParams();
  const activityId = Array.isArray(docId) ? docId[0] : docId;
  const router = useRouter();
  const {membersState, updateLocation,postSchedule,location, setDes, setLoca, setDateE, setDateS, setMem, setSchLoca, setSchName, scheduleLocation, scheduleName, dateStart, dateEnd} = useActivity();
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
    // console.log("MEMBER!!!")
    // console.log(members);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, members]);

  
  const [participateState, setParticipateState] = useState("participate");
  console.log("allPageMember");
  console.log(membersState);
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
      <div className="container ml-3 mr-3">
        <div className="grid grid-cols-7">
          <div className="flex flex-col align-top col-span-4">
            <div style={{height: "70vh"}} className="w-1/2">
              <p className="text-2xl font-bold py-3">{activity?.title}</p>
              <MapComponent
                location={location}
                setLoca={setLoca}
                saveLoca={updateLocation}
              />
            </div>
          </div>

          <div className="mt-4 col-span-3 mb-2">

            <div className="flex justify-between bg-slate-300">
              <Button 
                className="text-sm mr-1"
                variant="outlined"
                onClick={() => {
                  router.push(`${activityId}/chat`);
                }} 
              >
                  chatroom
              </Button>

              <Button 
                className={`text-sm mr-1 ${participateState === 'participate' ? '' : 'bg-green-500 text-white'}`}
                variant="outlined"
                onClick={toggleParticipate} 
                >
                  {participateState}
              </Button>

              <ShareDialog 
                membersState={membersState}
                docId={activityId} 
              />
            </div>

            <div className="flex justify-center mt-5 bg-slate-300 rounded-lg">
              <div className="mr-2">
                <p className="font-semibold text-md">
                  Start Date：
                </p>
                <p className="font-normal text-md text-slate-500">{dateStart}</p>
              </div>
              
              <div className="ml-2">
                <p className="font-semibold text-md">
                  End Date：
                </p>
                <p className="font-normal text-md text-slate-500">{dateEnd}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <p className="ml-5 font-semibold text-xl">
                Schedule
              </p>

              <AddScheduleDialog 
                setName={setSchName}
                setSchLoca={setSchLoca}
                location={location}
                save={postSchedule}
                schLoca={scheduleLocation}
                schName = {scheduleName}
              />
            </div>
            
            <ScheduleList 
              name = {scheduleName}
              location = {scheduleLocation}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPage;

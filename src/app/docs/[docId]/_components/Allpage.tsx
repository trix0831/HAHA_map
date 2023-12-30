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
    console.log("MEMBER!!!")
    console.log(members);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, members]);

  
  const [participateState, setParticipateState] = useState(false);

  console.log("allPageMember");
  console.log(membersState);
  const toggleParticipate = () => {
    setParticipateState(!participateState);
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

            <div className="flex justify-around py-2 bg-slate-200 rounded-lg">
              {/* <Button 
                className="text-sm mr-1"
                variant="outlined"
                onClick={() => {
                  router.push(`${activityId}/chat`);
                }} 
              >
                  chatroom
              </Button> */}
              {/* Chatroom */}
              <svg width="36" height="36" 
                onClick={() => {
                  router.push(`${activityId}/chat`);
                }}
                className="hover:bg-slate-300 rounded-2xl"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 13.7596 1.41318 15.4228 2.14781 16.8977C2.34303 17.2897 2.40801 17.7377 2.29483 18.1607L1.63966 20.6093C1.35525 21.6723 2.32772 22.6447 3.39068 22.3603L5.83932 21.7052C6.26233 21.592 6.71033 21.657 7.10228 21.8522C8.5772 22.5868 10.2404 23 12 23Z" fill="#6d7694"/>
                  <path d="M10.9 12.0004C10.9 12.6079 11.3925 13.1004 12 13.1004C12.6075 13.1004 13.1 12.6079 13.1 12.0004C13.1 11.3929 12.6075 10.9004 12 10.9004C11.3925 10.9004 10.9 11.3929 10.9 12.0004Z" fill="#1C274C"/>
                  <path d="M6.5 12.0004C6.5 12.6079 6.99249 13.1004 7.6 13.1004C8.20751 13.1004 8.7 12.6079 8.7 12.0004C8.7 11.3929 8.20751 10.9004 7.6 10.9004C6.99249 10.9004 6.5 11.3929 6.5 12.0004Z" fill="#1C274C"/>
                  <path d="M15.3 12.0004C15.3 12.6079 15.7925 13.1004 16.4 13.1004C17.0075 13.1004 17.5 12.6079 17.5 12.0004C17.5 11.3929 17.0075 10.9004 16.4 10.9004C15.7925 10.9004 15.3 11.3929 15.3 12.0004Z" fill="#1C274C"/>
              </svg>

              {/* <Button 
                className={`text-sm mr-1 ${participateState === 'participate' ? '' : 'bg-green-500 text-white'}`}
                variant="outlined"
                onClick={toggleParticipate} 
                >
                  {participateState}
              </Button> */}
              {/* participate */}
              <svg width="36" height="36" 
                onClick={toggleParticipate}
                className="hover:bg-slate-300 rounded-2xl"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" fill={`${participateState ? "#2bf016" : "#6d7694"}`}/>
                  <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C"/>
              </svg>

              {/* <ShareDialog 
                membersState={membersState}
                docId={activityId} 
              /> */}

              <svg width="36" height="36" 
                className="hover:bg-slate-300 rounded-2xl"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8 21C15.8 21.3866 16.1134 21.7 16.5 21.7C16.8866 21.7 17.2 21.3866 17.2 21H15.8ZM4.8 21C4.8 21.3866 5.1134 21.7 5.5 21.7C5.8866 21.7 6.2 21.3866 6.2 21H4.8ZM6.2 18C6.2 17.6134 5.8866 17.3 5.5 17.3C5.1134 17.3 4.8 17.6134 4.8 18H6.2ZM12.3 21C12.3 21.3866 12.6134 21.7 13 21.7C13.3866 21.7 13.7 21.3866 13.7 21H12.3ZM13.7 18C13.7 17.6134 13.3866 17.3 13 17.3C12.6134 17.3 12.3 17.6134 12.3 18H13.7ZM11.7429 11.3125L11.3499 10.7333L11.3499 10.7333L11.7429 11.3125ZM16.2429 11.3125L15.8499 10.7333L15.8499 10.7333L16.2429 11.3125ZM3.2 21V19.5H1.8V21H3.2ZM8 14.7H11V13.3H8V14.7ZM15.8 19.5V21H17.2V19.5H15.8ZM11 14.7C13.651 14.7 15.8 16.849 15.8 19.5H17.2C17.2 16.0758 14.4242 13.3 11 13.3V14.7ZM3.2 19.5C3.2 16.849 5.34903 14.7 8 14.7V13.3C4.57583 13.3 1.8 16.0758 1.8 19.5H3.2ZM11 14.7H15.5V13.3H11V14.7ZM20.3 19.5V21H21.7V19.5H20.3ZM15.5 14.7C18.151 14.7 20.3 16.849 20.3 19.5H21.7C21.7 16.0758 18.9242 13.3 15.5 13.3V14.7ZM6.2 21V18H4.8V21H6.2ZM13.7 21V18H12.3V21H13.7ZM9.5 11.3C7.67746 11.3 6.2 9.82255 6.2 8.00001H4.8C4.8 10.5958 6.90426 12.7 9.5 12.7V11.3ZM6.2 8.00001C6.2 6.17746 7.67746 4.7 9.5 4.7V3.3C6.90426 3.3 4.8 5.40427 4.8 8.00001H6.2ZM9.5 4.7C11.3225 4.7 12.8 6.17746 12.8 8.00001H14.2C14.2 5.40427 12.0957 3.3 9.5 3.3V4.7ZM12.8 8.00001C12.8 9.13616 12.2264 10.1386 11.3499 10.7333L12.1358 11.8918C13.3801 11.0477 14.2 9.61973 14.2 8.00001H12.8ZM11.3499 10.7333C10.8225 11.091 10.1867 11.3 9.5 11.3V12.7C10.4757 12.7 11.3839 12.4019 12.1358 11.8918L11.3499 10.7333ZM14 4.7C15.8225 4.7 17.3 6.17746 17.3 8.00001H18.7C18.7 5.40427 16.5957 3.3 14 3.3V4.7ZM17.3 8.00001C17.3 9.13616 16.7264 10.1386 15.8499 10.7333L16.6358 11.8918C17.8801 11.0477 18.7 9.61973 18.7 8.00001H17.3ZM15.8499 10.7333C15.3225 11.091 14.6867 11.3 14 11.3V12.7C14.9757 12.7 15.8839 12.4019 16.6358 11.8918L15.8499 10.7333ZM11.9378 5.42349C12.5029 4.97049 13.2189 4.7 14 4.7V3.3C12.8892 3.3 11.8667 3.68622 11.0622 4.33114L11.9378 5.42349ZM14 11.3C13.3133 11.3 12.6775 11.091 12.1501 10.7333L11.3642 11.8918C12.1161 12.4019 13.0243 12.7 14 12.7V11.3Z" fill="#000000"/>
              </svg>

              <svg width="36" height="36" 
                className="hover:bg-slate-300 rounded-2xl"
                viewBox="0 0 512 512" version="1.1" xmlSpace="preserve">
                <style>{`.st0{fill:#333333;}`}</style>
                <g id="Layer_1" />
                <g id="Layer_2">
                  <g>
                    <path d="M468.5,70.59H222.11c-8.84,0-16,7.16-16,16v65.6c0,8.84,7.16,16,16,16H468.5c8.84,0,16-7.16,16-16v-65.6C484.5,77.76,477.34,70.59,468.5,70.59z M452.5,136.2H238.11v-33.6H452.5V136.2z" />
                    <path d="M379.19,207.2H132.81c-8.84,0-16,7.16-16,16v65.6c0,8.84,7.16,16,16,16h246.39c8.84,0,16-7.16,16-16v-65.6C395.19,214.36,388.03,207.2,379.19,207.2z M363.19,272.8H148.81v-33.6h214.39V272.8z" />
                    <path d="M43.5,441.41h246.39c8.84,0,16-7.16,16-16v-65.6c0-8.84-7.16-16-16-16H43.5c-8.84,0-16,7.16-16,16v65.6C27.5,434.24,34.66,441.41,43.5,441.41z M59.5,375.8h214.39v33.6H59.5V375.8z" />
                  </g>
                </g>
              </svg>
            </div>

            <div className="flex justify-center mt-5 bg-slate-200 rounded-lg">
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
              setLoca = {setLoca}
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

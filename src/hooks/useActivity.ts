import { useParams } from "next/navigation";
import { useState } from "react";

type memberType = {
  displayId: string;
  name: string;
  email: string;
}

export const useActivity = () => {
  const { docId } = useParams();
  const activityId = Array.isArray(docId) ? docId[0] : docId;

  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [members, setMembers] = useState<memberType[]>([]);
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [scheduleName, setScheduleName] = useState<string[]>([]);
  const [scheduleLocation, setScheduleLocation] = useState<string[]>([]);

  const editActivity = async() => {
    const res = await fetch(`/api/activity/${activityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
        location: location,
        dateStart: dateStart,
        dateEnd: dateEnd,
        scheduleName: scheduleName,
        scheduleLocation: scheduleLocation,
      }),
    });
    if (!res.ok) {
      return;
    }
  }

  const editMembers =async (userId: string) => {
    const res = await fetch(`/api/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        activityId: activityId,
      }),
    });
    if(!res.ok){
      console.log("can't add member to activity");
      return;
    }

    const result = await fetch(`/api/activities/${activityId}?type=members`);
    if(result.ok){
      const data: memberType[] = await result.json();
      setMembers(data);
    }
  }

  const setDes = (des: string) => {
    setDescription(des);
    editActivity();
  }

  const setLoca = (lo: string) => {
    setLocation(lo);
    editActivity();
  }

  const setMem = (userId: string) => {
    editMembers(userId);
  }

  const setDateS = (s: string) => {
    setDateStart(s);
    editActivity();
  }

  const setDateE = (e: string) => {
    setDateEnd(e);
    editActivity();
  }

  const setSchName = (name: string[]) => {
    setScheduleName(name);
    editActivity();
  }

  const setSchLoca = (lo: string[]) => {
    setScheduleLocation(lo);
    editActivity();
  }

  
return{
  setDes,
  setLoca,
  setMem,
  setDateS, 
  setDateE,
  setSchName,
  setSchLoca,
  description,
  location,
  members,
  dateStart,
  dateEnd,
  scheduleName,
  scheduleLocation,
}

}
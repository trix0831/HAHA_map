import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { Router } from "next/router";


type memberType = {
  displayId: string;
  username: string;
  email: string;
}

export const useActivity = () => {
  const { docId } = useParams();
  const activityId = Array.isArray(docId) ? docId[0] : docId;
  const router = useRouter();
  const [description, setDescription] = useState<string>("a");
  const [location, setLocation] = useState<string>("");
  const [members, setMembers] = useState<memberType[]>([]);
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [scheduleName, setScheduleName] = useState<string[]>([]);
  const [scheduleLocation, setScheduleLocation] = useState<string[]>([]);

  const editActivity = async() => {
    console.log("putting to backend");
    const res = await fetch(`/api/activities/${activityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
        location: location,
        dateStart: dateStart,
        dateEnd: dateEnd,
        schedule_name: scheduleName,
        schedule_location: scheduleLocation,
      }),
    });
    if (!res.ok) {
      return;
    }
  }

  const updateLocation = async(
    location: string,
  ) => {
    const res = await fetch(`/api/activities/${activityId}`,{
        method: "PUT",
        body: JSON.stringify({
          location: location,
        }),
    });
    if (!res.ok){
      const body = await res.json();
      throw new Error(body.error);
    }
    router.refresh();
  };

  const postSchedule = async(
    name: string[],
    location: string[],
  ) => {
    const res = await fetch(`/api/activities/${activityId}`,{
        method: "PUT",
        body: JSON.stringify({
          schedule_name: name,
          schedule_location: location,
        }),
    });
    if (!res.ok){
      const body = await res.json();
      throw new Error(body.error);
    }
    router.refresh();
  };

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

  const setDes = async (des: string) => {
    setDescription(des);
    // await editActivity();
  }

  const save =async () => {
    await editActivity();
  }

  const setLoca = (lo: string) => {
    setLocation(lo);
  }

  const addMem = async (userId: string) => {
    await editMembers(userId);
  }

  const setMem = (mem: memberType[]) => {
    setMembers(mem);
  }

  const setDateS = async (s: string) => {
    setDateStart(s);
    // await editActivity();
  }

  const setDateE = async (e: string) => {
    setDateEnd(e);
    // await editActivity();
  }

  const setSchName = async (name: string[]) => {
    setScheduleName(name);
    // await editActivity();
  }

  const setSchLoca = async (lo: string[]) => {
    setScheduleLocation(lo);
    // await editActivity();
  }

  
return{
  setDes,
  setLoca,
  save,
  setMem,
  addMem,
  setDateS, 
  setDateE,
  setSchName,
  setSchLoca,
  postSchedule,
  updateLocation,
  description,
  location,
  members,
  dateStart,
  dateEnd,
  scheduleName,
  scheduleLocation,
}
}
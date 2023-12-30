import { useState } from "react";

type activityType = {
  displayId: string;
  title: string;
}

export const useList = () => {
  const [allActivity, setAllactivity] = useState<activityType[]>([]);
  const [myActivity, setMyActivity] = useState<activityType[]>([]);


  const setAll = (all: activityType[]) => {
    setAllactivity(all);
  }

  const setMy = (my: activityType[]) => {
    setMyActivity(my);
  }

  const deleteActivity = async(activityId: string) => {
    const res = await fetch(`/api/activities/${activityId}`,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityId: activityId,
      })
    });
    if (!res.ok){
      return;
    }
  }

  const addMembers = async (userId: string, activityId: string) => {
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

    const result = await fetch(`/api/users/${userId}`);
    if(result.ok){
      const data = await result.json();
      setMyActivity(data);
    }
  }

  return{
    allActivity,
    myActivity,
    deleteActivity,
    setAll,
    setMy,
    addMembers,
  }

}
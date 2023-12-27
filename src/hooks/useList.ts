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

  return{
    allActivity,
    myActivity,
    setAll,
    setMy,
  }

}
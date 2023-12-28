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
  const {location, setDes, setLoca, setDateE, setDateS, setMem, setSchLoca, setSchName} = useActivity();
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
      <div className="w-full flex">
        <nav className="sticky top-0 flex w-full justify-between p-2 shadow-sm ml-2">
          {/* <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Document Title"
            className="rounded-lg h-10 px-2 py-1 text-slate-700 outline-0 focus:bg-slate-100 text-2xl"
          /> */}
          <p>{activity?.title}</p>
        </nav>

        {/* <section className="w-full px-4 py-4">
          <textarea
            value={content || ""}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="h-[80vh] w-full outline-0 "
          />
        </section> */}


        
      </div>


      <div className="container mx-auto">

        <div className="flex relative">
          <div style={{height: "70vh"}} className="w-1/2">
            {/* <Map zoom={7} center={position}></Map> */}
            <MapComponent
              location={location}
              setLoca={setLoca}
            />
          </div>

          {/* <div className="w-1/2 flex justify-center mt-6">
            <h1 className="text-5xl">title</h1>
          </div> */}


        </div>

        <div className="overflow-auto h-screen">
    
        </div>
      </div>
    </>
  );
}

export default AllPage;

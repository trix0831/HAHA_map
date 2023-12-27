"use client";


import MapComponent from "./_components/map";
import Button from '@mui/material/Button';
import { useDocument } from "@/hooks/useDocument";
import { useState } from "react";


// import {
//   APIProvider,
//   // Map,
//   // AdvancedMarker,
//   // Pin,
//   // InfoWindow
// } from "@vis.gl/react-google-maps";

// import MapPage from "./_components/map";

function DocPage() {
  const { title, setTitle} = useDocument();
  // , content, setContent 
  // const position = {lat: 23.97555, lng: 120.97361};
  const [participateState, setParticipateState] = useState("participate");

  //define a function that alert("clicked")
  const a = () => {
    if(participateState === "participate")
      setParticipateState("participated");
    else
      setParticipateState("participate");
  };

  return (

    <>
      <div className="w-full flex">
        <nav className="sticky top-0 flex w-full justify-between p-2 shadow-sm ml-2">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Document Title"
            className="rounded-lg px-2 py-1 text-slate-700 outline-0 focus:bg-slate-100 text-2xl"
          />
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

        <Button 
          className={`fixed right-24 mr-10 top-3 z-50 w-fit ${participateState === "participated" ? "bg-green-500 text-white" : ""}`}
          variant="outlined" 
          onClick={a}
        >
          {participateState}
        </Button>

        
      </div>


      <div className="container mx-auto">

        <div className="flex relative">
          <div style={{height: "70vh"}} className="w-1/2">
            {/* <Map zoom={7} center={position}></Map> */}
            <MapComponent/>
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

export default DocPage;

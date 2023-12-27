"use client";

import Button from '@mui/material/Button';
import { useDocument } from "@/hooks/useDocument";
import { useState } from "react";

import MemberDialog from "./_components/MemberDialog";

import {
  APIProvider,
  // Map,
  // AdvancedMarker,
  // Pin,
  // InfoWindow
} from "@vis.gl/react-google-maps";

import MapPage from "./_components/map";


function DocPage() {
  const { title, setTitle, content, setContent } = useDocument();
  const position = {lat: 23.97555, lng: 120.97361};
  const [participateState, setParticipateState] = useState("participate");

  //define a function that alert("clicked")
  const a = () => {
    alert("clicked");
  };

  return (
    <APIProvider apiKey="AIzaSyBfhfWnkyt-Ntum-ccYifY2ZCzw9hoF030">
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
          // className="relative top-3 right-3 mt-2 mr-2"
          className='mr-3 h-10 mt-5 w-fit'
          variant="outlined" 
          onClick={a}
          >
          {participateState}
        </Button>

        <MemberDialog/>
      </div>


      <div className="container mx-auto">

        <div className="flex relative">
          <div style={{height: "70vh"}} className="w-1/2">
            <Map zoom={7} center={position}></Map>
          </div>

          {/* <div className="w-1/2 flex justify-center mt-6">
            <h1 className="text-5xl">title</h1>
          </div> */}
        </div>

        <div className="overflow-auto h-screen">
    
        </div>
      </div>
      </APIProvider>
  );
}

export default DocPage;

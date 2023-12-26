"use client";

// import { useDocument } from "@/hooks/useDocument";
import {
  APIProvider,
  Map,
  // AdvancedMarker,
  // Pin,
  // InfoWindow
} from "@vis.gl/react-google-maps";


function DocPage() {
  // const { title, setTitle, content, setContent } = useDocument();
  const position = {lat: 23.97555, lng: 120.97361};
  return (
    <APIProvider apiKey="AIzaSyBfhfWnkyt-Ntum-ccYifY2ZCzw9hoF030">
      {/* <div className="w-full">
        <nav className="sticky top-0 flex w-full justify-between p-2 shadow-sm">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Document Title"
            className="rounded-lg px-2 py-1 text-slate-700 outline-0 focus:bg-slate-100"
          />
        </nav>

        <section className="w-full px-4 py-4">
          <textarea
            value={content || ""}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="h-[80vh] w-full outline-0 "
          />
        </section>
      </div> */}
      <div style={{height: "100vh"}}>
        <Map zoom={7} center={position}></Map>
      </div>
      </APIProvider>
  );
}

export default DocPage;

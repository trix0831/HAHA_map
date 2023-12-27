"use client";

// import { useDocument } from "@/hooks/useDocument";
import {
  APIProvider,
  Map,
  // AdvancedMarker,
  // Pin,
  // InfoWindow
} from "@vis.gl/react-google-maps";


function MapPage() {
  // const { title, setTitle, content, setContent } = useDocument();
  const position = {lat: 23.97555, lng: 120.97361};
  const options = {
    mapId: "dfb0ed321bfd06d3",
    clickableIcons: true,
  }
  return (
    <Map 
      zoom={9} 
      center={position}
      options={options}
    >

    </Map>
  );
}

export default MapPage;

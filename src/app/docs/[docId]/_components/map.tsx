"use client";

import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '40vw',
  height: '100vh'
};

type MapProps = {
  location: string;
  setLocation: (location: string) => void;
};

// const center = {
//   lat: 23.97555, lng: 120.97361
// };

function MapComponent({ location, setLocation }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'dfb0ed321bfd06d3',
    googleMapsApiKey: "AIzaSyAQmlApIesOpt3qQJ6FvX4HqvTtbp8QH3k"
  })
  const latlngArr = location.split("/").map(Number);
  const center = {lat: latlngArr[0], lng: latlngArr[1]};
  
  // const center = {
  //   lat: location.lat, lng: location.lng
  // }



  const [map, setMap] = React.useState(null)
  // console.log(map);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    // console.log(map);
  }, [])

  function MarkerFinishDrag(event){
    const coordArray = [event.latLng.lat(), event.latLng.lng()]
    console.log(coordArray);
    // console.log(event.latLng.lat());
    // console.log(event.latLng.lng());
    setLocation(coordArray.join("/"));
  }

  // function MarkerClicked(event){
  //   console.log(event);
  // }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MarkerF
          position={center}
          draggable={true}
          onDragEnd={MarkerFinishDrag}
        />
      </GoogleMap>
  ) : <></>
}

export default MapComponent
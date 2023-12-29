"use client";

import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '35vw',
  height: '90vh'
};


type MapProps = {
  location: string;
  setLoca: (location: string) => void;
  saveLoca: (location: string) => Promise<void>;
};

// const center = {
//   lat: 23.97555, lng: 120.97361
// };

function MapComponent({ location, setLoca, saveLoca }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'dfb0ed321bfd06d3',
    googleMapsApiKey: "AIzaSyAQmlApIesOpt3qQJ6FvX4HqvTtbp8QH3k"
  })
  const latlngArr = location.split("-").map(Number);
  const center = {lat: latlngArr[0], lng: latlngArr[1]};
  
  // const center = {
  //   lat: location.lat, lng: location.lng
  // }



// eslint-disable-next-line
  const [map, setMap] = React.useState(null)
  // console.log(map);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map)
  }, [])

// eslint-disable-next-line
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    // console.log(map);
  }, [])


  async function handleClick(){
    await saveLoca(location);
  }

  function MarkerFinishDrag(event){
    const coordArray = [event.latLng.lat(), event.latLng.lng()]
    // console.log(coordArray);
    // console.log(event.latLng.lat());
    // console.log(event.latLng.lng());
    setLoca(coordArray.join("-"));
  }

  // function MarkerClicked(event){
  //   console.log(event);
  // }

  return isLoaded ? (
    <>
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
      <button
        onClick={() => {
          handleClick();
        }}
        className='bg-black text-white py-2 px-4 rounded shadow-md hover:bg-gray-700'
      >save as default</button>
    </>
  ) : <></>
}

export default MapComponent
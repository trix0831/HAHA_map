"use client";

import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '40vw',
  height: '100vh'
};

type MapProps = {
  location: string;
}

const center = {
  lat: 23.97555, lng: 120.97361
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'dfb0ed321bfd06d3',
    googleMapsApiKey: "AIzaSyAQmlApIesOpt3qQJ6FvX4HqvTtbp8QH3k"
  })



  const [map, setMap] = React.useState(null)
  console.log(map);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    console.log(map);
  }, [])

  function MarkerFinishDrag(event){
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
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
          position={{lat: 23.97555, lng: 120.97361}}
          draggable={true}
          onDragEnd={MarkerFinishDrag}
        />
      </GoogleMap>
  ) : <></>
}

export default MapComponent
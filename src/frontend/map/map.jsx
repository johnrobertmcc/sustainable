import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import key from '../config/key'
 
const containerStyle = {
  width: '90vw',
  height: '90vh'
};
 
const center = {
  lat: -3.745,
  lng: -38.523
};
 
function ShowMap() {
  const [map, setMap] = React.useState(null)
 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <LoadScript
      googleMapsApiKey={key}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(ShowMap)
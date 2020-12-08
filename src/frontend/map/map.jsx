import React from 'react'
import { GoogleMap, LoadScript, Polyline, DirectionsRenderer, DirectionsService, Marker } from '@react-google-maps/api';
import key from '../config/key'
 
const containerStyle = {
  width: '50vw',
  height: '50vh'
};
 
const center = {
  lat: 48,
  lng: -120
};

const path = [
  {lat: 37.772, lng: -122.214},
  {lat: 21.291, lng: -157.821},
  {lat: -18.142, lng: 178.431},
  {lat: -27.467, lng: 153.027}
];

const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: true,
  editable: true,
  visible: true,
  radius: 30000,
  zIndex: 9
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
        <Polyline path={path} options={options}/>
        <Marker position={{ lat: 48.00, lng: -122.00}} />
        <Marker position={{ lat: 48.00, lng: -110.00}} />
     
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(ShowMap)
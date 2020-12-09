import React from 'react'
import { 
  GoogleMap, 
  LoadScript, 
  Polyline, 
  Autocomplete, 
  DirectionsRenderer, 
  DirectionsService, 
  Marker
  } from '@react-google-maps/api';
import key from '../config/key'
 
 
class ShowMap extends React.Component {

    constructor (props) {
    super(props)

    this.autocomplete = null

    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  onLoad (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }

  onPlaceChanged () {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace())
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }


 
  render(){
    const containerStyle = {
      width: '50vw',
      height: '50vh'
    };

    const path = [ //for polyline
      this.props.origin,
      this.props.destination
    ];

    const options = { //for the polyline
      strokeColor: '#404040',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#404040',
      fillOpacity: 0.1,
      clickable: false,
      draggable: true,
      editable: true,
      visible: true,
      radius: 30000,
      zIndex: 9
    };

    


    return (
      <LoadScript
      googleMapsApiKey={key}
      libraries={["places"]}
      >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={this.props.origin}
        zoom={15}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
        >
        <Marker position={this.props.origin}/>
        <Marker position={this.props.destination}/>
        <Polyline path={path} options={options}/>
      </GoogleMap>
    </LoadScript>
  )
}
}
 
export default React.memo(ShowMap)

  // const [map, setMap] = React.useState(null)
 
  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])
 
  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])
import React from 'react'
import { 
  GoogleMap, 
  LoadScript, 
  DirectionsRenderer
  } from '@react-google-maps/api';
import key from '../config/key'
 
 
class ShowMap extends React.Component {

  constructor (props) {
    super(props)

    this.autocomplete = null
    this.onLoad = this.onLoad.bind(this)

  }

  componentDidUpdate(prevprops, prevState){
    // debugger
  }

  onLoad (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }

  render(){
    const containerStyle = {
      width: '45vw',
      height: '81vh',
      borderRadius: '40px',
    };
    let { origin, directions} = this.props;

    let center = Object.keys(origin).length === 0 ? {lat: 40.7309, lng:-73.9973} : this.props.origin;

    return (
      <LoadScript
      googleMapsApiKey={key}
      libraries={["places"]}
      >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={this.onLoad}
        >
          <DirectionsRenderer directions={directions} />
      
      </GoogleMap>
    </LoadScript>
  )
}
}
 
export default React.memo(ShowMap)

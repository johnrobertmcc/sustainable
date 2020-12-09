import React from 'react';
import Map from './map/map';
import bicycle from "../stylesheets/bicycle.png";
import walking from "../stylesheets/walking.png";
import { 
  LoadScript, 
  Autocomplete
  } from '@react-google-maps/api';
import Geocode from "react-geocode";
import key from './config/key'
Geocode.setApiKey(key)

class SideBar extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      response: null,
      travelMode: 'WALKING',
      origin: {lat: 40.7309, lng:-73.9973},
      destination: {}
    }
    
    //!!! still unsure why this is necessary !!!!
    this.directionsCallback = this.directionsCallback.bind(this)
    
    //these are for the travelMode
    this.checkDriving = this.checkDriving.bind(this)
    this.checkBicycling = this.checkBicycling.bind(this)
    this.checkTransit = this.checkTransit.bind(this)
    this.checkWalking = this.checkWalking.bind(this)

    //these are the origin/destination to be passed to map.jsx
    this.getOrigin = this.getOrigin.bind(this)
    this.getDestination = this.getDestination.bind(this)    
    
    //duh
    this.onClick = this.onClick.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
  }
  directionsCallback (response) {
    console.log(response)
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }
  checkDriving ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'DRIVING'
        })
      )
  }
  checkBicycling ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'BICYCLING'
        })
      )
  }
  checkTransit ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'TRANSIT'
        })
      )
  }
  checkWalking ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'WALKING'
        })
      )
  }


  getOrigin (ref) {
    this.origin = ref
  }

  getDestination (ref) {
    this.destination = ref
  }

  onClick () {
    
    if (this.origin.value !== '' && this.destination.value !== '') {
      Geocode.fromAddress(this.origin.value).then( res => {
        const {lat, lng} = res.results[0].geometry.location;
             this.setState( () => ({
                  origin:{lat: lat, lng: lng}
              }))
          },
          error => {
            console.error(error);
          }
        );
       Geocode.fromAddress(this.destination.value).then( res => {
        const {lat, lng} = res.results[0].geometry.location;
             this.setState( () => ({
                  destination:{lat: lat, lng: lng}
              }))
          },
          error => {
            console.error(error);
          }
        );
      debugger
    }
  }
  onMapClick (...args) {
    console.log('onClick args: ', args)
  }
  render() {
      const origin = { //take these from directions origin
        lat: this.state.origin.lat,
        lng: this.state.origin.lng
      };
      const destination = {
        lat: this.state.destination.lat,
        lng: this.state.destination.lng
      }
      return(
      <div className='sidebar-container'>
        <LoadScript
        googleMapsApiKey={key}
        libraries={["places"]}
        >
          <Autocomplete
              onLoad={this.onLoad}
              onPlaceChanged={this.onPlaceChanged}
              >
              <input
                type="text"
                placeholder="enter an origin"
                ref={this.getOrigin}
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `25px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  // marginTop:'25px'
                }}
                />
            </Autocomplete>
            <Autocomplete
                onLoad={this.onLoad}
                onPlaceChanged={this.onPlaceChanged}
                >
                <input
                  type="text"
                  placeholder="enter a destination"
                  ref={this.getDestination}
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `25px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    marginTop:'75px'
                  }}
                  />
              </Autocomplete>
          </LoadScript>
          <div className="left-sidebar">
          <div className='map-settings'>
        
          <div className='transit-options'>
              <div className='form-group custom-control custom-radio mr-4'>
              <input
                  id='DRIVING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'DRIVING'}
                  onChange={this.checkDriving}
              />
              <label className='custom-control-label' htmlFor='DRIVING'>Driving</label>
              </div>
              <div className='form-group custom-control custom-radio mr-4'>
              <input
                  id='BICYCLING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'BICYCLING'}
                  onChange={this.checkBicycling}
              />
              <label className='custom-control-label' htmlFor='BICYCLING'>
                  <img className="bicycle-image" src={bicycle} alt=""/>
              </label>
              </div>
              <div className='form-group custom-control custom-radio mr-4'>
              <input
                  id='TRANSIT'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'TRANSIT'}
                  onChange={this.checkTransit}
              />
              <label className='custom-control-label' htmlFor='TRANSIT'>Transit</label>
              </div>
              <div className='form-group custom-control custom-radio mr-4'>
              <input
                  id='WALKING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'WALKING'}
                  onChange={this.checkWalking}
              />
              <label className='custom-control-label' htmlFor='WALKING'>
                  <img className="bicycle-image" src={walking} alt=""/>
              </label>
              </div>
          </div>
          <button type='button' onClick={this.onClick} className="Button">Walk =>
          </button>
          </div>
        </div>
          <div className='map-container'>
              <Map test={true} origin={origin} destination={destination}/>
          </div>
          <div className='right-sidebar'>
              this is the right sidebar
          </div>
    </div>
      )
  }
};
export default SideBar;
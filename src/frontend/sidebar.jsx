import React from 'react';
import Map from './map/map';
import TopNavContainer from '../frontend/top-nav-container'
import bicycle from "../stylesheets/bicycle.png";
import walking from "../stylesheets/walking.png";
import car from "../stylesheets/car.png";
import transit from "../stylesheets/transit.png";
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
      origin: {},
      destination: {},
      searched: false
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
        let {lat, lng} = res.results[0].geometry.location;
        this.setState({ origin:{lat: lat, lng: lng} })
          },
          error => {
            console.error(error);
          }
        );
       Geocode.fromAddress(this.destination.value).then( res => {
          let {lat, lng} = res.results[0].geometry.location;
          this.setState({ destination:{lat: lat, lng: lng} })
          },
          error => {
            console.error(error);
          }
        );
    }
    this.setState({searched: true});
  }

  onMapClick (...args) {
    console.log('onClick args: ', args)
  }

  render() {

      let {origin, destination, searched} = this.state;
      debugger

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
           <TopNavContainer/>
           <div className="call-to-action">Check your Carbon Footprint</div>
           <div className="subheader">directions</div>
          <div className='map-settings'>

          <div className='transit-options'>
              <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='DRIVING'
                        className='custom-control-input'
                        name='travelMode'
                        type='hidden'
                        checked={this.state.travelMode === 'DRIVING'}
                        onChange={this.checkDriving}
                    />
                    <label className='custom-control-label' htmlFor='DRIVING'>
                         <img className="car-image" src={car} alt=""/>
                    </label>
              </div>
              <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='BICYCLING'
                        className='custom-control-input'
                        name='travelMode'
                        type='hidden'
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
                  type='hidden'
                  checked={this.state.travelMode === 'TRANSIT'}
                  onChange={this.checkTransit}
              />
              <label className='custom-control-label' htmlFor='TRANSIT'>
                    <img className="transit-image" src={transit} alt=""/>
              </label>
              </div>
              <div className='form-group custom-control custom-radio mr-4'>
              <input
                  id='WALKING'
                  className='custom-control-input'
                  name='travelMode'
                  type='hidden'
                  checked={this.state.travelMode === 'WALKING'}
                  onChange={this.checkWalking}
              />
              <label className='custom-control-label' htmlFor='WALKING'>
                  <img className="car-image"  src={walking} alt=""/>
              </label>
              </div>
          </div>
          <button type='button' onClick={this.onClick} className="Button">Walk =>
          </button>
        <div className="bio-container">
        {/* <div className="subheader">By:</div> */}
         <div className="subheader">
             <a href="">
             Drew Shroyer
             </a>
             </div>
         <div className="subheader">
             <a href="">JR McCann</a></div>
         </div>
          </div>
        </div>
          <div className='map-container'>
                <Map origin={origin} destination={destination} searched={searched}/>
          </div>
    </div>
      )
  }
};
export default SideBar;
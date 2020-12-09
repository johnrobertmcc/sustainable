import React from 'react';
import Map from './map/map';
import bicycle from "../stylesheets/bicycle.png";
import walking from "../stylesheets/walking.png";
import { 
  GoogleMap, 
  LoadScript, 
  Polyline, 
  Autocomplete, 
  DirectionsRenderer, 
  DirectionsService, 
  Marker,
  StandaloneSearchBox 
  } from '@react-google-maps/api';

class SideBar extends React.Component {

    render() {
        return(
        
        <div className='sidebar-container'>
            <div className='left-sidebar'>

                <label></label>
                <input></input>
                <input></input> 
                <div className="mode-text">Mode:</div>     
                <div className="walk-bike-button-options">
                <img className="bicycle-image" src={walking} alt=""/>
                <img className="bicycle-image" src={bicycle} alt=""/>
                </div>
                <button className="Button">Walk => </button>  
                {/* we will render either "Bike" or "Walk" depending on what the user inputs */}

            </div>

            <div className='map-container'>
                <Map />
            </div>

            <div className='right-sidebar'>
                this is the right sidebar
            </div>
        </div>
        
        )
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
    debugger
    this.destination = ref
  }



  onClick () {
    if (this.origin.value !== '' && this.destination.value !== '') {
      debugger
      this.setState(
        () => ({
          origin: this.origin.value,
          destination: this.destination.value
        })
      )
    }
  }

  onMapClick (...args) {
    console.log('onClick args: ', args)
  }


  render() {
      const origin = { //take these from directions origin
        lat: 48,
        lng: -120
      };

      const destination = {
        lat: 50,
        lng: -122
      }
      return(
      
      <div className='sidebar-container'>
          <div className='map-settings'>
          <hr className='mt-0 mb-3' />

          <div className='row'>
              <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                  <label htmlFor='ORIGIN'>Origin</label>
                  <br />
                  {/* <input id='ORIGIN' className='form-control' type='text' ref={this.getOrigin} /> */}
                          <StandaloneSearchBox
                              onLoad={this.onLoad}
                              onPlaceChanged={this.onPlaceChanged}
                            >
                              <input
                                type="text"
                                placeholder="enter an address"
                                style={{
                                  boxSizing: `border-box`,
                                  border: `1px solid transparent`,
                                  width: `240px`,
                                  height: `32px`,
                                  padding: `0 12px`,
                                  borderRadius: `3px`,
                                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                  fontSize: `14px`,
                                  outline: `none`,
                                  textOverflow: `ellipses`,
                                  position: "absolute",
                                  left: "50%",
                                  marginLeft: "-120px"
                                }}
                              />
                            </StandaloneSearchBox>
              </div>
              </div>

              <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                  <label htmlFor='DESTINATION'>Destination</label>
                  <br />
                  <input id='DESTINATION' className='form-control' type='text' ref={this.getDestination} />
              </div>
              </div>
          </div>

          <div className='d-flex flex-wrap'>
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

          <button className='btn btn-primary' type='button' onClick={this.onClick} className="Button">Walk => 
          </button>
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


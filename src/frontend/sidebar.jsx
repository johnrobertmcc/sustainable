import React from 'react';
import Map from './map/map';
import bicycle from "../stylesheets/bicycle.png";
import walking from "../stylesheets/walking.png";
class SideBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      response: null,
      travelMode: 'WALKING',
      origin: '',
      destination: ''
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
    // debugger
    this.destination = ref
  }
  onClick () {
    if (this.origin.value !== '' && this.destination.value !== '') {
    //   debugger
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
          <div className="left-sidebar">
          <div className='map-settings'>
          <div className='row'>
              <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                  <label htmlFor='ORIGIN'>Origin</label>
                  <br />
                  <input id='ORIGIN' className='form-control' type='text' ref={this.getOrigin} />
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
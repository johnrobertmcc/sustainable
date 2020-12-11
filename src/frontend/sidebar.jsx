import React from 'react';
import Map from './map/map';
import TopNavContainer from '../frontend/top-nav-container';
import ResultsModal from "./results-modal";
import bicycle from "../stylesheets/bicycle.png";
import walking from "../stylesheets/logo.png";
import car from "../stylesheets/car.png";
import transit from "../stylesheets/transit.png";
import {
  LoadScript,
  Autocomplete } from '@react-google-maps/api';
import Geocode from "react-geocode";
import key from './config/key';
Geocode.setApiKey(key)

class SideBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      response: null,
      travelMode: 'WALKING',
      buttonMode: 'WALK',
      origin: {},
      destination: {},
      searched: false,
      directions: null,
      carNum: "",
      transitNum: "",
      bikeNum: 0,
      walkNum: 0
    }
    //these are the origin/destination to be passed to map.jsx
    this.getOrigin = this.getOrigin.bind(this)
    this.getDestination = this.getDestination.bind(this)
    //duh
    this.onClick = this.onClick.bind(this)
    // CSS javascript functions
    this.handleCarModeClick = this.handleCarModeClick.bind(this);
    this.handleWalkModeClick = this.handleWalkModeClick.bind(this);
    this.handleBikeModeClick = this.handleBikeModeClick.bind(this);
    this.handleTransitModeClick = this.handleTransitModeClick.bind(this);
    // Modal Bind 
    this.toggleModal = this.toggleModal.bind(this);

  }

   toggleModal() {
       let modal = document.getElementsByClassName("modal-outer-container");
            for(let i = 0; i < modal.length; i++){
                modal[i].style.display = 'block'
            } 
   }

  handleCarModeClick() {
    let carTab = document.getElementsByClassName("car-image")
    for(let i = 0; i < carTab.length; i++){
        carTab[i].style.backgroundColor = '#FFF201'
    }
    let bikeTab = document.getElementsByClassName("bicycle-image")
    for(let i = 0; i < bikeTab.length; i++){
        bikeTab[i].style.backgroundColor = '#FFFFFF';
    }
    let transitTab = document.getElementsByClassName("transit-image")
    for(let i = 0; i < transitTab.length; i++){
        transitTab[i].style.backgroundColor = '#FFFFFF';
    }
    let walkTab = document.getElementsByClassName("walk-image")
    for(let i = 0; i < walkTab.length; i++){
        walkTab[i].style.backgroundColor = '#FFFFFF';
    }
    this.setState(
        () => ({
          travelMode: "DRIVING",
          buttonMode: 'DRIVE'
        })
      )
  }
  handleWalkModeClick() {
    let walkTab = document.getElementsByClassName("walk-image")
    for(let i = 0; i < walkTab.length; i++){
        walkTab[i].style.backgroundColor = '#FFF201';
    }
    let carTab = document.getElementsByClassName("car-image")
    for(let i = 0; i < carTab.length; i++){
        carTab[i].style.backgroundColor = '#FFFFFF'
    }
    let bikeTab = document.getElementsByClassName("bicycle-image")
    for(let i = 0; i < bikeTab.length; i++){
        bikeTab[i].style.backgroundColor = '#FFFFFF';
    }
    let transitTab = document.getElementsByClassName("transit-image")
    for(let i = 0; i < transitTab.length; i++){
        transitTab[i].style.backgroundColor = '#FFFFFF';
    }
    this.setState(
        () => ({
          travelMode: "WALKING",
          buttonMode: 'WALK'
        })
      )
  }
  handleBikeModeClick() {
    let bikeTab = document.getElementsByClassName("bicycle-image")
    for(let i = 0; i < bikeTab.length; i++){
        bikeTab[i].style.backgroundColor = '#FFF201';
    }
     let transitTab = document.getElementsByClassName("transit-image")
    for(let i = 0; i < transitTab.length; i++){
        transitTab[i].style.backgroundColor = '#FFFFFF';
    }
    let walkTab = document.getElementsByClassName("walk-image")
    for(let i = 0; i < walkTab.length; i++){
        walkTab[i].style.backgroundColor = '#FFFFFF';
    }
    let carTab = document.getElementsByClassName("car-image")
    for(let i = 0; i < carTab.length; i++){
        carTab[i].style.backgroundColor = '#FFFFFF'
    }
    this.setState(
        () => ({
          travelMode: "BICYCLING",
          buttonMode: 'BIKE'
        })
      )
  }
  handleTransitModeClick() {
     let transitTab = document.getElementsByClassName("transit-image")
    for(let i = 0; i < transitTab.length; i++){
        transitTab[i].style.background = '#FFF201';
    }
    let walkTab = document.getElementsByClassName("walk-image")
    for(let i = 0; i < walkTab.length; i++){
        walkTab[i].style.background = '#FFFFFF';
    }
    let carTab = document.getElementsByClassName("car-image")
    for(let i = 0; i < carTab.length; i++){
        carTab[i].style.background = '#FFFFFF'
    }
    let bikeTab = document.getElementsByClassName("bicycle-image")
    for(let i = 0; i < bikeTab.length; i++){
        bikeTab[i].style.background = '#FFFFFF';
    }
     this.setState(
        () => ({
          travelMode: "TRANSIT",
          buttonMode: 'TRANSIT'
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
    let google = window.google;
    let dService = new google.maps.DirectionsService();

    if (this.origin.value !== '' && this.destination.value !== '') {
      Geocode.fromAddress(this.origin.value).then( res => {
        let {lat, lng} = res.results[0].geometry.location;
        this.setState({ origin:{lat: lat, lng: lng} })
          },
          error => {
            console.error(error);
          }
        )
       Geocode.fromAddress(this.destination.value).then( res => {
          let {lat, lng} = res.results[0].geometry.location;
          this.setState({ destination:{lat: lat, lng: lng} })
          },
          error => {
            console.error(error);
          }
        ).then(() => {
          let {travelMode, origin, destination} = this.state;

            dService.route({
              origin: new google.maps.LatLng([origin.lat], [origin.lng]),
              destination: new google.maps.LatLng([destination.lat],[destination.lng]),
              travelMode: google.maps.TravelMode.[travelMode],
            }, (result, status) => {
            //   debugger
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: result,
                  searched: true
                });
                this.calculateCarbon(this.state.directions.routes[0].legs[0].distance.text)
                this.toggleModal()
              } else {
                console.error(`error fetching directions ${result}`);
              }
            });

        }).then(() => {
          if(this.state.directions !== null){
          };
          this.setState({})
          this.toggleModal();

        }
        );
    }

  }


    sendModal(){
      let {carNum, searched, transitNum, bikeNum, walkNum} = this.state;
      debugger
   
      if(searched){
      return(
          <ResultsModal
            travelMode={this.state.travelMode}
            toggleModal={this.toggleModal}
            show={this.state.isOpen}
            distance={this.state.directions}
            carNum={carNum}
            transitNum={transitNum}
            bikeNum={bikeNum}
            walkNum={walkNum}
          />
      )}

    }

    calculateCarbon(distance) {
        let miles = parseFloat(distance)
        let carNum = Math.ceil(404 * 2 * miles)
        let transitNum = Math.ceil(204 * 2 * miles)
        let bikeNum = 0 
        let walkNum = 0 
 
        this.setState({ 
            carNum: carNum,
            transitNum: transitNum,
            bikeNum: bikeNum,
            walkNum: walkNum
        })
        // Greenhouse Gas Data
        // https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle
        // https://www.apta.com/wp-content/uploads/Standards_Documents/APTA-SUDS-CC-RP-001-09_Rev-1.pdf
    }

  render() {
      let {origin, destination, directions, searched, travelMode} = this.state;
      return(
      <div className='sidebar-container'>
          <div className="left-sidebar">
           <TopNavContainer/>
           <div className="call-to-action">Check your Carbon Footprint</div>
           <div className="subheader">directions</div>
          <div className='map-settings'>
              <div className='col-md-6 col-lg-4'>
                <div className='form-group'>
                    <div className='row'>
                        <LoadScript
                        googleMapsApiKey={key}
                        libraries={["places"]}>
                        <Autocomplete
                            onLoad={this.onLoad}
                            onPlaceChanged={this.onPlaceChanged}
                            >
                            <input
                                id='ORIGIN' className='form-control' type='text'
                                placeholder="enter an origin"
                                ref={this.getOrigin}
                                />
                            </Autocomplete>
                            </LoadScript>
                    </div>
              </div>
              <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                 <LoadScript
                    googleMapsApiKey={key}
                        libraries={["places"]}>
                <Autocomplete
                onLoad={this.onLoad}
                onPlaceChanged={this.onPlaceChanged}
                >
                <input
                  id='DESTINATION' className='form-control' type='text'
                  placeholder="enter a destination"
                  ref={this.getDestination}
                  />
              </Autocomplete>
              </LoadScript>
              </div>
              </div>
          </div>
         <div className="subheader">mode of transport</div>
          <div className='transit-options'>
              <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='DRIVING'
                        className='custom-control-input'
                        name='travelMode'
                        type='hidden'
                        checked={this.state.travelMode === 'DRIVE'}
                        onChange={this.checkDriving}
                    />
                    <label className='custom-control-label' htmlFor='DRIVING'>
                         <img className="car-image" onClick={this.handleCarModeClick} src={car} alt=""/>
                    </label>
              </div>
              <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='BICYCLING'
                        className='custom-control-input'
                        name='travelMode'
                        type='hidden'
                        checked={this.state.travelMode === 'BIKE'}
                        onChange={this.checkBicycling}
                    />
                    <label className='custom-control-label' htmlFor='BICYCLING'>
                        <img className="bicycle-image" onClick={this.handleBikeModeClick} src={bicycle} alt=""/>
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
                    <img className="transit-image" onClick={this.handleTransitModeClick} src={transit} alt=""/>
              </label>
              </div>
              <div className='form-group custom-control custom-radio mr-4'>
              <input
                  id='WALKING'
                  className='custom-control-input'
                  name='travelMode'
                  type='hidden'
                  defaultChecked={this.state.travelMode ==='WALK'}
                  onChange={this.checkWalking}
              />
              <label className='custom-control-label' htmlFor='WALKING'>
                  <img className="walk-image" onClick={this.handleWalkModeClick} src={walking} alt=""/>
              </label>
              </div>
          </div>

          <div className="results-modal-container" > 
            <button type='button' onClick={this.onClick} className="Button">
                {this.state.buttonMode}
            </button>
            {this.sendModal()}
          
          </div>
        <div className="bio-container">
        {/* <div className="subheader">By:</div> */}
            
            <div className="subheader">
              <a href="https://drewshroyer.github.io/" target="_blank" rel="noreferrer">
              Drew Shroyer
              </a>
            </div>
            
            <div className="subheader">
                <a href="https://www.johnrobertmcc.com/" target="_blank" rel="noreferrer">
                  JR McCann
                </a>
            </div>

          </div>
        </div>
        </div>
        
          <div className='map-container'>
                <Map origin={origin} directions={directions} destination={destination} travelMode={travelMode} searched={searched}/>
          </div>
    </div>
      )
  }
};
export default SideBar;
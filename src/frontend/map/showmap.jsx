import React from 'react';
const google = window.google;

class ShowMap extends React.Component{
    constructor(props){
        super(props);
        this.points = [];
        this.center = {};
        this.decodedPath = this.decodedPath.bind(this);
    }

    componentDidMount(){
        this.decodedPath();
        this.map = new google.maps.Map(
            this.mapdiv,
            {zoom:14, center: this.center}
        );
        const border = {
            strokeColor:'#FF4500',
            strokeOpacity: 0.5,
            strokeWeight: 7,
        };
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            draggable: false,
            map: this.map,
            preserveViewport:true,
            suppressMarkers:true,
            polylineOptions: border
        });
        this.service = new google.maps.DistanceMatrixService();
        const map = this.map;
        this.createPath();
        this.directionsRenderer.setMap(map);

    }

    decodedPath(){
        let decodedPath = google.maps.geometry.encoding.decodePath(this.props.route.encoded_polyline)
        this.points.push({location:decodedPath[0]});
        this.points.push({location:decodedPath[Math.floor(decodedPath.length/3)]});
        this.points.push({location:decodedPath[Math.floor(decodedPath.length * 0.66)]});
        this.points.push({location:decodedPath[decodedPath.length -1]}); 
        this.center = {lat: this.points[0].location.lat(), lng:this.points[0].location.lng()};  

    }

    createPath(){
        const _self = this;
        const waypnt = this.points.slice(1);
      
        const request ={
            origin: this.points[0].location,
            destination: this.points[this.points.length -1].location,
            waypoints: waypnt.map(point => ({location: point.location})),
            travelMode: 'BICYCLING'
        };
        
        this.directionsService.route(request, function(result,status){
            if(status === 'OK'){
                _self.directionsRenderer.setDirections(result);
            }
        });
    }

    render(){
        return(
            <div className='showmap' ref={(el)=> this.mapdiv = el }>
                            
                        
            </div>
        )
    }
}

export default ShowMap;



import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import key from '../config/key'
const google = window.google;
 
class ShowMap extends React.Component {
  constructor(props){
    super(props);
    this.points = [];
    this.createPath = this.createPath.bind(this);
    this.registerListeners = this.registerListeners.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.addLatLang = this.addLatLang.bind(this);
    this.listenforChange = this.listenForChange.bind(this);
  }

  componentDidMount(){
    debugger
    this.map = new google.maps.Map(
      this.mapdiv,
      {zoom:14, center: {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
    }}
    );

    const border = {
      strokeColor:'#FF4500',
      strokeOpacity: 0.5,
      strokeWeight: 7,
    };

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      preserveViewport:true,
      suppressMarkers:true,
      polylineOptions: border,
      travelMode: google.maps.TravelMode[this.state.travel_mode]
    });
    this.service = new google.maps.DistanceMatrixService();
    const map = this.map;
    if(typeof this.points[0] !== 'undefined') this.createPath();
    this.directionsRenderer.setMap(map);
    this.registerListeners();
    this.listenForChange();
  }


  registerListeners() {
    google.maps.event.addListener(this.map, 'click', (event)=>{
          this.addLatLang(event.latLng);
          this.addMarker();
          this.createPath();
    });

  }

  addMarker(){
    const map  = this.map;
    const marker = this.points[this.points.length -1];
    const position = {
        lat: marker.location.lat(),
        lng: marker.location.lng()
    };
    new google.maps.Marker({
        position: position,
        map: map,
        icon:{
            path:google.maps.SymbolPath.CIRCLE,
            scale:5,
            strokeWeight: 4,
            fillColor:'white',
            strokeColor:'#D3D3D3'
        },
    });
  }

  addLatLang(location){
            
    this.points.push({
        location:location
    }); 
    if(this.points.length === 1){
        this.setState({
            origin_lat: this.points[0].location.lat(),
            origin_lng: this.points[0].location.lng()
        });
    }else{
        this.setState({
            destination_lat: this.points[this.points.length -1].location.lat(),
            destination_lng: this.points[this.points.length -1].location.lng()
        })
    }  
    
  }

  createPath(){
    const _self = this;
    const waypnt = this.points.slice(1);
    let mode = ''
    if(this.state.activity_type === ''){
        mode = 'BICYCLING';
    }else{
        mode = this.state.activity_type;
    };
    const request ={
        origin: this.points[0].location,
        destination: this.points[this.points.length -1].location,
        waypoints: waypnt.map(point => ({location: point.location})),
        travelMode: mode
    };
    
    this.directionsService.route(request, function(result,status){
        if(status === 'OK'){
            _self.directionsRenderer.setDirections(result);
        }
    });
  }

  listenForChange(){
    const _self = this;
    this.directionsRenderer.addListener('directions_changed', function(){
        const directions = _self.directionsRenderer.getDirections();
        if(directions !== null){
            _self.createStaticUrl(directions);
            _self.findDistanceAndTime(directions);
        
        }
      
    });
  }


  render(){

    const containerStyle = {
      width: '90vw',
      height: '90vh'
    };
    
    const center = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
    };

    return (
      <div className='map' ref={(el)=> this.mapdiv = el }>

      <LoadScript
      googleMapsApiKey={key}
      >
{/* 
    
                            
    
  </div> */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        >
        <></>
      </GoogleMap>
    
    </LoadScript>
        </div>
  )
}
}
 
export default ShowMap;
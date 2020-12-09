import React, {useState} from 'react';
import Map from './map/map';
import bicycle from "../stylesheets/bicycle.png";
import walking from "../stylesheets/walking.png";


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
};

export default SideBar;
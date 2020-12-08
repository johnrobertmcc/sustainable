import React, {useState} from 'react';
import Map from './map/map';



class SideBar extends React.Component {


    render() {
        return(
        
        <div className='sidebar-container'>
            <div className='left-sidebar'>
                This is the left sidebar
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
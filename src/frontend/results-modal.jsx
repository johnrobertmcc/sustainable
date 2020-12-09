import React from 'react';
import { Link } from "react";
import { hydrate } from 'react-dom';

class ResultsModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            car: "",
            transit: "",
            bike: 0,
            walk: 0,
        }
    
        this.handleClickforCancel = this.handleClickforCancel.bind(this);
    }

    handleClickforCancel() {
        let modal = document.getElementsByClassName("modal-outer-container")
        for(let i = 0; i < modal.length; i++){
                     modal[i].style.display = 'none'
                } 
    }

    calculateCarbon(distance) {
        let miles = parseFloat(distance)

        let carNum = 404 * 2 * miles
        let transitNum = 204 * 2 * miles
        let bikeNum = 0 
        let walkNum = 0 

        this.setState({ 
            car: carNum,
            transit: transitNum,
            bike: bikeNum,
            walk: walkNum,
        })

    }


    render() {

        return (
            <div className="modal-outer-container">
        <div className="modal-container">
             <div className="x-icon">
              <button
                className="x-icon-style"
                onClick={this.handleClickforCancel}
              >
                X
              </button>

            </div>
            <div className="results-container">

                    <div className="car-results">{this.state.car}</div>
                    
                    <div className="transit-results">{this.state.transit}</div>

                    <div className="walk-results">{this.state.walk}</div>

                    <div className="bike-results">{this.state.bike}</div>

              </div>
          </div>
       </div>
        )
    }

}

export default ResultsModal;
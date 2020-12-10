import React from 'react';
import { Link } from "react";
import { hydrate } from 'react-dom';

class ResultsModal extends React.Component {

    constructor(props) {
        super(props)
    
        this.handleClickforCancel = this.handleClickforCancel.bind(this);
    }

    handleClickforCancel() {
        let modal = document.getElementsByClassName("modal-outer-container")
        for(let i = 0; i < modal.length; i++){
                     modal[i].style.display = 'none'
                } 
    }

  


    render() {
        debugger

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

                    <div className="car-results">{this.props.carNum}</div>
                    
                    <div className="transit-results">{this.props.transitNum}</div>

                    <div className="walk-results">{this.props.walkNum}</div>

                    <div className="bike-results">{this.props.bikeNum}</div>

              </div>
          </div>
       </div>
        )
    }

}

export default ResultsModal;
import React from 'react';
import { Link } from "react";
import { hydrate } from 'react-dom';
import Carousel from './carousel/carousel'
;
class ResultsModal extends React.Component {

    constructor(props) {
        super(props)
    
        this.handleClickforCancel = this.handleClickforCancel.bind(this);
        this.funFacts = this.funFacts.bind(this);
    }

    handleClickforCancel() {
        let modal = document.getElementsByClassName("modal-outer-container")
        for(let i = 0; i < modal.length; i++){
                modal[i].style.display = 'none'
            } 
    }

    daysIntoYear(date){
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }

    funFacts(){
        let {carNum, transitNum} = this.props;
        let d = new Date();
        let day = this.daysIntoYear(d);
        let carSitch = (carNum * day)/1000000;
        let transitSitch = (transitNum * day)/1000000;
        let lolDoBetter;

        if(carSitch && transitSitch < 5){
               lolDoBetter =( 
               <p>
                    great job staying local!
                </p>)

        }else if(carSitch && transitSitch < 10){
                lolDoBetter = (
                <p>
                    wow! better than I expected from you!
                </p>)
            
        }else if(carSitch && transitSitch < 15){
                lolDoBetter = (
                <p>
                    you can do better
                </p>)
            
        }else if(carSitch && transitSitch < 20){
                lolDoBetter = (
                <p>
                    yo stop
                </p>)
            
        }else if(carSitch && transitSitch < 25){
            lolDoBetter = (
                <p>
                    bro please
                </p>)
            
        }else if(carSitch && transitSitch > 25){
            lolDoBetter = (
                <p>
                    what would Al Gore say?
                </p>)
            
        }

        
        return(
            <div className='fun-facts'>
                <div className="space"> The average </div> <div className="space"> person emits </div> <div className="space">  27 tons of carbon </div> <div className="space"> dioxide a year. </div>
                <div className="space">If you followed  </div> <div className="space">  this path  </div> <div className="space"> every day,  </div> <div className="space">  you would emit </div> <div className="number-colors"> {carSitch} </div> <div> tons just  </div> <div> by driving  </div> <div> this route, </div> 
                 <div className="space"> or </div> 
                 <div className="number-colors"> {transitSitch}  </div> <div className="space"> tons just </div> <div className="space">  by taking </div> <div className="space">  public transit! </div>
                {/* {lolDoBetter} */}
            </div>
        )

    }

    render() {

        let {carNum, transitNum} = this.props;
        let d = new Date();
        let day = this.daysIntoYear(d);
        let carEmit = carNum * day;
        let transitEmit = transitNum * day;
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
                <div className="results-subheader">results</div>
                    <div className="outer-results">Driving:
                        <div className="car-results">{this.props.carNum}</div>
                        <div className="carbon-dioxide">grams of CO</div>
                    </div>

                    <div className="outer-results">Transit:
                        <div className="transit-results">{this.props.transitNum}</div>
                        <div className="carbon-dioxide">grams of CO₂</div>
                    </div>

                    <div className="outer-results">Walking:
                        <div className="walk-results">{this.props.walkNum}</div>
                        <div className="carbon-dioxide">grams of CO₂</div>
                    </div>

                    <div className="outer-results">Biking:
                        <div className="bike-results">{this.props.bikeNum}</div>
                        <div className="carbon-dioxide">grams of CO₂</div>
                    </div>

                    <div className='your-sins'>
                        <div className="space"> If you made </div> <div className="space"> this trip </div> <div className="space"> every day, </div> <div className="space">you </div> <div className="space"> would </div> <div className="space"> have emitted </div>
                        <div className="number-colors"> {carEmit} </div> 
                        <div className="space">grams of CO₂ </div> <div className="space"> since January </div> <div className="space"> 1st by driving! -or- </div>
                        <div className="number-colors"> {transitEmit} </div>
                        <div className="space">grams of CO₂ </div> <div className="space"> since January 1st by </div> <div className="space"> taking public transit!</div>
                    </div>

                {this.funFacts()}
                {/* <Carousel /> */}

              </div>
          </div>
       </div>
        )
    }

}

export default ResultsModal;
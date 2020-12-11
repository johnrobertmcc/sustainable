import React from 'react';
import Carousel from './carousel/carousel'

let facts=[];

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
        let carEmit = carNum * day;
        let transitEmit = transitNum * day;

        facts.push( 
            <div className='fun-facts'>
                    If you made this trip every day, you would have emitted  <span className='num-color'>{carEmit}</span> grams of CO₂ since January 1st by driving! or  <span className='num-color'>{transitEmit}</span> grams of CO₂ since January 1st by taking public transit!
            </div>
            )

        facts.push(
            <div className='fun-facts'>
                The average person emits 27 tons of carbon dioxide a year.
                If you followed this path every day, you would emit <span className='num-color'>{carSitch}</span> tons just by driving this route,
                or  <span className='num-color'>{transitSitch}</span> tons just by taking public transit!
            </div>)

    }

    render() {
        this.funFacts()

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
                        <div className="carbon-dioxide">grams of CO₂</div>
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
                <Carousel facts={facts}/>

              </div>
          </div>
       </div>
        )
    }

}

export default ResultsModal;
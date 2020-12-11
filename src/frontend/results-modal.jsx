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

        if(carNum && transitNum !== 0){

            facts.push( 
                <div className='fun-facts'>
                        If you made this trip every day, you would have emitted  <span className='num-color'>{carEmit}</span> grams of CO₂ since January 1st by driving, or  <span className='num-color'>{transitEmit}</span> grams of CO₂ since January 1st by taking public transit!
                </div>
                )

            facts.push(
                <div className='fun-facts'>
                    The average person emits <span className='num-color'>27 tons</span> of carbon dioxide a year..
                    <br></br>
                    If you followed this path every day, you would emit <span className='num-color'>{carSitch}</span> tons/year just by driving this route,
                    or  <span className='num-color'>{transitSitch}</span> tons/year just by taking public transit!
                </div>
        )}
        facts.push(
            <div className='fun-facts'>
                Walking and biking are great ways to reduce your carbon footprint!
            </div>
        )
        facts.push(
            <div className='fun-facts'>
                But of course, it's not just about CO2! Other contributing factors are:
                <li>Water vapor: The main greenhouse gas, contributing 36-72 % of the greenhouse effect.</li>
                <li>Carbon dioxide: The main contribution to the greenhouse effect by human activities.</li>
                <li>Methane: A very powerful greenhouse gas that is 28 times more potent than carbon dioxide. The levels of methane have increased 170 % since the industrial revolution</li>
                <li>Ozone: Contributing around 5 % of global warming and has seen a 42 % increase since 1750.</li>
                <li>Nitrous oxide: An extremely powerful greenhouse gas with a warming potential 265 times higher than carbon.</li>

                <a className="source" href="https://www.theworldcounts.com/challenges/climate-change/global-warming/global-co2-emissions/story" target="_blank"></a>
                
            </div>
        )



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
                    {this.props.carNum === 0 ? null : 
                        <Carousel facts={facts}/>
                    }

              </div>
          </div>
       </div>
        )
    }

}

export default ResultsModal;
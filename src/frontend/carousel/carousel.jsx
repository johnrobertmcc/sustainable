import React from 'react';

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div
    className={ `slide-arrow ${direction}` }
    onClick={ clickFunction }>
    { glyph }
  </div>
);

class Carousel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      current: 0
    };

    this.previousSlide = this.previousSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
  }

  previousSlide () {
    let {facts} = this.props;
    const lastIndex = facts.length - 1;
    const { current } = this.state;
    const shouldResetIndex = current === 0;
    const index =  shouldResetIndex ? lastIndex : current - 1;

    this.setState({
      current: index
    });
  }

  nextSlide () {
    let {facts} = this.props;
    const lastIndex = facts.length - 1;
    const { current } = this.state;
    const shouldResetIndex = current === lastIndex;
    const index =  shouldResetIndex ? 0 : current + 1;

    this.setState({
      current: index
    });
  }
  render () {
    return (
      <div className="carousel">

        {this.props.facts[this.state.current]}

          <div className="arrow-container">
            
          <Arrow
          direction="left"
          clickFunction={ this.previousSlide }
          glyph="<" />

         <Arrow
         className="arrows"
          direction="right"
          clickFunction={ this.nextSlide }
          glyph=">" />

        </div>
      </div>
    );
  }
}

export default Carousel;
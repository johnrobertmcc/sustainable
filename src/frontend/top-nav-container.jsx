import React from "react";
import logo from "../stylesheets/logo.png"

class TopNavContainer extends React.Component {
render() {
  return (
    <div className="nav-bar-container">
      <img src={logo} className="logo" alt=""/>
        <div className="nav-bar-title">walk this way
        </div>
    </div>
  );
}
}

export default TopNavContainer;
import React from "react";

class TopNavContainer extends React.Component {
render() {
  return (
    <div className="nav-bar-container">
      <div className="nav-bar-inner-container">
        <div className="nav-bar-links">
          <a
            className="nav-bar-link"
            id="nav-bar-dash"
            target="_blank"
            href={"http://drewshroyer.github.io/"}
          >
            Drew Shroyer
          </a>
          <a
            className="nav-bar-link"
            id="nav-bar-dash"
            target="_blank"
            href={"https://www.linkedin.com/in/drew-shroyer-861b32a4/"}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
}

export default TopNavContainer;
import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-inner-container">
            <div className="footer-left-column">Drew Shroyer
              <div className="footer-links">
                 <a
                    href="https://www.linkedin.com/in/drew-shroyer-861b32a4/"
                    className="footer-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/drewshroyer"
                    className="footer-link"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Github
                  </a>
              </div>
            </div>
            <div className="footer-center-column">JR McCann
              <div className="footer-links">
                <a
                    href="https://www.linkedin.com/in/jrmcc/"
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/johnrobertmcc"
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
              </div>
            </div>
            <div className="footer-right-column">Arash Afghahi
              <div className="footer-links">
                 <a
                    href="https://www.linkedin.com/in/arash-afghahi-4aa05193/"
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/drewshroyer"
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
              </div>
            </div>
        </div>
        <div></div>
      </div>
    );
  }
}

export default Footer;
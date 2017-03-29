import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Parallax } from 'react-parallax';
// import ParallaxComponent from 'react-parallax-component';

import Landing1 from '../components/Landing1.jsx';
import Landing2 from '../components/Landing2.jsx';

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div className="parallax-container">
          <Parallax bgImage="./assets/violin.jpg" strength={600}>
            <Landing1 />
          </Parallax>
          <div className="mouse"></div>
        </div>

        <div className="parallax-container">
          <Parallax bgImage="" strength={500}>
            <Landing2 />
          </Parallax>
        </div>

      </div>
    );
  }
}

export default connect()(Homepage);

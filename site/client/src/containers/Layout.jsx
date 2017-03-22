// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Header from '../components/Header.js'
// import Landing from './Landing.jsx'
//
// class Layout extends Component {
//
//   constructor(props) {
//     super(props);
//   }
//
//   render () {
//     return (
//       <div>
//         <Header />
//         <div className="container mainContainer">
//           <div className="row" id="mainRow">
//             <Landing />
//           </div>
//         </div>
//         { /* Footer? */}
//       </div>
//     );
//   }
// }
//
// /*
//   map functions if needed, remove at end if not used
//   const mapProps = state => ({})
//   const mapDispatch = {}
// */
//
// export default connect()(Layout);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Parallax } from 'react-parallax';

import Header from '../components/Header.js';
import Landing1 from '../components/Landing1.jsx';

class Layout extends Component {
  constructor(props){
    super(props);
    this.state = {
      isHide: true
    };
    this.hideBar = this.hideBar.bind(this);
  }

  hideBar(){
     let {isHide} = this.state;

     window.scrollY > 650 ? !isHide && this.setState({isHide: true}) : isHide && this.setState({isHide: false}) //eslint-disable-line
  }

  componentDidMount(){
      this.hideBar();
      window.addEventListener('scroll', this.hideBar);
  }

  componentWillUnmount(){
       window.removeEventListener('scroll', this.hideBar);
  }

  render(){
    let classHide = this.state.isHide;
    return (
      <div>
        <Header classHide={ classHide } />
        <div>
          <Parallax bgImage="./public/Record-Player-Wallpaper.jpg" strength={400}>
            <br />
            <Landing1 />
            <br />
            </Parallax>
            <Parallax bgImage="./public/Record-Player-Wallpaper.jpg" strength={400}>
            <br />
            <Landing1 />
            <br />
          </Parallax>
        </div>

      </div>
    );
  }
}

export default connect()(Layout);

import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Menu.jsx';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      isHide: true
    };
    this.hideBar = this.hideBar.bind(this);
  }

  hideBar(){
    let {isHide} = this.state;

    window.scrollY > this.prev ? !isHide && this.setState({isHide: true}) : isHide && this.setState({isHide: false}) //eslint-disable-line
    this.prev = window.scrollY;
  }

  componentDidMount(){
    this.hideBar();
    window.addEventListener('scroll', this.hideBar);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.hideBar);
  }

  render() {
    let classHide = this.state.isHide;
    return (
      <div id="home">
        <Header classHide={ classHide } />
        <div>
          <Sidebar />
        </div>
        <div id="maindiv" className="white">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Home;

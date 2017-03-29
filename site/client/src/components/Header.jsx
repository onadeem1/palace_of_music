import React, { Component } from 'react';
import { Link } from 'react-router';
import Modal from '../components/Menu.jsx';

const Header = (props) => {
  const isHide = props.classHide ? 'hide' : ''
  console.log(props);
  return (
    <nav id="header" className={"App navbar navbar-default navbar-fixed-top " + isHide}>
      <div id="title" className="App-header container">
        <h2>
          <Link to="/">Palace of Music</Link>
        </h2>
      </div>
    </nav>
  );
}

export default Header;

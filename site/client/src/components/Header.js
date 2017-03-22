import React, { Component } from 'react';

const Header = (props) => {
  const isHide = props.classHide ? '' : 'hide'
  return (
    <div className={`App bg-primary ${ isHide }`}>
      <div className="App-header">
        <h2>Welcome</h2>
      </div>
    </div>
  );
}



export default Header;

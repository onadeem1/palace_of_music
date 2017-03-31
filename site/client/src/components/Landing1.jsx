import React, { Component }from 'react';
import ParallaxLetters from './ParallaxComponent';


const WORD = 'WELCOME TO THE PALACE OF MUSIC';
const random = (min, max) => Math.random() * (max - min) + min;

export default class Landing1 extends Component {
  render() {

    const wrap = {
      height: window.innerHeight * 10,
    };

    return (
      <div id="parallax-letter" style={wrap}>
        {
          WORD.split('').map((letter, index) =>
          <ParallaxLetters
            speed={random(0, 1) * ((random(0, 2) > 1) ? 1 : -1)}
            top="40%"
            left={index === 0 ? 420 : (index * 50) + 420}
            width="20px"
            key={index}>
            <div className="letter" style={{color: "white"}}>{letter}</div>
          </ParallaxLetters>
        )
      }
    </div>
  );
};
}

import React from 'react'
import {Link} from 'react-router'
import {Parallax} from 'react-parallax'
import Landing1 from './Landing1'

const Composers = (props) => {
  console.log("composers component: ", props.composers);
  const composers = props.composers

  if (composers.length !== 0) {
    return (
      <div id="period">
        <div className="parallax-container composer">
          <Parallax id="image" style={{height: 1000}} bgImage="../assets/Record-Player-Wallpaper.jpg" strength={400} blur={{min:1, max:3}}>
            <div className="parallax-container">
              <div id="timeperiod">
                <h3>{composers[0].timeperiod}</h3>
              </div>
            </div>
          </Parallax>
        </div>
        {composers.map(composer => {
          return (
            <div className="parallax-container composer" key={composer.id}>
              <Parallax id="image" bgImage={`../assets/composerPics/${composer.timeperiod}/${composer.name}.jpg`} strength={300}>

                <div className="parallax-container">
                  <div style={{background: "white", marginHeight: "px"}} className="composerSection">
                    <div className="container">
                      <br />
                      <br />
                      <h1 id="composerName" className="header center white-texts">{ composer.name }</h1>
                      <p>{ composer.description }</p>
                      <br />
                    </div>
                  </div>
                </div>

              </Parallax>
            </div>
          )
        })
      }

    </div>
  )
} else {
  return (<h1>Error loading {props.params.period} period composers</h1>)
}
}


export default Composers;

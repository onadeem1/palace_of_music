import React from 'react';

const Landing2 = () => {
  const about = "Palace of Music is a three dimensional virtual museum, created with Babylon JS, where visitors can explore the works of thirty of the most renowned composers through history. Organized by time period, visitors may learn and experience the music that has defined the past several centuries and continues to define music to this day. Created at Fullstack Academy as our capstone project, we aimed to present music in an artistically creative way to emphasize that music not only involves sound, but rather is a full experience. We hope you enjoy your visit!"


  return (
    <div>

      <div className="parallax-container">

        <div className="description">
          <p className="about">ABOUT</p>
          <br />
          <p>{about}</p>
        </div>
        <div className="from">
          <p>Jake Brodsky,  Omer Nadeem,  Silvia Sonn,  Jimmy Zhang</p>
        </div>

        <div style={{background: "white", marginHeight: "px"}} className="section">
          <div className="container">

            <h1 id="hometitle" className="header center white-texts">Fullstack Academy</h1>
            <br />
            <div className="section white">

              <div className="row container">
                <br />
              </div>
              <p id="text" className="grey-text text-darken-3 lighten-3">New York, New York</p>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Landing2;

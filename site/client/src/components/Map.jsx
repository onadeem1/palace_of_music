import React from 'react';

const Location = () => {
  return (
    <div className="map-container">
      <div className="map">
        <h1 style={{color: "white", marginLeft: "8vw"}}>Museum Map</h1>
        <div>
          <img id="map" src={"../../assets/map.jpg"} />
        </div>
      </div>
    </div>
  )
}

export default Location

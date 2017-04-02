import React from 'react';
import { checkVisitor } from '../reducers/visitors-reducer';
import { connect } from 'react-redux';

const Tickets = (props) => {
  const ticket = '/../assets/babylonTicket.jpg';

  return(
    <div id="ticketPage">

      <div id="login">

        <div className="info">
          <h1 style={{color: "white"}}>Museum Admissions</h1>
          <br />
          <h4 style={{color: "white"}}>Hours</h4>
          <ul style={{color: "white"}}>
            <li className="day">Monday-Friday</li>

            <li className="time">10:30am - 6:30pm</li>

            <li className="day">Saturday</li>

            <li className="time">10:30am - 8:30pm</li>

            <li className="day">Sunday</li>

            <li className="time">11:00am - 4:00pm</li>

          </ul>
          <h4 style={{color: "white"}}>Tickets</h4>

        </div>

        <img id="ticket" src={ticket} />
        <div className="login">
          <form method="post" action="http://palace-of-music.herokuapp.com/" target="_blank"
            onSubmit={evt => {
              evt.preventDefault();
              props.checkVisitor(evt.target.firstName.value, evt.target.lastName.value)}}
              >
              <input id="input" type="text" name="firstName" placeholder="First" required="required" style={{fontSize:"18px"}} />
              <input id="input" type="text" name="lastName" placeholder="Last" required="required" style={{fontSize:"18px"}}/>
              <button onClick={() => window.open('http://palace-of-music.herokuapp.com')} type="submit" className="btn btn-primary btn-large" id="ticketButton" style={{marginTop: "27px", backgroundColor: ""}}>Let me in.</button>
            </form>
          </div>
        </div>

      </div>
    )
  }

  const mapDispatchToProps = {
    checkVisitor
  }
  export default connect(null, mapDispatchToProps)(Tickets);

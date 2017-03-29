import React from 'react'

const Tickets = () => {
  return(
    <div id="ticketPage">

      <div id="login">

        <div className="info">
          <h1 style={{color: "white"}}>Museum Admissions</h1>
          <h4>Hours</h4>
          <ul>
            <li className="day">Monday-Friday</li>
            <ul>
              <li className="time">10:30am - 6:30pm</li>
            </ul>
            <li className="day">Saturday</li>
            <ul>
              <li className="time">10:30am - 8:30pm</li>
            </ul>
            <li className="day">Sunday</li>
            <ul>
              <li className="time">11:00am - 4:00pm</li>
            </ul>
          </ul>
          <h4>Tickets</h4>
          <ul>
            <li>Adults</li>
            <li>Children</li>
            <li>Seniors</li>
            <li>Fullstack Students</li>
          </ul>
        </div>

        <div className="login">
          <h1>Sign In</h1>
          <form method="get" action="/museum/members" target="_blank">
            <input type="text" name="u" placeholder="First" required="required" />
            <input type="text" name="p" placeholder="Last" required="required" />
            <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Tickets;

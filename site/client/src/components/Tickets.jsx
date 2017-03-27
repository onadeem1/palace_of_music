import React from 'react'

const Tickets = () => {
  return(
    <div className="ticketPage">
      <h1>Museum Admissions</h1>
      <h4>Hours</h4>
      <ul>
        <li>Monday-Friday</li>
        <ul>
          <li>10:30am - 6:30pm</li>
        </ul>
        <li>Saturday</li>
          <ul>
            <li>10:30am - 8:30pm</li>
          </ul>
        <li>Sunday</li>
          <ul>
            <li>11:00am - 4:00pm</li>
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
  )
}

export default Tickets;

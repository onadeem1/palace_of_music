import React from 'react'
import { Link } from 'react-router'


$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });
});

const PeriodModal = () => {
  return (
    <div id="wrapper">
      <div className="overlay"></div>

      {/* Sidebar */}
      <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
        <ul className="nav sidebar-nav">
          <li className="sidebar-brand">
            <a href="#">
              Information
            </a>
          </li>
          <li>
            <Link to="/museum/tickets">Tickets</Link>
          </li>
          <li>
            <Link to="/museum/map">Map & Location</Link>
          </li>
          <li>
            <Link to="/museum/music">Music</Link>
          </li>
          <li>
            <Link to="/museum/join">Become a Member</Link>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">The Collection <span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
              <li className="dropdown-header">Time Period</li>
              <li>
                <Link to="/period/Baroque">Baroque</Link>
              </li>
              <li>
                <Link to="/period/Classical">Classical</Link>
              </li>
              <li>
                <Link to="/period/Romantic">Romantic</Link>
              </li>
              <li>
                <Link to="/period/Post-Romantic">Post Romantic</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {/* #sidebar-wrapper */}

      {/* Page Content */}
      <div id="page-content-wrapper">
        <button id="menu" type="button" className="hamburger is-closed" data-toggle="offcanvas">
          <span className="hamb-top"></span>
          <span className="hamb-middle"></span>
          <span className="hamb-bottom"></span>
        </button>
        {/*
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2">
              Page Content
            </div>
          </div>
        </div>
      */}
    </div>
      {/* #page-content-wrapper */}

    </div>
  )
}

export default PeriodModal;

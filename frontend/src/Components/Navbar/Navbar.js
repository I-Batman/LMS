import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.svg";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showDateTime, setShowDateTime] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <a className="active_link" href="#">
          Admin
        </a>
      </div>
      <div className="navbar__right">
        <div className="datetime-container">
          
          {showCalendar && <div className="calendar-popup"></div>}

          <a onClick={() => setShowDateTime(!showDateTime)}>
            <i className="fa fa-clock-o" aria-hidden="true"></i>
          </a>
          {showDateTime && (
            <div className="datetime-popup">{formattedDateTime}</div>
          )}
        </div>
        <div className="avatar-container">
          <a onClick={() => setShowLogoutPopup(!showLogoutPopup)}>
            <img width="30" src={avatar} alt="avatar" />
          </a>
          {showLogoutPopup && (
            <div className="popup">
              <Link to="/admin-login">
                <button className="logout-btn">Logout</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

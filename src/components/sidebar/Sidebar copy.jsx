import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import { useState } from "react";

import {
  Home,
  Assignment,
  People,
  Timeline,
  Settings,
  Dashboard,

} from '@mui/icons-material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

export default function Sidebar() {
  const {user } = useSelector((state) => state.users);
  
  //console.log("Authenticated ", isAuthenticated)//
  // drop down
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  //end drop down

  return (
   
    <div className="sidebar">
    <div className="sidebar-wrapper">
      <div className="sidebar-menu">
        {user.roles.some(role=>role.name==="admin") && (
          <>
            <h5 className="sidebar-title">Dashboard</h5>
            <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <Home className="sidebar-icon" />
                <Link to="/" className="sidebar-link">
                  Home
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Assignment className="sidebar-icon" />
                <Link to="/adverts-list" className="sidebar-link">
                  Adverts
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Timeline className="sidebar-icon" />
                <Link to="/new-advert" className="sidebar-link">
                  Create Advert
                </Link>
              </li>
              <li className="sidebar-list-item">
                <People className="sidebar-icon" />
                <Link to="/short-listing" className="sidebar-link">
                  ShortListed
                </Link>
              </li>

              {/* <li className="sidebar-list-item">
                <People className="sidebar-icon" />
                <Link to="/interview-candidates/" className="sidebar-link">
                  Interview Candidates
                </Link>
              </li> */}
              <li className="sidebar-list-item">
                <Assignment className="sidebar-icon" />
                <Link to="/interview-results/" className="sidebar-link">
                  Interview Results
                </Link>
              </li>

              <li className="sidebar-list-item">
              <div className="dropdown">
                <li onClick={toggleDropdown} className="sidebar-dropdown-item">
                  <Settings className="sidebar-icon" />
                  <span className="sidebar-link">Settings</span>
                </li>
                {isOpen && (
                  <div className="dropdown-content">
                    <Link to="/new-document-type" className="sidebar-link">
                      Document Type
                    </Link>
                    <Link to="/new-contact-type" className="sidebar-link">
                      Contact Type
                    </Link>
                    <Link to="/new-nationality" className="sidebar-link">
                      Nationality
                    </Link>
                  </div>
                )}
              </div>
            </li>

     

              {/* <li className="sidebar-list-item">
                <People className="sidebar-icon" />
                <Link to="/users" className="sidebar-link">
                  Applicants
                </Link>
              </li> */}
              {/* <li className="sidebar-list-item">
                <Timeline className="sidebar-icon" />
                <Link to="/transactions" className="sidebar-link">
                  Applications
                </Link>
              </li> */}
            </ul>
          </>
        )}
        {user.roles.some(role=>role.name==="user") && (
          <>
            <h5 className="sidebar-title">Applicant Menu</h5>
            <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <Dashboard className="sidebar-icon"/>
                <Link to="/dashboard" className="sidebar-link">
                    Dashboard
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Assignment className="sidebar-icon" />
                <Link to="/applicant-info" className="sidebar-link">
                  Profile
                </Link>
              </li>
              <li className="sidebar-list-item">
                <FormatListNumberedIcon className="sidebar-icon" />
                <Link to="/applicant-adverts-list" className="sidebar-link">
                  Jobs
                </Link>
              </li>
            </ul>
            <h5 className="sidebar-title">My Profile</h5>
            <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <Assignment className="sidebar-icon" />
                <Link to="/applicant-qualifications" className="sidebar-link">
                  Qualifications
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Assignment className="sidebar-icon" />
                <Link to="/applicant-experience" className="sidebar-link">
                  Experience
                </Link>
              </li>
            </ul>

            {/* <h5 className="sidebar-title">Notifications</h5> */}
            {/* <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <Email className="sidebar-icon" />
                <Link to="/main" className="sidebar-link">
                  Main
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Feedback className="sidebar-icon" />
                <Link to="/feedback" className="sidebar-link">
                  Feedback
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Chat className="sidebar-icon" />
                <Link to="/messages" className="sidebar-link">
                  Messages
                </Link>
              </li>
            </ul> */}
          </>
        )}
      </div>
    </div>
  </div>
);
}

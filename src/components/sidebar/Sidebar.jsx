import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Home, Dashboard, Assignment, FormatListNumbered, Timeline, People, Settings, AddToDrive, NoteAdd, Explore, BookOutlined } from '@mui/icons-material';

export default function Sidebar() {
  const { user } = useSelector((state) => state.users);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <Link to="#" className="align-items-center mb-3 link-body-emphasis">
        <span className="sidebar-title">Menu</span>
      </Link>

      <Nav className="nav nav-pills flex-column mb-auto">

      {user.roles.some(role=>role.name==="admin") && (
        <>
        {/* admin links */}
        <NavItem>
          <Link to="/" className="nav-link active side-bar" aria-current="page">
            <Home className="me-2" />
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/adverts-list" className="nav-link link-body-emphasis side-bar">
            <Dashboard className="me-2" />
            Adverts
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/new-advert" className="nav-link link-body-emphasis side-bar">
            <Assignment className="me-2" />
            Create Advert
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/short-listing" className="nav-link link-body-emphasis side-bar">
            <FormatListNumbered className="me-2" />
            Shortlisted
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/interview-results/" className="nav-link link-body-emphasis side-bar">
            <People className="me-2" />
            Interview Results
          </Link>
        </NavItem>

        <NavItem className='sidebar-list-item'>
        {/* <Dropdown isOpen={isOpen} toggle={toggleDropdown} className='dropdown'>
        <DropdownToggle className="nav-link link-body-emphasis side-bar">
        <Settings className="sidebar-icon" />
          Settings
        </DropdownToggle>
        <DropdownMenu className="shadow">
          <Link to="/new-document-type">Document Type</Link>
          <Link to="/new-contact-type">Contact Type</Link>
          <Link to="/new-nationality">Nationality</Link>
        </DropdownMenu>
      </Dropdown> */}
         {/* I improve the design for this dropdown */}
        <div className="dropdown">
          <li onClick={toggleDropdown} className="sidebar-dropdown-item">
            <Settings className="sidebar-icon" />
            <span>Settings</span>
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
          
        </NavItem>

        {/* end admin links */}

        </>
      )}

    {user.roles.some(role=>role.name==="user") && (
            <>
            {/* user links */}
            <NavItem>
          <Link to="/dashboard" className="nav-link link-body-emphasis side-bar">
            <Dashboard className="me-2" />
            Dashboard
          </Link>
        </NavItem>

        <NavItem>
          <Link to="/applicant-info" className="nav-link link-body-emphasis side-bar">
            <People className="me-2" />
            Profile
          </Link>
        </NavItem>

        <NavItem>
          <Link to="/applicant-adverts-list" className="nav-link link-body-emphasis side-bar">
            <AddToDrive className="me-2" />
            Jobs
          </Link>
        </NavItem>
{/* 
        <NavItem>
          <Link to="/my-applications" className="nav-link link-body-emphasis side-bar">
            <BookOutlined className="me-2" />
            My Applications
          </Link>
        </NavItem> */}

        <NavItem>
          <Link to="/applicant-qualifications" className="nav-link link-body-emphasis side-bar">
            <NoteAdd className="me-2" />
            My Qualifications
          </Link>
        </NavItem>

        <NavItem>
          <Link to="/applicant-experience" className="nav-link link-body-emphasis side-bar">
            <Explore className="me-2" />
            My Experience
          </Link>
        </NavItem>

            {/* user admin links */}

            </>
          )}
 
      </Nav>
     
     
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {useLogoutMutation} from '../../redux/features/authApiSlice';
import {logout as setLogout} from '../../redux/features/authSlice';
import { Person } from '@mui/icons-material';
import { toast } from 'react-toastify';


// import logo from './logo.png';

export default function Navbar() {
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, {isLoading, error}]= useLogoutMutation()
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout()
    .unwrap()
    .then(()=>{
      dispatch(setLogout());
      //navigate('/vacancies');
    })
    .catch(()=>{
      toast.error("Ooops Something went wrong trying to log you out")
    })
  };

  const {isAuthenticated, user} = useSelector((state) => state.auth)
  const username = user?.user?.user?.email;
  const guestLinks= ()=>(
    <>
      <li className="nav-item"> 
        <Link to="/" className="nav-link">
            Jobs
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </>
  )
  const authLinks= ()=>(
    <>
      <li className="nav-item"> 
        <Link to="/" className="nav-link">
            Jobs
        </Link>
      </li>
      <li className="nav-item">
        <div
          className="nav-link"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          {username || 'User Account'}
          <Person />
        </div>
        
      </li>
      {/* <li className='nav-item mt-2'>
        <Link className='text-secondary' to="/dashboard">Dashboard</Link>
      </li> */}
      <li className='nav-item mt-1 px-2'>
        <button onClick={()=>handleLogout()} className='btn btn-danger btn-sm '>Logout</button>
      </li>
    </>
  )
 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow mb-4">
      <div className="container-fluid">
       
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="MSU Recruitment System" className="navbar-logo" />
        
        {/* <span className="navbar-brand text-gray-800">MSU Recruitment System</span> */}
        <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarContent"
        aria-controls="sidebarContent"
        aria-expanded={open ? 'true' : 'false'}
        aria-label="Toggle navigation"
        onClick={handleClick}
      >
        <span className="navbar-toggler-icon"></span>
      </button>


      <div className={`collapse navbar-collapse justify-content-end ${open ? 'show' : 'hide'}`} id="sidebarContent">
        
          <ul className="navbar-nav">
            {isAuthenticated ? authLinks() : guestLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
}
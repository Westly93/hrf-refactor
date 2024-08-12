import React from 'react'
import { Language, NotificationsNone, Settings } from '@mui/icons-material'; 
import  './topbar.css';

export default function Topbar() {
  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
               <span className="logo">HRSystemAdmin</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone/>
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language/>
                </div>

                <div className="topbarIconContainer">
                    <Settings/>
                </div>

                <img src="../../../public/logo192.png" alt="" className="topAvater"/>
            </div>
        </div>
    </div>
  )
}

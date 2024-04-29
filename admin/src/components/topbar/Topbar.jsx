import React from "react";
import "./topbar.scss";
import { NotificationsNone, Language, Settings,AccountCircle } from "@mui/icons-material";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext } from "react";
import { logout } from "../../context/authContext/AuthActions";

export default function Topbar() {
      const { dispatch } = useContext(AuthContext);
      const user = JSON.parse(localStorage.getItem("user"));


  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            {/* <span className="topIconBadge">2</span> */}
          </div>
          <div className="topbarIconContainer">
            <Language />
            {/* <span className="topIconBadge">2</span> */}
          </div>
          <div className="topbarIconContainer profile">
            <AccountCircle className="icon"/>
            <Settings />
            <div className="options">
                        <span>setting</span>
                        <span onClick={() => dispatch(logout())}>Logout</span>
                    </div>
          </div>
        </div>
      </div>
    </div>
  );
}
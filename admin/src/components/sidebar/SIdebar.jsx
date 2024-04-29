import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {  useLocation } from "react-router-dom";


export default function Sidebar() {
  let location = useLocation(); 
  console.log(location.pathname)

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link" >
            <li className={`sidebarListItem ${location.pathname == "/" ? "active" : ""}`}>
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            {/* {<li className={`sidebarListItem ${location.pathname == "/" ? "active" : ""}`}>
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className={`sidebarListItem ${location.pathname == "/" ? "active" : ""}`}>
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>} */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className={`sidebarListItem ${location.pathname == "/users" ? "active" : ""}`}>
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className={`sidebarListItem ${location.pathname == "/movies" ? "active" : ""}`}>
                <Storefront className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li className={`sidebarListItem ${location.pathname == "/lists" ? "active" : ""}`}>
                <Storefront className="sidebarIcon" />
                Lists
              </li>
            </Link>
           {/* { <li className={`sidebarListItem ${location.pathname == "/" ? "active" : ""}`}>
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className={`sidebarListItem ${location.pathname == "/" ? "active" : ""}`}>
              <BarChart className="sidebarIcon" />
              Reports
            </li>} */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" >
              <Link to="https://gmail.com/" className="link">
              <MailOutline className="sidebarIcon"/>
              Mail
              </Link>
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className={`sidebarListItem ${location.pathname == "/" ? "active" : ""}`}>
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className={`sidebarListItem ${location.pathname == "/" ? "active" : ""}`}>
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className={`sidebarListItem ${location.pathname == "/" ? "active" : ""}`}>
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

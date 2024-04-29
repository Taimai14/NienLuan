import { Notifications, Search,AccountCircle,KeyboardArrowDown } from "@mui/icons-material";
import "./navbar.scss";
import { useContext } from "react";
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";

export default function Navbar({setGenre}){
      const { dispatch } = useContext(AuthContext);
      const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
        <div className="container">
            <div className="left">
                <Link to="/" className="link" onClick={()=>setGenre('')}>
                <span>HomePage</span>
                </Link>
                <Link to="/series" className="link" onClick={()=>setGenre('')}>
                <span>Series</span>
                </Link>
                <Link to="/movies" className="link"onClick={()=>setGenre('')}>
                <span>Movies</span>
                </Link>
                {/* <Link to="/popular" className="link">
                <span>Popular</span>
                </Link> */}
                <Link to="/myList" className="link">
                <span>MyList</span>
                </Link>

            </div>
            <div className="right">
                <Notifications className="icon"/>
               {user.profilePic ? (
                    <img src={user.profilePic} alt="User Profile Picture" className="icon" />
                ) : (
                    <AccountCircle className="icon" />
                )}
                <span>{user.username}</span>
                <div className="profile">
                    <KeyboardArrowDown className="icon"/>
                    <div className="options">
                        <Link to="/user" className="link">
                            <span>Setting</span>
                        </Link>
                        <span onClick={() => dispatch(logout())}>Logout</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
};


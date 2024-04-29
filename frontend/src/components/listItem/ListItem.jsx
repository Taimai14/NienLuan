import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import e from "cors";

export default function ListItem({ index,item }) {
   const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [like, setLike] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?._id; 
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);

        const storedLike = localStorage.getItem(`like-${movie._id}`); 
        setLike(storedLike !== null ? JSON.parse(storedLike) : res.data.likes.some((user) => user.user === userID)); 
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  const handleLikeButton = async (id) => {
    try {
      const endpoint = like ? "/unlike" : "/like";
      const data = like ? {} : { user: userID }; 
      const res = await axios.put(`/movies${endpoint}/${id}`, data, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setLike(!like);
      localStorage.setItem(`like-${movie._id}`, JSON.stringify(like)); 
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div state={ movie }>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onClick={handleLikeButton}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
     <img
        src={movie.img}
        alt=""
      />
      {isHovered && (
        <>
        <Link to={{ pathname: "/movie/" + movie._id }} state={movie}>
          <video src={movie.trailer} autoPlay={true} loop muted/>
        </Link>
          <div className="itemInfo" >
            <div className="icons">
              <Link
                  to={{ pathname: "/movie/" + movie._id }} state={movie}
                >
                  <PlayArrow className="icon" />
                </Link>
              <ThumbUpAltOutlined className={"" + (like ? "icon liked":"icon")} onClick={()=>handleLikeButton(movie._id)}/>
            </div>
              <span>{movie.title}</span>
            <div className="itemInfoTop">
              <span>{movie.year}</span>
            </div>
            <div className="desc" style={{ display: "-webkit-box", WebkitLineClamp: 2, overflow: "hidden" }}>
                {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  </div>
  );
}
import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.scss";
import {Link} from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured({ type,setGenre }) {
  const [movie,setMovie]=useState({});
  const [show, setShow] = useState(false)

  
  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const res = await axios.get(`movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomMovie();
  }, [type]);
  
  
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre"  onChange={(e) => setGenre(e.target.value)}>
            <option value="">Genre</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Historical">Historical</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Western">Western</option>
            <option value="Animation">Animation</option>
            <option value="Drama">Drama</option>
            <option value="Documentary">Documentary</option>
            <option value="Action">Action</option>

          </select>
        </div>
      )}
      <img
        src={movie?.img}
        alt=""
      />
      <div className="info">
        <span className="title" >
          {show? movie.title:null}
        </span>
        <span className="desc">
          {show? movie.desc:null}
        </span>
        <div className="buttons">
          <button className="play">
            <Link to="/watch" state={movie}className="link">
              <PlayArrow />
              <span>Play</span>
            </Link>
          </button>
          <button className="more">
            <InfoOutlined />
            <span onClick={()=>setShow(!show)}>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
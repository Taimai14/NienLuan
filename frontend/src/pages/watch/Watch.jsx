import { ArrowBackOutlined } from "@mui/icons-material";
import "./watch.scss";
import { Link, useLocation } from "react-router-dom";


export default function Watch() {
  const location = useLocation();
  const movie = location.state;
  console.log(location)
  return (
    <div className="watch">
        <Link to="/" className="link">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
        </Link>
      <video
        className="video"
        autoPlay
        controls
        playsInline
        src={movie.video}
      />
    </div>
  );
}
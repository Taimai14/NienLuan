import { Container, Grid,Card,CardMedia,CardContent,CardActions,Typography,CardActionArea } from '@mui/material'
import { Link } from "react-router-dom";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import './moviecard.scss'
import { grey } from '@mui/material/colors';
import React, { useState, useEffect } from 'react'
import axios from "axios";



function Moviecard({movie}) {
    const [like, setLike] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id; 

  useEffect(() => {
    const storedLike = localStorage.getItem(`like-${movie._id}`);
    const isLiked = movie.likes.some(like => like.user===user._id);

    console.log(isLiked);
    setLike(isLiked); 
  }, [movie]);

  const handleLikeButton = async (id) => {
    try {
      const endpoint = like ? "/unlike" : "/like";
      const data = like ? {} : { user: userID }; // Data only needed for like

      // Replace with your actual axios call (assuming movies API)
      const res = await axios.put(`/movies${endpoint}/${id}`, data, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });

      setLike(!like);
      localStorage.setItem(`like-${movie._id}`, JSON.stringify(like)); // Update localStorage

    } catch (err) {
      console.log(err);
    }
  };
  return (
            <Card sx={{ maxWidth: 300 }}>
                <Link
                  to={{ pathname: "/movie/" + movie._id }} state={movie}
                >
                <CardMedia
                    sx={{ height: 300, transition: 'transform 0.3s ease-in-out' }}
                    component="img"
                    image={movie.img} 
                    title={movie.title}/>
                </Link>
                
                <CardActions sx={{ justifyContent: 'space-between',backgroundColor: grey[400] }}>
                    <Link to="/watch" state={ movie } ><PlayArrow className="icon" /></Link>
                    <ThumbUpAltOutlined
                        className={like ? "icon liked" : "icon"} 
                        onClick={() => handleLikeButton(movie._id)}
                    />
                </CardActions>
            </Card>
  )
}

export default Moviecard
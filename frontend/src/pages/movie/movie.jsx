import React, { useState, useEffect } from 'react'
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete'; 
import './movie.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar';
import { Container,Grid,TextField,Button } from '@mui/material';
import { PlayArrow,ThumbUpAltOutlined } from '@mui/icons-material';

export default function Movie() {
    const[genre, setGenre] = useState('');
  const location = useLocation();
  const movie = location.state;
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

  const [like, setLike] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id; 

  useEffect(() => {
    const storedLike = localStorage.getItem(`like-${movie._id}`);
    const isLiked = movie.likes.some(like => like.user===user._id);

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/movies/comments/${movie._id}`,{
          headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
        });
        setComments(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchComments();
    console.log(isLiked);
    console.log(comments);
    setLike(isLiked); 
  }, [movie,user]);

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
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment) return; 

    try {
      const response = await axios.post(`/movies/comments/${movie._id}`, {
        content: newComment,
        user: user._id, 
      }, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });

      setComments([...comments, response.data]); 
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`/movies/comments/${movie._id}/${commentId}`,{
      headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
    });
    
    setComments(comments.filter(comment => comment._id !== commentId));  
  } catch (err) {
    console.error(err);
  }
};
  return (
    <>
    <div className='movie'>
      <Navbar setGenre={setGenre}/>
        <Container style={{ marginTop: '100px' }}>
          <Grid container spacing={2} className='movie_info'>
            <Grid item xs={6}>
              <img src={movie.img} alt="" className='movie_img'/>
            </Grid>
            <Grid item xs={6}>  
                <h1 className='movie_title'>{movie.title}:</h1>
                <div className='movie_des'>
                  <p>Genre: {movie.genre}</p>
                  <p>Description: {movie.desc}</p>
                  <p>Year: {movie.year}</p>
                  <p>Type: {(movie.isSeries)? 'Series': 'Movies'}</p>
                </div>
                <div className='icons'>
                  <Link to="/watch" state={ movie } ><PlayArrow className="icon" /></Link>
                      <ThumbUpAltOutlined
                          className={like ? "icon liked" : "icon"} 
                          onClick={() => handleLikeButton(movie._id)}
                      />
                </div>
            </Grid>
          </Grid>

          <div className="comments-container">
            <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit} className='comment_form'>
          <TextField
              id="new-comment"
              label="Add Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              multiline
              style={{ backgroundColor: 'white', color: 'black' }}

            />
            <Button type="submit" variant="contained">Post Comment</Button>
          </form>
            {comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <div>
                {comment.user && <p><span>{comment.user.username}: </span>{comment.content}</p>}
                <p className="time-since">Posted {comment.timeSinceCreated}</p>
                </div>
                 {comment.user && comment.user._id === user._id && ( 
                    <button onClick={() => handleDeleteComment(comment._id)} className='comment_delete'><DeleteIcon/></button>
                  )}
                </div>
            ))}
          </div>
        </Container>
    </div>

    </>
  )
}

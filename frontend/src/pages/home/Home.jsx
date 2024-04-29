import React, { useEffect, useState,useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './home.css'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import MovieCard from '../../components/moviecard/Moviecard'
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCall";
import axios from 'axios';
import { Container, InputBase, IconButton, Paper, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Home({type}) {
  const [lists,setLists] = useState([]);
  const[genre, setGenre] = useState('');
  const { movies, dispatch } = useContext(MovieContext);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);
  const [isLoading, setIsLoading] = useState(true); 


  useEffect(()=>{
    const getRamdomLists = async ()=>{
      try{
        const res = await axios.get(`lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""}`,{
              headers:{
                 token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
              }
            });
        setLists(res.data);
        setIsLoading(false); 

      }catch(err){
        console.log(err)
        setIsLoading(false); 
      }
    };
    getRamdomLists();
  },[type,genre])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const filteredMovies = movies.filter((movie) =>{
      const lowerTitle = movie.title.toLowerCase();
      const lowerDesc = movie.desc.toLowerCase();
      const searchMatch = lowerTitle.includes(searchTerm) || lowerDesc.includes(searchTerm);
      const typeMatch = type ? movie.isSeries === (type === 'series') : true; 
      return searchMatch && typeMatch;
    }
    );
    setFilteredMovies(filteredMovies);
  }, [searchTerm, movies,type]);

  console.log(lists)
  console.log(genre)
  console.log(movies)
  return (
    <div className='home' >
      <Navbar setGenre={setGenre}/>
      <Featured type={type} setGenre={setGenre}/>
      {
      lists.map((list, index) => (
        (list.genre === genre || genre === "" || !list.genre) && (
          <List list={list} key={index} />
        )
      ))
      }
      <div className="search-bar-container">
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500,borderRadius:20 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Movies (Title or Description)"
            inputProps={{ 'aria-label': 'search movies' }}
            value={searchTerm}
            onChange={handleSearch}
          />
          <IconButton type="submit" sx={{ p: 1 }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Container maxWidth="lg">
          <div className="mt-20">
            <Grid container spacing={5}> {/* Closing tag added */}
              {filteredMovies.map((movie, index) => (
                (movie.genre.includes(genre) || genre === "" || !movie.genre) && (
                  <Grid item xs={3} key={index}>
                    <MovieCard movie={movie} />
                  </Grid>
                )
              ))}
            </Grid>
          </div>
        </Container>
        
      )}
    </div>
  )
}

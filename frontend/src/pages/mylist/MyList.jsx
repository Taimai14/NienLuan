import React, { useEffect, useState,useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './myList.css'
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies,deleteMovie } from "../../context/movieContext/apiCall";
import List from '../../components/list/List'
import axios from 'axios';

export default function MyList() {
  const[genre, setGenre] = useState('');
  const { movies, dispatch } = useContext(MovieContext);
  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user._id;
  const user1LikedMovies = movies.filter((movie) => movie.likes.some((like) => like.user === userID));

  const handleDelete = async (id) => {
    try{
      const res = await axios.put(`/movies/unlike/${id}`,{}, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        window.location.reload()
    }catch(err){
          console.log(err);
      }
  };

  const columns = [
    // { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt=""/>
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120,flex: 1,},
    { field: "year", headerName: "year", width: 120,flex: 1 },
    // { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120,flex: 1 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        console.log(params.row)
        return (
          <>
            <Link
                  to={{ pathname: "/movie/" + params.row._id }} state={params.row}
                >
              <button className="productListEdit">Watch</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className='list' >
      <Navbar setGenre={setGenre}/>
      <div className='grid'>
        <h1>MY LIST</h1>
        {user1LikedMovies.length === 0 ? (
          <p>No movies in your list yet. Start adding some!</p>
        ) : (
        <DataGrid
          pagination
          rows={user1LikedMovies}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          getRowId={(r) => r._id}
          sx={{color:"primary"}}
          className='griditem'
        />
        )}
      </div>
    </div>
  )
}

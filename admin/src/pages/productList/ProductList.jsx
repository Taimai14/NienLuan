import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies,deleteMovie } from "../../context/movieContext/apiCall";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/SIdebar";
import { ref, deleteObject, getStorage } from "firebase/storage";


export default function MovieList() {
  const { movies, dispatch } = useContext(MovieContext);
  const [movieIdToDelete, setMovieIdToDelete] = useState(null); 

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);


  const confirmMovieDeletion = async () => {
    if (movieIdToDelete) {
      try {
        await deleteMovie(movieIdToDelete, dispatch);

        const movieToDelete = movies.find((movie) => movie._id === movieIdToDelete);

        const storage = getStorage();

        if (movieToDelete.img) {
          const imgRef = ref(storage,movieToDelete.img); 
          await deleteObject(imgRef);
        }

        if (movieToDelete.trailer) {
          const trailerRef = ref(storage, movieToDelete.trailer); 
          await deleteObject(trailerRef);
        }

        if (movieToDelete.video) {
          const videoRef = ref(storage, movieToDelete.video); 
          await deleteObject(videoRef);
        }

        setMovieIdToDelete(null);
      } catch (err) {
        console.error("Error deleting movie or files:", err);
      }
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setMovieIdToDelete(id);
    }
  };

  console.log(movies)
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    // { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        
        return (
          <>
            <Link
              to={{ pathname: "/movies/" + params.row._id }} state={params.row}
            >
              <button className="productListEdit">Edit</button>
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
    <>
    <Topbar/>
    <div className="container">
    <Sidebar/>
    <div className="productList">
      <span>Create New Movie </span>
      <Link to="/newMovie">
          <button className="productAddButton">Create</button>
      </Link>
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
      {movieIdToDelete && confirmMovieDeletion()}

    </div>
          </div>
    </>
  );
}
import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {useEffect, useContext } from "react";
import {UserContext } from "../../context/userContext/UserContext";
import { getUsers,deleteUser } from "../../context/userContext/apiCall"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/SIdebar";

export default function UserList() {
  const {users,dispatch} = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };


  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "profilePic",
      headerName: "Avatar",
      width: 90,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={params.row.profilePic || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,},
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/users/" + params.row._id }} state={params.row}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
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
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
    </div>
    </>
  );
}
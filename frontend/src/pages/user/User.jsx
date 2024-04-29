import React from 'react'
import './user.scss'
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { useState } from "react";
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import { ref, uploadBytesResumable, getDownloadURL,getStorage,deleteObject } from "firebase/storage";
import {storage} from "../../firebase";

export const User = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const[genre, setGenre] = useState('');
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);

   const [data,setData] = useState({
    username:user.username,
    email:user.email,
    password:user.password,
    profilePic:user.profilePic,
  });
  const deleteFile = async (fileUrl) => {
    try {
      const storageRef = getStorage();
      const desertRef = ref(storageRef, fileUrl);
      await deleteObject(desertRef);
      console.log("File deleted successfully:", fileUrl);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

    const handleChange = async (e) => {
        e.preventDefault();
        const {username,email,password,profilePic} = data;
        try {
            await axios.put(`users/password/${user._id}`, {username,email,password,profilePic },{
                headers:{
                        token: "Bearer "+user.accessToken
                    },
            });
            console.log(user);
            alert('Profile Updated Successfully!');
            window.location.reload(); 
            setData({});
        } catch (err) {}
    };
  const upload =async (items) => {
    const existingFileUrl = data.profilePic; 
      if (existingFileUrl) {
        await deleteFile(existingFileUrl); 
      }
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const fileRef = ref(storage,`img/${fileName}`)
      const uploadTask = uploadBytesResumable(fileRef, item.file,{ contentType: item.file.type });
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => {
              return { ...prev, profilePic: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  

  const handleUpload = (e) => {
      e.preventDefault();
      upload([
        { file: img, label: "img" },
      ]);
      console.log(data)
      console.log(user)

    };
  return (
      <div className='user'>
      <Navbar setGenre={setGenre}/>
        <div className="wrapper">
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilePic || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{Date(user.createdAt)}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">EDIT USER INFO</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  defaultValue={user.username}
                  className="userUpdateInput"
                  value={data.username} onChange={(e) => setData({...data,username: e.target.value})}
                />
              </div>
              <div className="userUpdateItem">
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  defaultValue={user.email}
                  className="userUpdateInput"
                  value={data.email} onChange={(e) => setData({...data,email: e.target.value})}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="..."
                  defaultValue={user.password}
                  className="userUpdateInput"
                  value={data.password} onChange={(e) => setData({...data,password: e.target.value})}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.profilePic || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={(e) =>setImg(e.target.files[0])}/>
                <button className="userUpdateButton" onClick={handleUpload}>
                  Upload
                </button>
              </div>
              <button className="userUpdateButton" onClick={handleChange}>Update</button>
            </div>
          </form>
        </div>
      </div>
            </div>
    </div>
  )
}

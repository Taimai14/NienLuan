import { Link,useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./product.css";
import {useNavigate} from 'react-router-dom'
import { Publish } from "@mui/icons-material";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/SIdebar";
import { ref, uploadBytesResumable, getDownloadURL,getStorage,deleteObject } from "firebase/storage";
import {storage} from "../../firebase";

export default function Product() {
  const location = useLocation();
  const movie = location.state;
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(0);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [img, setImg] = useState(null);



  const [data,setData] = useState({
    title:movie.title,
    genre:movie.genre,
    year:movie.year,
    img:movie.img,
    video:movie.video,
    trailer:movie.trailer,
  })
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
        const {title,genre,year,img,video,trailer} = data;
        try {
            await axios.put(`${movie._id}`, {title,genre,year,img,video,trailer },{
                headers: {
                    token:
                      "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
                  },
            });
            setData({});
            navigate("/movies");
        } catch (err) {}
  };
  const upload = async (items) => {
     const uploadItems = items.filter((item) => item.file);

      if (!uploadItems.length) {
        console.log("No files selected for upload.");
        return; 
      }
      for (const item of uploadItems) {
      const existingFileUrl = data[item.label]; 
      if (existingFileUrl) {
        await deleteFile(existingFileUrl); 
      }
      }
    uploadItems.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const fileRef = ref(storage,`videos/${fileName}`)
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
              return { ...prev, [item.label]: downloadURL };
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
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
      ]);
      console.log(img);
    };
  return (
    <>
         <Topbar/>
          <div className="container">
          <Sidebar/>
   <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>

          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={movie.title} defaultValue={movie.title} value={data.title || ''} onChange={(e) => setData({...data,title: e.target.value})}/>
            <label>Year</label>
            <input type="text" placeholder={movie.year} defaultValue={movie.year} value={data.year || ''} onChange={(e) => setData({...data,year: e.target.value})}/>
            <label>Genre</label>
            <input type="text" placeholder={movie.genre} defaultValue={movie.genre} value={data.genre || ''} onChange={(e) => setData({...data,genre: e.target.value})}/>

            <label>Trailer</label>
            <input type="file" placeholder={movie.trailer} name="trailer" onChange={(e) =>setTrailer(e.target.files[0])}/>
            <label>Video</label>
            <input type="file" placeholder={movie.video} name="video" onChange={(e) =>setVideo(e.target.files[0])}/>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={movie.img}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
              </label>
              <input type="file" id="file" name="img" style={{ display: "none" }} onChange={(e) =>setImg(e.target.files[0])}/>
                <button className="addProductButton" onClick={handleUpload}>
                  Upload
                </button>
            </div>
            <button className="productButton" onClick={handleChange}>Update</button>
          </div>
        </form>
      </div>
    </div>
          </div>
    </>
  );
}
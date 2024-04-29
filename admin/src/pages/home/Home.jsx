import Chart from "../../components/chart/Chart";
//import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
//import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
//import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState,useContext } from "react";
import axios from "axios";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCall";
import { BarChart,XAxis,YAxis,Tooltip,Legend,Bar } from 'recharts';

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/SIdebar";

export default function Home() {
  const { movies, dispatch } = useContext(MovieContext);

  const [movieList, setMovieList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);


  useEffect(() => {
  if (movies) {
    const getList = async () => {
      const newMovieList = movies.map((item) => item.title);
      setMovieList(newMovieList);

      const newLikeList = movies.map((item) => item.likes.length);
      setLikeList(newLikeList);
    };

    getList();
  }
}, [movies]);


  // const newMovieList = movies.map((item) => item.title);


  // const newLikeList = movies.map((item) => item.likes.length);

  const month= ["Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
  
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [userStats, setUserStats] = useState([]);
  const [likeStats, setLikeStats] = useState([]);


  useEffect(() => {
    const getLikeList = async () => {
      try {
        const res = await axios.get("/movies", {
          headers:{
                 token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
              }
        });
        res.data.map((item) =>
          setLikeStats((prev) => [
            ...prev,
            { name: item.title, "likes": item.likes.length },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getLikeList();
  }, []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("users/stats", {
          headers:{
                 token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
              }
        });
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "new user": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  const montharray = new Map(MONTHS.map((month, index) => [month, index]));
  userStats.sort((a,b) =>montharray.get(a.name)-montharray.get(b.name))
  console.log(montharray);
  console.log(userStats); 
  return (
    <>
    <Topbar/>
    <div className="container">
    <Sidebar/>
      <div className="home">
        {/*<FeaturedInfo />*/}
      <div className="chart">
        <h3>Likes Analytics</h3>
        <BarChart width={730} height={250} data={likeStats}>
          <XAxis dataKey="name" hide/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="likes" fill="#8884d8" />
      </BarChart>
        </div>
        <Chart data={userStats} title="User Analytics" grid dataKey="new user"/>
        <div className="homeWidgets">
          <WidgetSm/>
        </div>
      </div>
    </div>
    </>
  );
}

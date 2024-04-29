import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";
import NewUser from "./pages/newUser/NewUser";
import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
import NewProduct from "./pages/newproduct/NewProduct";
import Login from './pages/login/Login';
import List from './pages/List/List'
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import NewList from "./pages/newList/NewList";
import MovieList from "./pages/productList/ProductList";
import ListList from "./pages/listList/ListList";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={user ? <Home/> : <Navigate to='/login'/>}></Route>
        <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}></Route>
          {user && (
            <>
          <Route path="/users" element={<UserList />}></Route>
          <Route path="/users/:userId" element={<User />}></Route>
          <Route path="/newUser" element={<NewUser />}></Route>
          <Route path="/movies" element={<ProductList />}></Route>
          <Route path="/movies/:movieId" element={<Product />}></Route>
          <Route path="/newMovie" element={<NewProduct />}></Route>
          <Route path="/lists" element={<List />}></Route>
          <Route path="/lists/:id" element={<ListList />}></Route>
          <Route path="/newlist" element={<NewList />}></Route>
          <Route path="/movieList/:id" element={<MovieList />}></Route>
            </>
          )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

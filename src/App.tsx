import React from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import FafouriteItems from "./components/favouriteItems/FavouriteItems";
import ProductList from "./components/productList/ProductList";
import SingleProduct from "./components/singleProduct/SingleProduct";

const Page = () => {
  return (
    <div className="productListApp">
      <Header />
      <div className="productListApp__content">
        <FafouriteItems />
        <Outlet />
      </div>
    </div>
  );
};
function App() {
  return (
    <div className="productListApp">
      <Router>
        <Routes>
          <Route element={<Page />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<SingleProduct />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

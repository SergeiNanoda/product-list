import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import ProductList from "./components/productList/ProductList";
import SingleProduct from "./components/singleProduct/SingleProduct";
import { Main } from "./pages/Main";
import { useGlobalState } from "./state";

const App: React.FC<{}> = () => {
  const [favouriteProducts] = useGlobalState("favourites");
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favouriteProducts));
  }, [favouriteProducts]);
  return (
    <div className="productListApp">
      <Router>
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<SingleProduct />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

import React from 'react'
import {
  Outlet,
} from "react-router-dom";
import Header from "../components/header/Header";
import FafouriteItems from "../components/favouriteItems/FavouriteItems";


export const Main: React.FC<{}> = () => {
  return (
    <div className="productListApp">
      <Header />
      <div className="productListApp__content">
        <FafouriteItems />
        <Outlet />
      </div>
    </div>
  );
}
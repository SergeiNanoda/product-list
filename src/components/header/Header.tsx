import React, { useEffect, useMemo } from "react";
import "./header.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toggleFavouritesVisible } from "../../state";
import { useGlobalState } from "../../state";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [favouriteProducts] = useGlobalState("favourites");
  const isVisible = favouriteProducts.length ? "visible" : "hidden";

  const path = useMemo(() => {
    return location.pathname.replace(/(\/product\/)(\d+)/, "$1:id");
  }, [location]);
  const pageTitles: { [key: string]: string } = {
    "/": "PRODUCT LIST PAGE",
    "/product/:id": "PRODUCT PAGE",
  };

  return (
    <div className="header">
      <i
        onClick={() => {
          navigate("/");
        }}
        className="fa-solid fa-house"
        style={{ color: "#0a0a0a" }}
      ></i>
      <div className="favouriteItemsButton" onClick={toggleFavouritesVisible}>
        <span className={`favouriteCount ${isVisible}`}>
          {favouriteProducts.length}
        </span>
        <i className="fa-solid fa-heart" style={{ color: "#000000" }}></i>
      </div>
      <span className="header__title">{pageTitles[path]}</span>
    </div>
  );
}

export default Header;

import React from "react";
import { useGlobalState } from "../../state";
import "./favouriteItems.scss";
import SingleProduct from "../singleProduct/SingleProduct";
import ProductListItem from "../productListItem/ProductListItem";

function FafouriteItems() {
  const [favouriteProducts] = useGlobalState("favourites");
  const [isVisible] = useGlobalState("isFavouritesVisible");
  const displayOption = isVisible ? "visible" : "hidden";

  return (
    <div className={`favouriteItems ${displayOption}`}>
      <h1 className="favouriteItems__title">FAVORITES</h1>
      <div className="favouriteItems__list">
        {favouriteProducts.map((favouriteProduct) => (
          <ProductListItem product={favouriteProduct} variant="minimized" />
        ))}
      </div>
    </div>
  );
}

export default FafouriteItems;

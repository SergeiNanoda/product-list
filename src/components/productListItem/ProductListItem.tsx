import React, { MouseEvent } from "react";
import { IProduct } from "../productList/ProductList";
import { API_URL } from "../../utils/fetchRequest";

import "./productListitem.scss";
import { toggleFavourites, useGlobalState } from "../../state";
import { Link, useNavigate } from "react-router-dom";
import FullHeart from "../icons/FullHeart";
import EmptyHeart from "../icons/EmptyHeart";

type TVariant = "minimized" | "normal";

interface IProductListItemProps {
  product: IProduct;
  variant?: TVariant;
}

export default function ProductListItem({
  product,
  variant = "normal",
}: IProductListItemProps) {
  const { id, name, price, src } = product;
  const [favouriteProducts] = useGlobalState("favourites");

  const isFavourite = favouriteProducts.findIndex((p) => p.id === id) !== -1;

  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`product/${id}`);
      }}
      className={`productListItem-${variant}`}
    >
      <img src={API_URL + src} />
      {variant === "minimized" ? (
        <>
          <div className={`productListItem-${variant}__content`}>
            <h2 className={`productListItem-${variant}__title`}>{name}</h2>
            <div className={`productListItem-${variant}__footer`}>
              <span
                className={`productListItem-${variant}__price`}
              >{`$ ${price}`}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourites(product);
                }}
              >
                {isFavourite ? <FullHeart /> : <EmptyHeart />}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className={`productListItem-${variant}__title`}>{name}</h2>
          <div className={`productListItem-${variant}__footer`}>
            <span
              className={`productListItem-${variant}__price`}
            >{`$ ${price}`}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourites(product);
              }}
            >
              {isFavourite ? <FullHeart /> : <EmptyHeart />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

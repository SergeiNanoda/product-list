import React, { useEffect, useState } from "react";
import fetchRequest, { API_URL } from "../../utils/fetchRequest";
import { Link, useLocation } from "react-router-dom";
import { toggleFavourites, useGlobalState } from "../../state";
import { IProduct } from "../productList/ProductList";
import { useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import FullHeart from "../icons/FullHeart";
import EmptyHeart from "../icons/EmptyHeart";

import "./singleProduct.scss";

interface IProductListItemProps {
  product?: IProduct;
}

export function SingleProduct(props: IProductListItemProps) {
  const [product, setProduct] = useState<IProduct>();
  const [favouriteProducts] = useGlobalState("favourites");

  const { id } = useParams();
  const isFavourite =
    favouriteProducts.findIndex((p) => id && p.id === +id) !== -1;

  useEffect(() => {
    (async () => {
      const result: IProduct = await fetchRequest(`/image?id=${id}`);
      setProduct(result);
    })();
  }, []);

  return product ? (
    <div className="singleProduct">
      <div className="singleProduct__img">
        <ReactImageMagnify
          {...{
            smallImage: {
              width: 448,
              height: 448,
              isFluidWidth: false,
              src: API_URL + product.src,
            },
            largeImage: {
              src: API_URL + product.src,
              width: 1200,
              height: 1800,
            },
            isHintEnabled: true,
            shouldHideHintAfterFirstActivation: false,
          }}
        />
      </div>
      <div className="singleProduct__content">
        <div className="singleProduct__title">{product.name}</div>
        <div className="singleProduct__footer">
          <span className="singleProduct__price">{`$ ${product.price}`}</span>
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
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default SingleProduct;

import React, { useEffect, useState } from "react";
import fetchRequest from "../../utils/fetchRequest";
import ProductListItem from "../productListItem/ProductListItem";
import { GridChildComponentProps, FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./productList.scss";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  src: string;
}

function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const COLUMN_COUNT = 4;

  useEffect(() => {
    (async () => {
      const products: IProduct[] = await fetchRequest("/image");
      setProducts(products);
    })();
  }, []);

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
    isScrolling,
  }: GridChildComponentProps) => {
    const index = rowIndex * COLUMN_COUNT + columnIndex;

    if (index >= products.length) {
      return null;
    }

    return (
      <div style={style}>
        <ProductListItem product={products[index]} />
      </div>
    );
  };

  return (
    // <div style={{ paddingTop: "85px" }}>
    <AutoSizer className="productList">
      {({ height, width }) => {
        console.log({ width });
        const calcWidth = width - 611;
        return (
          <Grid
            columnCount={COLUMN_COUNT}
            columnWidth={Math.ceil(calcWidth / COLUMN_COUNT) - 25}
            height={height - 85}
            rowCount={Math.ceil(products.length / COLUMN_COUNT)}
            rowHeight={450}
            width={calcWidth}
          >
            {Cell}
          </Grid>
        );
      }}
    </AutoSizer>
    // </div>
  );
}

export default ProductList;

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
  const [displayWidth, setDisplayWidth] = useState(0);
  const column_count = (() => {
    if (displayWidth < 1300) return 1;
    return displayWidth < 1650 ? 2 : 4;
  })();

  const FIRST_ROW_PADDING = 85;

  useEffect(() => {
    (async () => {
      const products: IProduct[] = await fetchRequest("/image");
      setProducts(products);
    })();
  }, []);

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * column_count + columnIndex;

    if (index >= products.length) {
      return null;
    }

    const columnHeight = (() => {
      if (style.height) {
        return rowIndex === 0
          ? +style.height + FIRST_ROW_PADDING
          : style.height;
      }

      return 0;
    })();

    return (
      <div
        style={{
          ...style,
          marginTop: rowIndex === 0 ? `${FIRST_ROW_PADDING}px` : "",
          height: columnHeight,
          top: style.top && +style.top + FIRST_ROW_PADDING,
        }}
      >
        <ProductListItem product={products[index]} />
      </div>
    );
  };

  return (
    <AutoSizer className="productList">
      {({ height, width, ...rest }: { height: number; width: number }) => {
        const WIDTH_PADDING = 20;
        const ROW_HEIGHT = 450;
        const FAV_BLOCK_WIDTH = 606;
        const FAV_BLOCK_HEIGHT = 340;
        const calcWidth = width <= 970 ? width : width - FAV_BLOCK_WIDTH;
        // const calcHeight = width <= 970 ? height - FAV_BLOCK_HEIGHT : height;

        setDisplayWidth(width);

        return (
          <Grid
            columnCount={column_count}
            columnWidth={Math.ceil(calcWidth / column_count) - WIDTH_PADDING}
            height={height}
            rowCount={Math.ceil(products.length / column_count)}
            rowHeight={ROW_HEIGHT}
            width={calcWidth}
          >
            {Cell}
          </Grid>
        );
      }}
    </AutoSizer>
  );
}

export default ProductList;

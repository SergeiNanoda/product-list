import React, { useEffect, useState } from "react";
import fetchRequest from "../../utils/fetchRequest";
import ProductListItem from "../productListItem/ProductListItem";
import { GridChildComponentProps, FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { gridBreakpoints } from "../../constants/breakpoints";

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
    if (displayWidth <= gridBreakpoints.lg) return 1;
    if (displayWidth > gridBreakpoints.lg && displayWidth <= gridBreakpoints.xl)
      return 2;
    return displayWidth < gridBreakpoints.xxl ? 3 : 4;
  })();

  const FIRST_ROW_PADDING = 50;

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
      {({ height, width }: { height: number; width: number }) => {
        const WIDTH_PADDING = 20;
        const ROW_HEIGHT = 450;
        const FAV_BLOCK_WIDTH = 300;
        const FAV_BLOCK_MARGIN = 50 * 2;
        const calcWidth =
          width <= gridBreakpoints.md
            ? width
            : width - FAV_BLOCK_WIDTH - FAV_BLOCK_MARGIN;

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

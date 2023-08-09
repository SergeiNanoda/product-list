import { createGlobalState } from "react-hooks-global-state";
import { IProduct } from "./components/productList/ProductList";

const favouritesInitialState = localStorage.getItem("favourites")
  ? JSON.parse(localStorage.getItem("favourites") as string)
  : [];
const initialState = {
  favourites: favouritesInitialState as IProduct[],
  isFavouritesVisible: false,
};

export const { useGlobalState, setGlobalState } =
  createGlobalState(initialState);

export const toggleFavourites = (product: IProduct) => {
  setGlobalState("favourites", (state) => {
    const index = state.findIndex((p) => p.id === product.id); // Find index of product in array

    if (index !== -1) {
      // If product exists in array, remove it
      const updatedFavourites = [...state];
      updatedFavourites.splice(index, 1);
      return updatedFavourites;
    } else {
      // If product doesn't exist in array, add it
      return [...state, product];
    }
  });
};
export const toggleFavouritesVisible = () => {
  setGlobalState("isFavouritesVisible", (state) => {
    return !state;
  });
};

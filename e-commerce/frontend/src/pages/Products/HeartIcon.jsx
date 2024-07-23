/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const HeartIcon = ({ product, className }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      // remove the product from the localStorage as well
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      // add the product to localStorage as well
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className={twMerge(
        clsx("absolute right-2 top-2 cursor-pointer", className),
      )}
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <Heart className="fill-pink-500 text-black" />
      ) : (
        <Heart className="fill-white text-black" />
      )}
    </div>
  );
};

export default HeartIcon;

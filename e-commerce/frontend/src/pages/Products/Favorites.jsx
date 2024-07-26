import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[16rem] pt-10">
      <h1 className="ml-[3rem] text-lg font-bold">FAVORITE PRODUCTS : </h1>

      <div className="grid max-w-[95%] grid-cols-1 gap-2 py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;

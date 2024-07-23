import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute left-5 top-0">
      {favoriteCount > 0 && (
        <span className="rounded-full border border-black bg-pink-500 px-1 text-sm text-white">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;

import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="relative inline-block">
      {favoriteCount > 0 && (
        <span className="absolute -top-1 -right-2 px-1 py-0.5 text-xs text-white bg-pink-500 rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};
export default FavoritesCount;

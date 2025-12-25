import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  return (
    <div className="w-full bg-[#1A1A1A] rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-2 right-2 bg-pink-100 text-pink-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full rounded-t-md"
            src={p.image}
            alt={p.name}
            style={{ height: "150px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h5 className="text-base font-medium text-white truncate w-[60%]">
            {p?.name}
          </h5>
          <p className="text-sm font-semibold text-pink-500">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="text-sm text-[#CFCFCF] mt-1 mb-2">
          {p?.description?.substring(0, 55)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="px-2.5 py-1.5 text-sm font-medium text-white bg-pink-700 rounded hover:bg-pink-800 dark:bg-pink-600 dark:hover:bg-pink-700"
          >
            Read More
          </Link>

          <button
            className="p-1.5 rounded-full"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={22} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;

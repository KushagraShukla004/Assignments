/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success(`${product.name} added successfully`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="relative max-w-sm rounded-lg border border-gray-700 bg-gray-800 shadow-2xl">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 mr-2 rounded-full bg-fuchsia-800 px-2.5 py-0.5 text-sm font-medium text-slate-100">
            {p?.brand}
          </span>
          <img
            className="h-[170px] w-full cursor-pointer rounded-t-lg object-cover"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <h5 className="text-xl text-white">{p?.name}</h5>
          <p className="font-semibold text-fuchsia-500">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "IND",
            })}
          </p>
        </div>

        <p className="mb-3 line-clamp-1 font-normal text-[#CFCFCF]">
          {p?.description}
        </p>

        <div className="flex items-center justify-between">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center rounded-lg bg-fuchsia-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-fuchsia-700 focus:outline-none focus:ring-4 focus:ring-fuchsia-800"
          >
            Read More
            <svg
              className="ml-2 h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="rounded-full bg-gray-700 p-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
            onClick={() => addToCartHandler(p, 1)}
          >
            <ShoppingCart size={25} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

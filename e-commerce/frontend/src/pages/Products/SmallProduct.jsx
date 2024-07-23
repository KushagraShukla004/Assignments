/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="mb-4 ml-4 h-[15rem] rounded-2xl border border-gray-700 p-2">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-[10rem] w-full rounded-2xl object-cover p-1"
        />
      </div>
      <br />
      <div className="relative p-1">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex items-center justify-between">
            <div className="line-clamp-1 w-[12rem]">{product.name}</div>
            <span className="mr-6 rounded-full bg-pink-100 bg-gradient-to-r from-indigo-500 from-30% to-purple-500 to-90% px-2.5 py-0.5 text-xs font-medium">
              &#8377;{product.price}
            </span>
            <HeartIcon product={product} className="absolute right-0" />
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;

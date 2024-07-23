/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="relative m-3 rounded-2xl border border-gray-700 ring-2 ring-slate-700">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square h-[16rem] w-full rounded-2xl object-cover"
        />
      </div>

      <div className="p-2">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex items-center justify-between">
            <div className="line-clamp-1 w-[9.5rem] text-lg">
              {product.name}
            </div>
            <div className="relative mt-1">
              <span className="mr-7 rounded-full bg-gradient-to-r from-indigo-500 from-30% to-purple-500 to-90% px-2.5 py-0.5 text-sm font-medium text-white">
                &#8377; {product.price}
              </span>
              <HeartIcon product={product} className="absolute right-0 top-0" />
            </div>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { CircleChevronRight } from "lucide-react";

const Product = ({ product }) => {
  return (
    <div className="mx-1 rounded-2xl border border-gray-700 shadow-lg ring-2 ring-slate-700">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square h-[16rem] w-full rounded-2xl object-cover"
        />
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <h2 className="line-clamp-1 text-lg font-bold">{product.name}</h2>
        <div className="flex items-center justify-between pt-1">
          <span className="rounded-full bg-gradient-to-r from-indigo-500 from-30% to-purple-500 to-90% px-2.5 py-0.5 text-sm font-medium text-white">
            &#8377; {product.price}
          </span>
          <Link to={`/product/${product._id}`}>
            <button className="rounded-lg bg-gradient-to-r from-indigo-500 from-30% to-purple-500 to-90% px-2 py-2 text-white transition-colors hover:bg-purple-600/90 hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2">
              <CircleChevronRight size={25} strokeWidth={2} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;

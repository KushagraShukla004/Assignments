import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import { motion } from "framer-motion";

const AllProducts = () => {
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="container phone:mx-[9rem]">
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row"
        >
          <div className="p-3">
            <div className="ml-[2rem] h-12 text-xl font-bold">
              All Products ({products.length})
            </div>
            <div className="flex flex-wrap items-center justify-around">
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={gridItemVariants}
                  className="mb-4 block overflow-hidden"
                >
                  <div className="flex">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-[8rem] object-contain phone:size-[9rem]"
                    />
                    <div className="flex flex-col justify-around p-4">
                      <div className="flex justify-between">
                        <h5 className="mb-2 overflow-hidden truncate text-xl font-semibold max-lg:max-w-[77%]">
                          {product?.name}
                        </h5>
                        <p className="text-xs text-gray-400">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>
                      <p className="mb-4 line-clamp-1 overflow-hidden text-ellipsis text-sm text-gray-400 sm:w-[10rem] md:w-[20rem] lg:line-clamp-2 lg:w-[30rem] xl:w-[30rem]">
                        {product?.description}
                      </p>
                      <div className="flex justify-between">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-500 from-30% to-purple-500 to-90% px-3 py-2 text-sm text-white transition-colors hover:bg-purple-600/90 hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2"
                        >
                          Update Product
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
                        <p>&#8377;{product?.price}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-2 p-3 md:w-1/4">
            <AdminMenu />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AllProducts;

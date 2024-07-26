import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import Header from "../components/Header";
import Product from "./Products/Product";
import { motion } from "framer-motion";

const Home = () => {
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
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {/* {!keyword ? <Header /> : null} */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex w-full items-center justify-center">
            <div className="flex w-[80%] items-center justify-between">
              <h1 className="text-[3rem]">Special Products</h1>

              <Link
                to="/shop"
                className="h-fit rounded-full bg-gradient-to-r from-indigo-500 from-30% to-purple-500 to-90% px-10 py-2 font-bold"
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="flex min-h-screen justify-center">
            <motion.div
              variants={gridContainerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-2 py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {data.products.map((product) => (
                <motion.div variants={gridItemVariants} key={product._id}>
                  <Product product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;

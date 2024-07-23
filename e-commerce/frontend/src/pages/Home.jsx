/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="border max-lg:pl-[4rem] lg:pl-[20rem]">
            <div className="flex w-[80%] items-center justify-between border">
              <h1 className="mt-[10rem] text-[3rem]">Special Products</h1>

              <Link
                to="/shop"
                className="mt-[10rem] rounded-full bg-gradient-to-r from-indigo-500 from-30% to-purple-500 to-90% px-10 py-2 font-bold"
              >
                Shop
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-2 border md:grid-cols-3 lg:w-[80%] lg:grid-cols-4">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;

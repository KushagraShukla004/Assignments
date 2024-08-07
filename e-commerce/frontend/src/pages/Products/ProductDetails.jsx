import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Package, Clock, ShoppingCart, Star, Store } from "lucide-react";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    setAddedToCart(true);
    dispatch(addToCart({ ...product, qty }));
    toast.success(`${product.name} is added to cart`);
  };

  const handleProductChange = () => {
    setAddedToCart(false);
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="ml-[10rem] font-semibold text-white hover:underline"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="items-between relative ml-[10rem] mt-[2rem] flex flex-wrap">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="mr-[2rem] w-full sm:w-[30rem] md:w-[35rem] lg:w-[45rem] xl:w-[50rem]"
              />

              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col flex-wrap justify-between">
              <h2 className="mt-3 text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 text-[#B0B0B0] md:w-[35rem] lg:w-[40rem] xl:w-[45rem]">
                {product.description}
              </p>

              <p className="my-4 text-5xl font-extrabold">
                &#8377; {product.price}
              </p>

              <div className="flex w-[20rem] items-center justify-between">
                <div className="one">
                  <h1 className="mb-6 flex items-center">
                    <Store className="mr-2 text-white" /> Brand: {product.brand}
                  </h1>
                  <h1 className="mb-6 flex w-[20rem] items-center">
                    <Clock className="mr-2 text-white" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="mb-6 flex items-center">
                    <Star className="mr-2 text-white" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="mb-6 flex items-center">
                    <Star className="mr-2 text-white" /> Ratings: {rating}
                  </h1>
                  <h1 className="mb-6 flex items-center">
                    <ShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="mb-6 flex w-[10rem] items-center">
                    <Package className="mr-2 text-white" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap justify-between">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="w-[6rem] rounded-lg border-2 border-[#3e3e3e] p-2 transition hover:border-white"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                {addedToCart ? (
                  <Link to="/cart">
                    <button className="mt-5 rounded-lg bg-purple-500 px-4 py-2 text-white md:mt-2">
                      Go to Cart
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="mt-5 rounded-lg bg-purple-500 px-4 py-2 text-white md:mt-2"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>

            <div className="container ml-[10rem] mt-[5rem] flex flex-wrap items-start justify-between">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
                handleProductChange={handleProductChange}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;

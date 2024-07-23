import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Package, ShoppingCart, Star, Store } from "lucide-react";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 md:block lg:block xl:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="sm:block sm:w-[20rem] md:w-[45rem] xl:w-[45rem]"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              // createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="h-[20rem] w-full rounded-lg object-contain"
                />

                <div className="mt-4 flex justify-between">
                  <div className="one">
                    <h2>{name}</h2>
                    <br />
                    <p> &#8377; {price}</p> <br />
                    <p className="line-clamp-3 w-[22rem] overflow-hidden text-ellipsis sm:w-[20rem] xl:w-[25rem]">
                      {description}
                    </p>
                  </div>

                  <div className="flex w-full justify-between max-md:hidden">
                    <div className="one">
                      <h1 className="mb-6 flex items-center">
                        <Store className="mr-2 text-white" /> Brand: {brand}
                      </h1>
                      <h1 className="mb-6 flex items-center">
                        <Star className="mr-2 text-white" /> Reviews:&nbsp;
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="mb-6 flex items-center">
                        <Star className="mr-2 text-white" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="mb-6 flex items-center">
                        <ShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                        {quantity}
                      </h1>
                      <h1 className="mb-6 flex items-center">
                        <Package className="mr-2 text-white" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;

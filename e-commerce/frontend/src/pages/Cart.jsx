import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="wrap container mx-auto flex items-start justify-around pt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty{" "}
            <Link
              to="/shop"
              className="ml-3 h-fit rounded-full bg-gradient-to-r from-indigo-500 from-30% to-purple-500 to-90% p-3 font-bold ring-2 hover:ring-white"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex w-[80%] flex-col">
              <h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="items-enter mb-[1rem] flex border-b-2 pb-2"
                >
                  <div className="h-[5rem] w-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full rounded object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-1">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-purple-200"
                    >
                      {item.name}
                    </Link>

                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 font-bold text-white">
                      &#8377; {item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full rounded border p-1"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="mr-[5rem] text-pink-500"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <Trash2 className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="rounded-lg p-4">
                  <h2 className="mb-2 text-xl font-semibold">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold">
                    &#8377; &nbsp;
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className="mt-4 w-full rounded-full bg-purple-500 px-4 py-2 text-lg"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;

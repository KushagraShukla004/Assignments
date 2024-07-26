import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { motion } from "framer-motion";

const Shop = () => {
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

  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop,
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch, categoriesQuery.isLoading]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          },
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    dispatch,
    priceFilter,
    filteredProductsQuery.isLoading,
  ]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand,
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined),
      ),
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="mb-2 mt-2 bg-[#151515] p-3">
            <h2 className="h4 mb-2 rounded-full bg-black py-2 text-center">
              Filter by Categories
            </h2>

            <div className="w-[15rem] p-5">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="ietms-center mr-4 flex">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="h-4 w-4 rounded-sm border-gray-600 bg-gray-700 text-fuchsia-600 ring-offset-gray-800 focus:ring-2 focus:ring-fuchsia-400"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 mb-2 rounded-full bg-black py-2 text-center">
              Filter by Brands
            </h2>

            <div className="p-5">
              {uniqueBrands?.map((brand, i) => (
                <>
                  <div key={i} className="items-enter mb-5 mr-4 flex">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="h-4 w-4 border-gray-600 bg-gray-700 text-fuchsia-600 ring-offset-gray-800 focus:ring-2 focus:ring-fuchsia-400"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>

            <h2 className="h4 mb-2 rounded-full bg-black py-2 text-center">
              Filer by Price
            </h2>

            <div className="w-[15rem] p-5">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:border-pink-300 focus:outline-none"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="my-4 w-full border"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="h4 mb-2 text-center">{products?.length} Products</h2>
            <motion.div
              className="flex flex-wrap"
              variants={gridContainerVariants}
              initial="hidden"
              animate="show"
            >
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <motion.div
                    key={p._id}
                    variants={gridItemVariants}
                    className="p-3"
                  >
                    <ProductCard p={p} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

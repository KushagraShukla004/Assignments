import Loader from "../components/Loader";
import SmallProduct from "../pages/Products/SmallProduct";

import { useGetTopProductsQuery } from "../redux/api/productApiSlice";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="flex justify-around">
      <div className="hidden xl:block">
        <div className="grid grid-cols-2">
          {data.map((product) => {
            return (
              // Ensure to return the JSX
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;

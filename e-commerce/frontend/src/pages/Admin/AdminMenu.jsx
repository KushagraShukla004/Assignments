import { useState } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "right-4 top-4" : "right-7 top-5"
        } fixed rounded-lg bg-gray-800 p-2`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <X color="white" size={26} />
        ) : (
          <>
            <div className="my-1 h-0.5 w-6 bg-gray-200"></div>
            <div className="my-1 h-0.5 w-6 bg-gray-200"></div>
            <div className="my-1 h-0.5 w-6 bg-gray-200"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="fixed right-7 top-16 border-[1px] border-gray-800 bg-[#1e1e21] p-4 text-white shadow-[inset_0px_0px_1px_1px_#a855f7]">
          <ul className="mt-2 list-none">
            <li>
              <NavLink
                className="mb-5 block rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "#A78BFA" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mb-5 block rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "#A78BFA" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mb-5 block rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "#A78BFA" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mb-5 block rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/allproductsList"
                style={({ isActive }) => ({
                  color: isActive ? "#A78BFA" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mb-5 block rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "#A78BFA" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mb-5 block rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "#A78BFA" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;

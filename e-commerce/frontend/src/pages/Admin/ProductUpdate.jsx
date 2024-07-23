import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import AdminMenu from "./AdminMenu";
import { X } from "lucide-react";

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || "",
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const removeImageHandler = () => {
    setImage(null);
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?",
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
        const response = await uploadProductImage(formData).unwrap();
        formData.append("image", response.image);
      }
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success("Product successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setCategory(productData.category?._id || ""); // Make sure to set a default value if needed
      setQuantity(productData.quantity || "");
      setBrand(productData.brand || "");
      setImageUrl(productData.image || "");
      setStock(productData.countInStock || "");
    }
  }, [productData]);

  return (
    <div className="flex h-dvh w-dvw justify-center px-10 pb-10 pt-6 max-lg:pl-[4rem] lg:pl-[2rem]">
      <AdminMenu />
      <Card>
        <h1 className="mb-5 flex justify-center text-3xl font-semibold tracking-wider max-phone:text-2xl">
          Update/Delete Product
        </h1>
        <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block w-full cursor-pointer rounded-lg border border-dashed px-4 py-16 text-center font-bold text-white max-md:max-h-[100px] max-md:py-6">
            {image ? image.name : "Upload Image"}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : "w-full text-white"}
              ref={fileInputRef}
            />
          </label>

          {imageUrl && (
            <div className="relative flex justify-center max-phone:hidden">
              <img
                src={imageUrl}
                alt="Product"
                className="block max-h-[100px] w-full object-contain md:max-h-[200px]"
              />
              <button
                type="button"
                className="absolute right-0 top-0 mr-1 mt-1 text-red-500"
                onClick={removeImageHandler}
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="phone:p-5">
          <div className="flex flex-wrap justify-between pb-2">
            <div className="flex-grow basis-1/2 p-2">
              <label htmlFor="name">Name</label> <br />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border-2 border-[#3e3e3e] px-6 py-3 text-base text-white transition hover:border-white"
              />
            </div>
            <div className="flex-grow basis-1/2 p-2">
              <label htmlFor="price">Price</label> <br />
              <input
                type="number"
                className="mt-1 w-full rounded-lg border-2 border-[#3e3e3e] px-6 py-3 text-base text-white transition hover:border-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="flex-grow basis-1/2 p-2">
              <label htmlFor="quantity">Quantity</label> <br />
              <input
                type="number"
                className="mt-1 w-full rounded-lg border-2 border-[#3e3e3e] px-6 py-3 text-base text-white transition hover:border-white"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex-grow basis-1/2 p-2">
              <label htmlFor="brand">Brand</label> <br />
              <input
                type="text"
                className="mt-1 w-full rounded-lg border-2 border-[#3e3e3e] px-6 py-3 text-base text-white transition hover:border-white"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>
          <div className="px-2 pt-2">
            <label htmlFor="description" className="my-5">
              Description
            </label>
            <textarea
              id="description"
              className="mt-1 w-full rounded-lg border-2 border-[#3e3e3e] px-6 py-3 text-base text-white transition hover:border-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-wrap justify-between">
            <div className="flex-grow basis-1/2 p-2">
              <label htmlFor="stock">Count In Stock</label> <br />
              <input
                type="text"
                className="mt-1 w-full rounded-lg border-2 border-[#3e3e3e] px-6 py-3 text-base text-white transition hover:border-white"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="flex-grow space-y-1 p-2 phone:basis-1/2">
              <label htmlFor="category">Category</label>
              <select
                placeholder="Choose Category"
                className="mb-3 w-full rounded-lg border-2 border-[#3e3e3e] p-[13px] text-white"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-x-4 pt-4">
            <button
              onClick={handleSubmit}
              className="group h-12 w-[50%] cursor-pointer rounded-3xl border-2 border-[#9748FF] bg-white shadow-[inset_0px_-2px_0px_1px_#9748FF] transition duration-300 ease-in-out hover:bg-[#9748FF] phone:w-40"
            >
              <span className="font-medium text-[#333] group-hover:text-white">
                Update
              </span>
            </button>
            <button
              onClick={handleDelete}
              className="group h-12 w-[50%] cursor-pointer rounded-3xl border-2 border-[#9748FF] bg-white shadow-[inset_0px_-2px_0px_1px_#9748FF] transition duration-300 ease-in-out hover:bg-[#9748FF] phone:w-40"
            >
              <span className="font-medium text-[#333] group-hover:text-white">
                Delete
              </span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductUpdate;

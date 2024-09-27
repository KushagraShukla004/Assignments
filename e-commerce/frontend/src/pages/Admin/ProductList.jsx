import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import Card from "../../components/Card";
import AdminMenu from "./AdminMenu";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProductList = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imagePath = "";
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`); // Define a reference for the image
        await uploadBytes(storageRef, image); // Upload the image
        imagePath = await getDownloadURL(storageRef); // Get the download URL
      }

      const productData = {
        image: imagePath,
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
      };

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try Again.");
    }
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const removeImageHandler = () => {
    setImage(null);
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="flex h-dvh w-dvw justify-center px-10 pb-10 pt-6 max-lg:pl-[4rem] lg:pl-[2rem]">
      <AdminMenu />
      <Card>
        <h1 className="mb-5 flex justify-center text-3xl font-semibold tracking-wider max-phone:text-2xl">
          Create Product
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

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="group h-12 w-[50%] cursor-pointer rounded-3xl border-2 border-[#9748FF] bg-white shadow-[inset_0px_-2px_0px_1px_#9748FF] transition duration-300 ease-in-out hover:bg-[#9748FF] phone:w-40"
            >
              <span className="font-medium text-[#333] group-hover:text-white">
                Submit
              </span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductList;

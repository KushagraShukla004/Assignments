/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import Card from "../../components/Card";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState("");
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [localCategories, setLocalCategories] = useState([]);

  useEffect(() => {
    if (categories) {
      setLocalCategories(categories);
    }
  }, [categories]);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <div className="flex h-dvh w-dvw justify-center py-20 max-lg:pl-[4rem] lg:pl-[2rem]">
      {/* <AdminMenu/> */}
      <Card>
        <h1 className="mb-5 flex justify-center text-3xl font-semibold tracking-wider max-phone:text-2xl">
          Manage Categories
        </h1>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap gap-2">
          {localCategories.map((category) => (
            <div key={category._id} className="flex-shrink-0 py-2">
              <button
                className="relative min-w-min p-[3px]"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
                <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent">
                  {category.name}
                </div>
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </Card>
    </div>
  );
};

export default CategoryList;

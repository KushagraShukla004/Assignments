/* eslint-disable react/prop-types */
const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="w-full rounded-lg border-2 border-[#3e3e3e] px-4 py-3 text-base text-white transition hover:border-white"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600/90 hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="foucs:ring-red-500 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;

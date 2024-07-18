/* eslint-disable react/prop-types */
const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "succcess":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return <div className={`rounded p-4 ${getVariantClass()}`}>{children}</div>;
};

export default Message;

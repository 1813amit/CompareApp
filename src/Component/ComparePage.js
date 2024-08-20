import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ComparePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { compareList } = location.state || { compareList: [] };

  const handleAddMore = () => {
    navigate("/", { state: { compareList } });
  };

  const handleRemove = (productId) => {
    const updatedList = compareList.filter((p) => p.id !== productId);
    navigate("/compare", { state: { compareList: updatedList } });
  };

  const handleGoBack = () => {
    navigate("/"); 
  };

  return (
    <div
      className="bg-slate-800 py-10 min-h-screen grid place-items-center bg-cover bg-center"
      style={{
        backgroundImage: "url(https://example.com/your-background-image.jpg)",
      }}
    >
      <div className="w-full max-w-6xl px-4">
        <button
          onClick={handleAddMore}
          className="bg-gray-600 text-white py-2 px-4 rounded mb-4 hover:bg-gray-700 transition duration-300"
        >
          Go Back
        </button>
        {compareList.length > 0 && (
          <>
            <button
              onClick={handleAddMore}
              className="bg-blue-600 text-white py-2 px-4 rounded mb-4 hover:bg-blue-700 transition duration-300"
            >
              Add More
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {compareList.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded shadow-lg flex flex-col items-center"
                >
                  <img
                    src={product.thumbnail}
                    alt="Product"
                    className="w-32 h-32 object-cover bg-gray-200 rounded-full mb-2"
                  />
                  <h2 className="text-lg font-bold mb-2">
                    {product.brand || product.title}
                  </h2>
                  <p className="text-gray-700 mb-1">
                    Category: {product.category}
                  </p>
                  <p className="text-gray-700 mb-1">Price: ${product.price}</p>
                  <p className="text-gray-700 mb-2">
                    Discount: {product.discountPercentage}%
                  </p>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComparePage;

// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "../src/Component/ProductList";
import ComparePage from "../src/Component/ComparePage";
import Header from "./Nevigation/header";

const App = () => {
  const [compareProducts, setCompareProducts] = useState([]);

  const addToCompare = (product) => {
    if (!compareProducts.some((p) => p.id === product.id)) {
      setCompareProducts((prev) => [...prev, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<ProductList addToCompare={addToCompare} />} />
        <Route
          path="/compare"
          element={
            <ComparePage
              compareProducts={compareProducts}
              removeFromCompare={removeFromCompare}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;

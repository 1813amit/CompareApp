import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    background: {
      paper: "#1e293b",
      default: "#0f172a",
    },
    mode: "dark",
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          padding: "10px 4px",
        },
        body: {
          padding: "7px 15px",
          color: "#e2e8f0",
        },
      },
    },
  },
});

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { compareList = [] } = location.state || {};
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(compareList);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const processedData = data.products.map((product) => ({
          ...product,
          brand: product.brand || product.title,
        }));
        setProducts(processedData);
      });
  }, []);

  const handleSelect = (product) => {
    const alreadySelected = selectedProducts.some((p) => p.id === product.id);

    if (alreadySelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
      toast.info(`${product.brand} removed from comparison`, {
        position: "top-center",
      });
    } else if (selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, product]);
      toast.success(`${product.brand} added to comparison`, {
        position: "top-center",
      });
    } else {
      toast.error("You can only compare 4 products .", {
        position: "top-center",
      });
    }
  };

  const handleCompare = () => {
    navigate("/compare", { state: { compareList: selectedProducts } });
  };

  const columns = [
    { name: "id", options: { filter: false } },
    { name: "brand", label: "Brand" },
    {
      name: "thumbnail",
      label: "Profile",
      options: {
        customBodyRender: (value) => (
          <img
            src={value}
            alt="Product"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
            className="bg-white rounded-full"
          />
        ),
        filter: false,
      },
    },
    {
      name: "category",
      options: {
        customBodyRender: (value) => (
          <p
            className={`capitalize px-2 py-1 inline-block rounded-full text-sm ${
              value === "beauty" ? "bg-pink-500" : "bg-blue-500"
            }`}
          >
            {value}
          </p>
        ),
      },
    },
    { name: "price" },
    {
      name: "discountPercentage",
      label: "Discount%",
      options: { filter: false },
    },
    {
      name: "select",
      label: "Compare",
      options: {
        customBodyRender: (value, tableMeta) => {
          const product = products[tableMeta.rowIndex];
          const isSelected = selectedProducts.some((p) => p.id === product.id);
          return (
            <button
              onClick={() => handleSelect(product)}
              className={`py-1 px-2 rounded text-sm ${
                isSelected ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              {isSelected ? "Remove" : "Compare"}
            </button>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    responsive: "standard",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "60vh",
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-slate-700 py-5 min-h-screen flex flex-col items-center sm:py-10 ">
        <div className="w-full max-w-4xl px-4 sm:w-10/12">
          <MUIDataTable
            title={"Product List"}
            data={products}
            columns={columns}
            options={options}
          />
          <button
            onClick={handleCompare}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full sm:w-auto sm:mt-4"
            disabled={selectedProducts.length === 0}
          >
            Compare Selected Products
          </button>
        </div>
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
};

export default ProductList;

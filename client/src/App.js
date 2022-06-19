import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth.js";
import Home from "./components/Home/Home.js";
import CategorizedProducts from "./components/Product/CategorizedProducts.js";
import CreateProduct from "./components/Product/CreateProduct.js";
import Products from "./components/Product/Products.js";

function App() {
  return (
    <BrowserRouter>
      <Auth />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<CategorizedProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

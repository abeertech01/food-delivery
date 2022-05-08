import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CategorizedProducts from "./components/Products/CategorizedProducts";
import Products from "./components/Products/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<CategorizedProducts />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

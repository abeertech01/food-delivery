import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "@heroicons/react/outline/ArrowLeftIcon";

import { toastFn } from "../utils/Toast.js";
import { uploadProduct } from "../../redux/products.js";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.products.categories);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [prodImages, setProdImages] = useState([]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const uploadProductImages = (e) => {
    const files = Array.from(e.target.files);

    setProdImages([...files]);
  };

  const createProduct = () => {
    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("price", price);
    formData.set("quantity", quantity);

    prodImages.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(uploadProduct(formData));
    navigate("/");

    toastFn("Product Created 🎉!");
  };

  return (
    <Fragment>
      <div className="create-product relative w-screen h-screen flex justify-center items-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center bg-lime-500 hover:bg-lime-600 text-white px-3 py-1 rounded"
        >
          <ArrowLeft className="w-4 mr-1 font-semibold" /> <span>Back</span>
        </button>
        <div className="create-product__main min-w-[14rem]">
          <h1 className="font-semibold text-2xl mb-1">Create Product</h1>
          <hr className="mb-[2rem]" />
          <div className="prod-name w-full border mb-3">
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 w-full border-lime-500 outline-none p-2 text-lg"
            />
          </div>
          <div className="prod-description w-full mb-3">
            <textarea
              type="text"
              placeholder="Product Description"
              rows="3"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 w-full border-lime-500 outline-none p-2 text-lg"
            />
          </div>
          <div className="categories-price flex gap-3 mb-3">
            <div className="prod-quantity flex-1 border-2 border-lime-500 py-2">
              <h1 className="text-gray-400 px-3">Product Quantity</h1>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mx-3 border-b border-b-gray-300 outline-none"
              />
            </div>
            <div className="prod-price flex-1 border-2 border-lime-500 py-2">
              <h1 className="text-gray-400 px-3">Product Price</h1>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mx-3 border-b border-b-gray-300 outline-none"
              />
            </div>
          </div>

          <div className="prod-images mb-3 h-12 border-2 border-lime-500 flex items-center px-2">
            <input
              type="file"
              name="images"
              required
              onChange={uploadProductImages}
              multiple
              className="w-full"
            />
          </div>

          <div className="createBtn-quantity flex gap-3">
            <div className="prod-categories flex-1">
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border-2 border-lime-500 px-1 h-12 outline-none"
              >
                {categories &&
                  categories.map((c) => (
                    <option key={c} value={c}>
                      {capitalizeFirstLetter(c)}
                    </option>
                  ))}
              </select>
            </div>
            <button
              onClick={createProduct}
              className="create-btn flex-1 w-full h-12 uppercase font-semibold text-white bg-lime-500 hover:bg-lime-600 duration-200"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateProduct;

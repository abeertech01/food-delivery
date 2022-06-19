import React, { Fragment } from "react";

const Product = ({ product }) => {
  return (
    <Fragment>
      <div className="single-product box-border flex flex-col items-center">
        <div className="prod-img w-[15rem] h-[15rem] mb-3 border-2">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="prod-name text-xl font-semibold mb-1">{product.name}</h1>
        <h2 className="prod-price text-lg mb-1">৳{product.price}</h2>
        <button className="add2cart-btn uppercase bg-lime-500 py-1 px-4 rounded-full border-2 border-lime-500 hover:bg-white hover:text-lime-500 text-white font-semibold text-sm duration-150 ease-linear">
          Add to cart
        </button>
      </div>
    </Fragment>
  );
};

export default Product;

import React, { Fragment } from "react";

const Product = ({ product }) => {
  return (
    <Fragment>
      <div className="single-product box-border flex flex-col items-center">
        <div className="prod-img w-[15rem] h-[15rem] mb-3 border-2">
          {/* 
          For Image = http://localhost:4000/content/uploads/products/${product.images[1]
          ----------
          Now It's Demo
           */}
          <img
            src={process.env.PUBLIC_URL + "/images/demo-food.jpg"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-semibold mb-1">{product.name}</h1>
        <h2 className="text-lg mb-1">৳{product.price}</h2>
        <button className="uppercase bg-lime-500 py-1 px-4 rounded-full hover:border-2 hover:border-lime-500 hover:bg-white hover:text-lime-500 text-white font-semibold text-sm duration-150 ease-linear">
          Add to cart
        </button>
      </div>
    </Fragment>
  );
};

export default Product;

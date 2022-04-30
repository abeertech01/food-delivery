import React, { Fragment } from "react";

const Product = ({ product }) => {
  return (
    <Fragment>
      <p>ID: {product._id}</p>
      <p>Name: {product.name}</p>
      <p>Name: {product.description}</p>
      <p>Name: {product.price}</p>
      <p>Name: {product.createdAt}</p>
    </Fragment>
  );
};

export default Product;

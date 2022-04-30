import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import Product from "./Product";
import "./Products.scss";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);

  const productsResult = () => {
    console.log(products);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <h1>Abeer</h1>
      <button onClick={productsResult}>click</button>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;

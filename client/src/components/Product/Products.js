import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/products.js";
import Product from "./Product.js";
import Header from "../utils/Header/Header.js";
import "./Products.scss";
import Footer from "../utils/Footer/Footer.js";

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, products, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const pageNumFunc = () => {
    let pageNum;
    const division = productsCount / resultPerPage;

    if (!Number.isInteger(division)) {
      pageNum = Math.trunc(division) + 1;
    } else {
      pageNum = division;
    }

    return pageNum;
  };

  const findPage = async (no, text) => {
    const pageNum = pageNumFunc();

    if (text === "prev" && currentPage !== 1) {
      setCurrentPage((prev) => prev + no);
    }
    if (text === "next" && currentPage < pageNum) {
      setCurrentPage((prev) => prev + no);
    }
    if (text === "num") {
      setCurrentPage(no);
    }
  };

  const pages = () => {
    const arr = [];
    const pageNum = pageNumFunc();

    for (let i = pageNum; i >= 1; i--) {
      arr.unshift(i);
    }

    return arr;
  };

  useEffect(() => {
    dispatch(getProducts("", currentPage, ""));
  }, [dispatch, currentPage]);
  return (
    <Fragment>
      <Header />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          <div className="products pb-8">
            <div className="products__header py-16 mb-16">
              <h1 className="products__heading flex justify-center text-3xl font-semibold uppercase text-white">
                All Products
              </h1>
            </div>

            <div className="products__products container mx-auto flex justify-center items-center gap-[4rem] flex-wrap mb-16">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </div>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

export default Products;

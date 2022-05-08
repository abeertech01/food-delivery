import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../redux/actions/productActions";
import Product from "./Product";
import "./CategorizedProducts.scss";

const CategorizedProducts = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const { loading, products, allProducts, resultPerPage } = useSelector(
    (state) => state.product
  );

  const pageNumFunc = () => {
    const thisProductNum = allProducts.filter(
      (prod) => prod.category === params.category
    ).length;
    // ------------------
    let pageNum;
    const division = thisProductNum / resultPerPage;

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
    dispatch(getProducts("", currentPage, params.category));
  }, [dispatch, currentPage]);
  return (
    <Fragment>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <div className="c-products pb-8">
            <div className="c-products__header py-16 mb-16">
              <h1 className="c-products__heading flex justify-center text-3xl font-semibold uppercase text-white">
                {params.category}
              </h1>
            </div>

            <div className="c-products__products container mx-auto flex justify-center items-center gap-[4rem] flex-wrap mb-16">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
            <div className="c-products__pagination container mx-auto flex justify-center">
              <button
                onClick={() => findPage(-1, "prev")}
                className="px-2 font-bold border-2 border-lime-600 rounded"
              >
                Prev
              </button>

              {pages().map((num) => (
                <button
                  key={num}
                  onClick={() => findPage(num, "num")}
                  className={`mx-2 font-semibold ${
                    currentPage === num
                      ? "bg-lime-600 px-[0.4rem] text-white rounded"
                      : ""
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => findPage(1, "next")}
                className="px-2 font-bold border-2 border-lime-600 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CategorizedProducts;

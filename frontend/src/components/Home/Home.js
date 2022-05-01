import React, { Fragment } from "react";

const Home = () => {
  const categories = ["burger", "pizza", "dessert", "beverage"];
  return (
    <Fragment>
      <div className="home">
        {/* Slide images */}
        <div className="home__slide-images">
          <img
            src="/images/donuts.jpg"
            alt="image"
            className="w-full h-[28rem] object-cover"
          />
        </div>

        {/* Product Categories */}
        <div className="home__categories container mx-auto text-center my-[5rem]">
          <h1 className="uppercase text-3xl font-semibold mb-10">
            Product Category
          </h1>
          <div className="categories flex justify-center gap-[5rem]">
            {categories &&
              categories.map((cate, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <img
                    src={`/images/categories/${cate}.svg`}
                    alt={`${cate}`}
                    className="h-[8rem] w-[8rem] hover:scale-125 duration-200 mb-5"
                  />
                  <h1 className="name uppercase text-lg font-semibold">
                    {cate}
                  </h1>
                  <p className="text-gray-400">products</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

import React, { Fragment } from "react";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import "./Navbar.scss";

const Header = () => {
  return (
    <Fragment>
      <div className="nav-bar py-2">
        <div className="nav-bar__inside container mx-auto">
          <div className="nav-bar__logo w-32 ">
            <img
              src="/images/delivery-logo.svg"
              alt="logo"
              className="w-full "
            />
          </div>
          <div className="nav-bar__nav-search-cart grid grid-rows-2">
            <div className="nav-bar__nav-btns flex items-center justify-between">
              {/* Navigation buttons */}
              <ul className="flex gap-7 text-lg">
                <li className="hover:text-lime-500">
                  <a href="/" className="font-semibold">
                    Home
                  </a>
                </li>
                <li className="hover:text-lime-500">
                  <a href="/products" className="font-semibold">
                    Products
                  </a>
                </li>
                <li className="hover:text-lime-500">
                  <a href="#" className="font-semibold">
                    Contact Us
                  </a>
                </li>
                <li className="text-sm flex items-center text-white hover:text-lime-500 hover:bg-white hover:border-2 hover:border-lime-500 bg-lime-500 px-4 rounded-full">
                  <a href="#" className="font-semibold">
                    Download App
                  </a>
                </li>
              </ul>

              {/* Social Network buttons */}
              <ul className="flex gap-1">
                <li className="bg-lime-500">
                  <a
                    href="https://www.facebook.com/abeertech01/"
                    target="_blank"
                  >
                    <img
                      src="/images/facebook-logo.svg"
                      height={25}
                      width={25}
                      alt="social network"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com" target="_blank">
                    <img
                      src="/images/instagram-logo.svg"
                      height={25}
                      width={25}
                      alt="social network"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCtpkriCi3uO8iI4_NoBpRyw"
                    target="_blank"
                  >
                    <img
                      src="/images/youtube-logo.svg"
                      height={25}
                      width={25}
                      alt="social network"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/abeertech01/"
                    target="_blank"
                  >
                    <img
                      src="/images/linkedin-logo.svg"
                      height={25}
                      width={25}
                      alt="social network"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-bar__search-cart ">
              <div className="nav-bar__search-box border-2 border-lime-500  rounded-full h-12 px-4">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="mr-2 placeholder-lime-500 outline-none text-gray-500 text-lg"
                />
                <SearchIcon className="search-icon w-full text-gray-500" />
              </div>
              <div className="auth-btn flex justify-center w-32">
                <button className="uppercase">Login/Register</button>
              </div>
              <div className="cart-btn w-10 flex items-center justify-center relative">
                <div className="item-num w-5 h-5 text-xs text-white bg-lime-500 flex items-center justify-center rounded-full absolute left-3 -top-4">
                  30
                </div>
                <ShoppingCartIcon className="w-7 mr-2" />
                <div className="text-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;

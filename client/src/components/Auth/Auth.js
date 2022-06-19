import React, { Fragment, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthModal } from "../../redux/common";
import "./Auth.css";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const isAuthModal = useSelector((state) => state.common.isAuthModal);

  const closeAuthModal = () => {
    dispatch(toggleAuthModal());
  };
  const registerUser = () => {};
  const loginUser = () => {
    closeAuthModal();
  };
  return (
    <Fragment>
      {isAuthModal && (
        <Fragment>
          <div className="w-full h-full fixed top-0 bg-black/40 flex justify-center items-center">
            <div className="auth-card min-w-[30rem] min-h-[10rem] bg-white rounded drop-shadow-lg p-4 flex flex-col justify-center">
              <div className="top-line relative">
                <h1 className="text-2xl font-semibold mb-4">Authentication</h1>
                <button
                  onClick={closeAuthModal}
                  className="absolute right-0 top-0"
                >
                  <XIcon className="w-7" />
                </button>
              </div>

              {isLogin ? (
                <div className="login-form">
                  <div className="heading flex items-center mb-4">
                    <hr className="w-1/4" />
                    <h2 className="w-2/4 uppercase text-md font-semibold text-center mx-2">
                      Login with Email
                    </h2>
                    <hr className="w-1/4" />
                  </div>
                  <form className="mb-2" onSubmit={loginUser}>
                    <div className="loginEmail mb-3">
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full border-2 border-gray-300 p-2 rounded outline-none"
                      />
                    </div>
                    <div className="loginEmail mb-3">
                      <input
                        type="password"
                        placeholder="Enter Password"
                        required
                        className="w-full border-2 border-gray-300 p-2 rounded outline-none"
                      />
                    </div>
                    <input
                      type="submit"
                      value="Login"
                      className="bg-lime-500 hover:bg-lime-600 duration-200 cursor-pointer w-full p-2 rounded text-white font-semibold uppercase"
                    />
                  </form>
                </div>
              ) : (
                <div className="register-form">
                  <div className="heading flex items-center mb-4">
                    <hr className="w-1/4" />
                    <h2 className="w-2/4 uppercase text-md font-semibold text-center mx-2">
                      Register with Email
                    </h2>
                    <hr className="w-1/4" />
                  </div>
                  <form className="mb-2" onSubmit={registerUser}>
                    <div className="registerEmail mb-3">
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full border-2 border-gray-300 p-2 rounded outline-none"
                      />
                    </div>
                    <div className="registerEmail mb-3">
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full border-2 border-gray-300 p-2 rounded outline-none"
                      />
                    </div>
                    <input
                      type="submit"
                      value="Register"
                      className="bg-lime-500 hover:bg-lime-600 duration-200 cursor-pointer w-full p-2 rounded text-white font-semibold uppercase"
                    />
                  </form>
                </div>
              )}

              <div className="other-way flex justify-between">
                <button className="hover:text-lime-500 duration-200">
                  Forget password?
                </button>
                <button
                  onClick={() => setIsLogin((value) => !value)}
                  className="hover:text-lime-500 duration-200"
                >
                  {isLogin ? "Register" : "Login"} instead.
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Auth;

import { useState, useRef } from "react";
import iLineLogo from "../assets/iLine_logo-removebg-preview.png";
import { Link } from "react-router-dom";
import { signUp } from "../api/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { authFail, authSuccess, sendAuthReq } from "../actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  useSelector((state) => console.log(state.authReducer));
  const { loading } = useSelector(
    state => state.authReducer
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const confirmPassRed = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      confirmPassRed.current &&
      confirmPassRed.current.value === formData.password
    ) {
      dispatch(sendAuthReq());
      try {
        const { data } = await signUp(formData);
        dispatch(authSuccess(data));
      } catch (err) {
        toast.error(err.response?.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        dispatch(authFail(err.response?.data.error));
      }
    } else {
      toast.error("the passwords should match each other", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(authFail());
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex flex-col md:flex-row justify-around items-center h-screen gap-x-4 bg-slate-100 rounded-2xl shadow-lg">
        <div className=" w-2/5 h-auto min-w-[200px] bg-slate-400 rounded-md shadow-md">
          <img src={iLineLogo} className="p-2" />
        </div>
        <div className="bg-slate-400 rounded-lg p-6 shadow-md">
          <form className="flex flex-col gap-3">
            <h1 className="text-center text-2xl text-slate-800">Sign Up</h1>
            <p className="text-center text-slate-700 text-md">
              {" "}
              Have an account?{" "}
              <Link className=" underline" to="/login">
                Login
              </Link>
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  const updatedState = {
                    ...formData,
                    firstName: e.target.value,
                  };
                  setFormData(updatedState);
                }}
                className="w-1/2 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => {
                  const updatedState = {
                    ...formData,
                    lastName: e.target.value,
                  };
                  setFormData(updatedState);
                }}
                className="w-1/2 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="email"
              onChange={(e) => {
                const updatedState = {
                  ...formData,
                  email: e.target.value,
                };
                setFormData(updatedState);
              }}
              placeholder="Email"
              className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              onChange={(e) => {
                const updatedState = {
                  ...formData,
                  password: e.target.value,
                };
                setFormData(updatedState);
              }}
              placeholder="Password"
              className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              ref={confirmPassRed}
              placeholder="Confirm Password"
              className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md"
            >
              {loading ? "loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;

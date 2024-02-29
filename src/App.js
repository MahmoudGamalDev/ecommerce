import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Category from "./components/Category/Category";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Notfound from "./components/notfound/notfound";
import Cart from "./components/Cart/Cart";
import UserContextProvider from "./context/TokenContext";
import ProtedtedRoute from "./components/ProtedtedRoute/ProtedtedRoute";
import Details from "./components/Details/Details";
import CartContextProvider from "./context/cartContext";
import { ToastContainer } from "react-toastify";
import Checkout from "./components/checkout/checkout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtedtedRoute>
            <Home />
          </ProtedtedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtedtedRoute>
            <Home />
          </ProtedtedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtedtedRoute>
            <Products />
          </ProtedtedRoute>
        ),
      },
      {
        path: "category",
        element: (
          <ProtedtedRoute>
            <Category />
          </ProtedtedRoute>
        ),
      },

      {
        path: "checkout",
        element: (
          <ProtedtedRoute>
            <Checkout />
          </ProtedtedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtedtedRoute>
            <Brands />
          </ProtedtedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtedtedRoute>
            <Cart />
          </ProtedtedRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <ProtedtedRoute>
            <Details />
          </ProtedtedRoute>
        ),
      },
      { path: "signin", element: <Signin /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "signup", element: <Signup /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer theme="colored" />
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;

import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import { AuthProvider } from "./components/authentication";
// import LandingPage from "./pages/LandingPage";
// import UserAccessPage from "./pages/UserAccessPage";
// import Dashboard from "./pages/Dashboard/aws";
// import UserList from "./pages/UserList";
// import User from "./pages/User";
// import CreateUser from "./pages/CreateUser";
// import ProductList from "./pages/ProductList";
// import Product from "./pages/Product";
// import CreateProduct from "./pages/CreateProduct";
import Main from "./pages/Main";

const App = () => {
  let routes = useRoutes([
    // { path: "", element: <LandingPage /> },
    { path: "/home", element: <Main /> },
    { path: "/aws/billing/costAnalysis", element: <Main /> },
    { path: "/gcp/billing/costAnalysis", element: <Main /> },
    { path: "/azure/billing/costAnalysis", element: <Main /> },
    // { path: "/huawei/billing/costAnalysis", element: <Main /> },
    // { path: "/users", element: <UserList /> },
    // { path: "/user/create", element: <CreateUser /> },
    // { path: "/user/:userId", element: <User /> },
    // { path: "/dashboard", element: <Dashboard /> },
    // { path: "/user/access/:action", element: <UserAccessPage /> },
    // { path: "/products", element: <ProductList /> },
    // { path: "/product/create", element: <CreateProduct /> },
    // { path: "/product/:productId", element: <Product /> },
  ]);

  return routes;
};

const AppWrapper = () => {

  return (
    //   // <AuthProvider>
    <Router>
      <App />
    </Router>
    //   // </AuthProvider>
  );
};

export default AppWrapper;

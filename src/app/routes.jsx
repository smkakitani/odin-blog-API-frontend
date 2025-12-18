// Main
import App from "./App";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";




// Routes
const routes = [
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "sign-up", element: <SignUp /> },
      { path: "log-in", Component: LogIn },
      { path: "posts/:postId?", Component: Posts },
    ],
  },
];



export default routes;
// Main
import App from "./App";
// 
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
// 
import User from "../pages/User";
// 
import Author from "../pages/Author";




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
      { path: "user/:username", Component: User },
      { path: "author/:username/:createPost?/:editPostId?", Component: Author },
    ],
  },
];



export default routes;
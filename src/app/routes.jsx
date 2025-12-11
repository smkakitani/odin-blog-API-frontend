// Main
import App from "./App";
import { SignUp, LogIn } from "../pages/SignupLogin";
import Home from "../pages/Home";
import Posts from "../pages/Posts";




// Routes
const routes = [
  {
    path: "/",
    // element: <App />,
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "sign-up", element: <SignUp /> },
      { path: "log-in", Component: LogIn },
      { path: "posts", Component: Posts },
      // { path: "posts", Component: "" },
    ],
  },
  // {
  //   path: "auth",
  //   children: [
  //     { path: "sign-up", Component: SignUp },
  //     { path: "log-in", Component: LogIn },
  //   ],
  // }
];



export default routes;
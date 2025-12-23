// Styles

// Router
import { Link } from "react-router";
import { useAuth } from "../utils/AuthContext";



// 
function NavBar() {
  const { token, user } = useAuth();
  const menuList = [
    "home",
    "posts",
    "log-in",
    "sign-up",
  ];

  return (
    <nav>
      <menu>
        <li>
          <Link to="/">{menuList[0]}</Link>
        </li>
        <li>
          <Link to={menuList[1]}>{menuList[1]}</Link>
        </li>
        {/* Shows current user account if logged in */}
        {!token ? <li>
          <Link to={menuList[2]}>{menuList[2]}</Link>
        </li> : <li>
          <Link to={"user/" + user}>hi, {user}</Link>
        </li>}
        {/* Shows sign up if there's no user */}
        {!token && <li>
          <Link to={menuList[3]}>{menuList[3]}</Link>
        </li>}
      </menu>
    </nav>
  );
}

export default NavBar;
// Styles

// Router
import { NavLink } from "react-router";



// 
function NavBar() {
  const menuList = [
    "home",
    "posts",
    "log-in",
    "sign-up",
  ];

  return (
    <nav>
      <menu>
        {menuList.map((item) => (
          <li key={item}>
            <NavLink to={item === "home" ? "/" : item}>
            {item}
            </NavLink>
          </li>
        ))}
      </menu>
    </nav>
  );
}

export default NavBar;
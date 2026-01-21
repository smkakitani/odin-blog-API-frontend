// Styles
import styled from "styled-components";
// Router
import { Link } from "react-router";
import { useAuth } from "../utils/AuthContext";



// 
const NavStyle = styled.nav`
  width: stretch;

  margin-top: 10vh;

  background-color: #000000;
  border: 1px solid white;
`;
const UlStyle = styled.ul`
  display: flex;
  /* justify-content: space-evenly; */
  gap: 1rem;

  list-style: none;
  font-family: "Doto";
  font-size: 1.5rem;
  font-weight: bolder;

  text-decoration: none;

  li {
    padding: 0 0.5rem;

    text-shadow: #8a2be2 0px 0px 5px
    , blueviolet 0px 0px 7px
    , blueviolet 0px 0px 10px
    , #FF2D95 0px 0px 10px
    , #FF2D95 0px 0px 15px
    /* , #FF2D95 0px 0px 40px
    , #FF2D95 0px 0px 50px
    , #FF2D95 0px 0px 75px; */
  }
`;
const StyledLink = styled(Link)`
  color: blueviolet;

  &:hover {
    color: red;
  }
`;

function NavBar() {
  const { token, user } = useAuth();
  const menuList = [
    "home",
    "posts",
    "log-in",
    "sign-up",
  ];

  return (
    <NavStyle>
      <UlStyle>
        <li>
          <StyledLink to="/">{menuList[0]}</StyledLink>
        </li>
        |
        <li>
          <StyledLink to={menuList[1]}>{menuList[1]}</StyledLink>
        </li>
        |
        {/* Shows current user account if logged in */}
        {!token ? <li>
          <StyledLink to={menuList[2]}>{menuList[2]}</StyledLink>
        </li> : <li>
          <StyledLink to={user.type + "/" + user.username}>hi, {user.username}</StyledLink>
        </li>}|
        {/* Shows sign up if there's no user */}
        {!token && <li>
          <StyledLink to={menuList[3]}>{menuList[3]}</StyledLink>
        </li>}
      </UlStyle>
    </NavStyle>
  );
}

export default NavBar;
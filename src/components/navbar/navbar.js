import react from "react";
import { Nav, NavLink, NavMenu } 
    from "./navbarElements";
	
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
			<NavLink to="/posts" activeStyle>
				Blog
			</NavLink>
			<NavLink to="/users/create" activeStyle>
				Sign Up
			</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
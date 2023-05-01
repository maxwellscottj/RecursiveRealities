import react from "react";
import { Nav, NavLink, NavMenu } 
    from "./navbarElements";
import LoginForm from './pages/users/loginForm';
	
class Navbar extends react.Component {
	constructor(props) {
		super(props);
		this.state = {loggedIn:props.loggedIn, name:props.name}
	}

	render () {
	  return (
		<>
			<NavMenu>
				<NavLink to="/" activeStyle>
					News
				</NavLink>
				<NavLink to="/mail" activeStyle>
					Mail
				</NavLink>
				<NavLink to="/users" activeStyle>
					Users
				</NavLink>
				<LoginForm loggedIn={this.props.loggedIn} name={this.props.name}/>
			</NavMenu>
		</>
	  );
	}
};
  
export default Navbar;
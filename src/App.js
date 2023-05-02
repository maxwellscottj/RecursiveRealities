import react, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useSearchParams, Link} from 'react-router-dom';

import Home from './pages';	
import Navbar from './navbar';	
import LoginForm from './pages/users/loginForm';

import ListUsers from './pages/users/listUsers';
import UserDetails from './pages/users/userDetails';
import CreateUser from './pages/users/createUser';
import EditUser from './pages/users/editUser';
import RecoverForm from './pages/users/recoverForm';
import ResetPasswordForm from './pages/users/resetPasswordForm';

import ListPosts from './pages/posts/listPosts';
import PostDetails from './pages/posts/postDetails';
import CreatePost from './pages/posts/createPost';

import ListMail from './pages/mail/listMail';
import MailDetails from './pages/mail/mailDetails';
import CreateMail from './pages/mail/createMail';

class App extends Component {
	constructor() {
		super();
		this.state = { loggedIn:null, name:null};
	}
	
	componentDidMount(){
		this.getLogin();
    }
	
	getLogin(){
		const myreq = new Request(`${process.env.REACT_APP_NODE_URL}login`)
		fetch(myreq)
		.then(res => res.json())
		.then(data => this.setState({loggedIn:data.loggedIn, name:data.name}))
	}
	
	render() {
		console.log(this.state.loggedIn)
		return (
			<Router>
				<Navbar loggedIn={this.state.loggedIn} name={this.state.name}/>
					   <Routes>
							<Route exact path='/' exact element={< Home loggedIn={this.state.loggedIn} />} />
							<Route path='/users/' element={< ListUsers />} />
							<Route path='/users/details' element={< UserDetails />} />
							<Route path='/users/create' element={< CreateUser />} />
							<Route path='/users/recover' element={< RecoverForm />} />
							<Route path='/users/password' element={< ResetPasswordForm />} />
							<Route path='/posts/' element={< ListPosts loggedIn={this.state.loggedIn} />} />
							<Route path='/posts/details' element={< PostDetails loggedIn={this.state.loggedIn} />} />
							<Route path='/posts/create' element={< CreatePost />} />
							<Route path='/mail/' element={< ListMail />} />
							<Route path='/mail/details' element={< MailDetails loggedIn={this.state.loggedIn} />} />
							<Route path='/mail/create' element={< CreateMail />} />
					  </Routes>
			</Router>
		);
	}
}

export default App;

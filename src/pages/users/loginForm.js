import react from 'react';
import NameField from './nameField'
import PasswordField from './passwordField'
import CreateUser from './createUser'
import RecoverForm from './recoverForm'
import styled from "styled-components";

class BareLoginForm extends react.Component {
	constructor(props) {
		super(props);
		const queryParameters = new URLSearchParams(window.location.search)
		const userID = queryParameters.get("userID")?queryParameters.get("userID"):null;
		this.state = {loggedIn: props.loggedIn, name:props.name, mode:userID==='new'?'signUp':'picker'};

		
	}
	
	componentWillReceiveProps(props) {
		this.setState({ loggedIn: props.loggedIn, name: props.name })
	}

	
	loginMode = () => {
		this.setState({mode:'login'})
	}
	
	signUpMode = () => {
		this.setState({mode:'signUp'})
	}
	
	recoverMode = () => {
		this.setState({mode:'recover'})
	}
	
	pickerMode = () => {
		this.setState({mode:'picker'})
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);
		console.log(e.target.name)
		/*
		let data = [];
		data.append ("name", e.target.name.value);
		data.append ("password", e.target.password.value);
		*/
		const data = new FormData(e.target)
		console.log(data);
		
		fetch(`${process.env.REACT_APP_NODE_URL}login`, {
				method: "POST",
				body: data,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Request-Headers':'Content-Type' },
				credentials: 'include',
				mode: 'cors',
				}).then((response) => {
					  console.log(response);
					  return response.json(); // do something with response JSON
				});
	};
	

	render() {
		if (this.state.loggedIn) {
			return (
			<div className={this.props.className}>
				<p>Welcome {this.state.name}!</p>
				<form method="post" action={`${process.env.REACT_APP_NODE_URL}logout`}>
					<input type="submit" name="submit_button" value="Logout" />
				</form>
			</div>
			);
		} else {
			switch(this.state.mode) {
				case 'picker':
					return (
						<div className={this.props.className}>
							<button className='actionButton' href='#' onClick={this.loginMode}>Login</button>
							<button className='actionButton' onClick={this.signUpMode}>Sign Up</button>
						</div>
					)
					break;
				case 'recover':
					return (
						<div className={this.props.className}>
							<div className='menuContent'>
								<RecoverForm/>
								<a href='#' onClick={this.loginMode}>Back</a>
							</div>
						</div>
					);
					break;
				case 'login':
					return (
						<div className={this.props.className}>
							<div className='menuContent'>
								<form method="post" action={`${process.env.REACT_APP_NODE_URL}login`} onSubmit={this.handleSubmit}>
									<NameField name=""/>
									<PasswordField/>
									<input type="submit" name="submit_button" value="Login" />
								</form>
								<a href='#' onClick={this.pickerMode}>Cancel</a>
								<p><a href='#' onClick={this.recoverMode}>Forgot Password</a></p>
							</div>
						</div>
					);
					break;
				case 'signUp':
					return(
						<div className={this.props.className}>
							<div className='menuContent'>
								<CreateUser/>
								<a href='#' onClick={this.pickerMode}>Cancel</a>
							</div>
						</div>
					)
					break;
			}
		}
	}
}

const LoginForm = styled(BareLoginForm)`
width: 240px;
height: 100%;
background-color: white;
border: 1 px solid black;
vertical-align: top;
overflow: hidden;
justify-content: center;
text-align: center;
line-height: 1.5;

a {
	margin: 10px;
	text-align: center;
}

input{
	padding: 10px;
	margin: 10px;
	text-align: center;
}

.menuContent{
	width: 200px;
	padding: 20px;
	background-color: white;
	position:absolute;
	line-height: 2;
}

.actionButton{
margin: 40px 10px;
}
`

export default LoginForm;
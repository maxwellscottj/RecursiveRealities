import react from 'react';
import NameField from './nameField'
import EmailField from './emailField'
import PasswordField from './passwordField'
import {useSearchParams} from 'react-router-dom';

class EditUser extends react.Component {
	constructor() {
		super();
		this.state = {userID: null, name: null, role: null, email:null}
	}
	
	componentDidMount(){
		this.getUserDetails();
    }
	
	getUserDetails(){
		const queryParameters = new URLSearchParams(window.location.search)
		const userID = queryParameters.get("userID");
		const myreq = new Request("/users/edit/"+userID)
		fetch(myreq)
		.then(res => res.json())
		.then(data => this.setState({	userID:queryParameters.get("userID"),
										name:queryParameters.get("name")?queryParameters.get("name"):data.name,
										role:queryParameters.get("role")?queryParameters.get("role"):data.role,
										email:queryParameters.get("email")?queryParameters.get("email"):data.email,
										deletable:data.deletable
										}))
	}
	
	getState(){
		return this.state;
	}
	
	render () {
		console.log(this.state.name)
		return (
				<div>
					<form method="POST" action="/users/edit/">
						<NameField name={this.state.name}/>
						<PasswordField/>
						<EmailField email={this.state.email}/>
						<input type="submit" name="submit_button" value="Confirm" />
						<input type="hidden" name="userID" id="userID" value={this.state.userID}/>
					</form>
					<form method="POST" action="/users/delete/">
						<input type={this.state.deletable?"submit":"hidden"} name="submit_button" value="Delete" />
						<input type="hidden" name="userID" id="userID" value={this.state.userID}/>
					</form>
				</div>
		);
	}
};
  
export default EditUser;
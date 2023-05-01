import react from 'react';
import NewPasswordField from './newPasswordField'

class ResetPasswordForm extends react.Component {
	constructor() {
		super();
		this.state = { userID: null, token: null };
	}
  
	componentDidMount(){
		this.getDetails();
	}
	
	getDetails(){
		const queryParameters = new URLSearchParams(window.location.search)
		const accessToken = queryParameters.get("token")
		const myreq = new Request("/users/password/"+accessToken)
		fetch(myreq)
			.then(res => res.json())
			.then(data => this.setState({ userID: data.userID, token: data.token}))
		
	}

	render() {
		return (
		<div>
			<form method="post" action={"/users/password/"+this.state.token}>
				<input type="hidden" name="userID" value={this.state.userID}/>
				Enter your new password:
				<NewPasswordField/>
				<input type="submit" name="submit_button" value="Submit" />
			</form>
		</div>
		);
	}
}

export default ResetPasswordForm;
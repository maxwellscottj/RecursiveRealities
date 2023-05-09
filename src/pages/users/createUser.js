import react from 'react';
import {useSearchParams} from 'react-router-dom';

import NameField from './nameField'
import EmailField from './emailField'
import PasswordField from './passwordField'

const CreateUser = () => {
	const [errs, setErr] = react.useState(null);	
	const queryParameters = new URLSearchParams(window.location.search)
	const name = queryParameters.get("name")?queryParameters.get("name"):"Choose a Username";
	const email = queryParameters.get("email");
	const userID = queryParameters.get("userID")?queryParameters.get("userID"):null;
	var errors = JSON.parse(queryParameters.get("errors"))
	var errorList = [];
		if (errors){
			errors.map(item => {
				errorList.push(<p>{item.msg}</p>)
				return {}
			});
	}

	return (
	<div>
		<form method="POST" action={`${process.env.REACT_APP_NODE_URL}users/create`}>
			<NameField name={name}/>
			<PasswordField/>
			<EmailField email={email}/>
			<input type="submit" name="submit_button" value="Sign Up" />
		</form>
		<div>
			{errorList.length&&userID==='new'?errorList:''}
		</div>
	</div>
  );
};
  
export default CreateUser;
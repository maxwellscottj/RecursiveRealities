import react from 'react';
import EmailField from './emailField'

class RecoverForm extends react.Component {
	constructor(props) {
		super(props);
	}

  
	componentDidMount(){
	}

	render() {
			return (
			<div className={this.props.className}>
				<form method="post" action={`${process.env.REACT_APP_NODE_URL}users/recover`}>
					<p>A password reset link will be sent to your email.</p>
					<EmailField/>
					<input type="submit" name="submit_button" value="Send" />
				</form>
			</div>
			);
	}
}

export default RecoverForm;
import react from 'react';

class PasswordField extends react.Component {
  constructor(props) {
    super(props);
    this.state = {value: !props.password?'':props.password};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {this.setState({value: event.target.value});}

  render() {
    return (
		<div>
			<label>
				Password
				<input type="password" name="newPass" id="newPass" value={this.state.value} onChange={this.handleChange} />
			</label>
		</div>
    );
  }
}

export default PasswordField;
import react from 'react';

class EmailField extends react.Component {
  constructor(props) {
    super(props);
	
    this.state = {value: !props.email?'Enter your email':props.email};
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps(props) {
    this.setState({ value: props.email })
  }

  handleChange(event) {this.setState({value: event.target.value});}

  render() {
    return (
		<div>
			<label>
				Email Address
				<input type="text" name="email" id="email" value={this.state.value} onChange={this.handleChange} />
			</label>
		</div>
    );
  }
}

export default EmailField;
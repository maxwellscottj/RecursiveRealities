import react from 'react';
import {useSearchParams} from 'react-router-dom';

class NameField extends react.Component {
  constructor(props) {
    super(props);
    this.state = {value: !props.name?'':props.name};
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps(props) {
    this.setState({ value: props.name })
  }

  handleChange(event) {this.setState({value: event.target.value});}

  render() {
    return (
		<div>
			<label>
				Username
				<input type="text" name="name" id="name" value={this.state.value} onChange={this.handleChange} />
			</label>
		</div>
    );
  }
}

export default NameField;
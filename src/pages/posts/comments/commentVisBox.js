import react from 'react';

class CommentVisBox extends react.Component {
  constructor(props) {
    super(props);
	
    this.state = {value: props.value};
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps(props) {
    this.setState({ value: props.value })
  }

  handleChange(event) {this.setState({value: event.target.value});}

  render() {
	  console.log(this.state.value)
    return (
		<div>
			<label>
				Visible
				<input type="checkbox" name="visible" id="visible" defaultChecked={this.state.value} onChange={this.handleChange} />
			</label>
		</div>
    );
  }
}

export default CommentVisBox;
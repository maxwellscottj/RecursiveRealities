import react from 'react';
import styled from 'styled-components';

class BareCommentTextField extends react.Component {
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
    return (
		<div className={this.props.className}>
			<label>Comment text</label>
			<textarea name="commentText" id="commentText" value={this.state.value} onChange={this.handleChange} />
		</div>
    );
  }
}

const CommentTextField  = styled(BareCommentTextField)`
width: 100%;

textarea {
	width:100%;
}
`

export default CommentTextField;
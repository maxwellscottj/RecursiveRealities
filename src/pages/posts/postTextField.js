import react from 'react';
import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components'

class BarePostTextField extends react.Component {
  constructor(props) {
    super(props);
    this.state = {value: !props.postText?'':props.postText};
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps(props) {
    this.setState({ value: props.postText })
  }

  handleChange(event) {this.setState({value: event.target.value});}

  render() {
    return (
		<div className={this.props.className}>
			<label>
				Post Text Content
				<textarea name="postText" id="postText" value={this.state.value} onChange={this.handleChange} />
			</label>
		</div>
    );
  }
}

const PostTextField = styled(BarePostTextField)`
width:100%-50px;;
margin: 20px 0px;
margin-right: 50px;

textarea {
	width:100%;
	height:200px;
	padding:20px;
	margin-top:10px;
}

`

export default PostTextField;
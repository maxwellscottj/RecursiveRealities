import react from 'react';
import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components';

class BareMailTextField extends react.Component {
  constructor(props) {
    super(props);
    this.state = {value: !props.mailText?'':props.mailText};
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps(props) {
    this.setState({ value: props.mailText })
  }

  handleChange(event) {this.setState({value: event.target.value});}

  render() {
    return (
		<div className={this.props.className}>
			<label>
				Body Text Content
				<textarea name="mailText" id="mailText" value={this.state.value} onChange={this.handleChange} />
			</label>
		</div>
    );
  }
}

const MailTextField = styled(BareMailTextField)`
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

export default MailTextField;
import react from 'react';
import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components';

class BareSubjectField extends react.Component {
  constructor(props) {
    super(props);
    this.state = {value: !props.subject?'':props.subject};
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps(props) {
    this.setState({ value: props.subject })
  }

  handleChange(event) {this.setState({value: event.target.value});}

  render() {
    return (
		<div className={this.props.className}>
			<label>Subject</label>
			<input type="text" name="subject" id="subject" value={this.state.value} onChange={this.handleChange} />
		</div>
    );
  }
}

const SubjectField = styled(BareSubjectField)`
width:100%-50px;
margin: 20px 0px;
margin-right: 50px;

input {
	width:100%;
	padding:20px;
	font-weight:bold;
	font-size: 18pt;
	margin-top: 10px;
}
`
export default SubjectField;
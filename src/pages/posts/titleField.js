import react from 'react';
import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components'

class BareTitleField extends react.Component {
  constructor(props) {
    super(props);
    this.state = {value: !props.title?'':props.title};
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps(props) {
    this.setState({ value: props.title })
  }

  handleChange(event) {this.setState({value: event.target.value});}

  render() {
    return (
		<div className={this.props.className}>
			<label>Title</label>
			<input type="text" name="title" id="title" value={this.state.value} onChange={this.handleChange} />
		</div>
    );
  }
}

const TitleField = styled(BareTitleField)`
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

export default TitleField;
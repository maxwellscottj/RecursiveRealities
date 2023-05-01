import react from 'react';
import {useSearchParams} from 'react-router-dom';
import SubjectField from './subjectField'
import MailTextField from './mailTextField'
import styled from 'styled-components'

const BareCreateMail = ({className}) => {
	
	
	const queryParameters = new URLSearchParams(window.location.search)
	const subject = queryParameters.get("subject")?queryParameters.get("subject"):"Subject line here...";
	const mailText = queryParameters.get("mailText")?queryParameters.get("mailText"):"Body text here...";
	const mailID = queryParameters.get("mailID")?queryParameters.get("mailID"):null;
	
	var errors = JSON.parse(queryParameters.get("errors"))
	var errorList = [];
	if (errors){
		errors.map(item => {
			errorList.push(<p>{item.msg}</p>)
			return {}
		});
	}
	
	const [err, setErr] = react.useState(null);
	const [mode, setMode] = react.useState(errorList.length&&mailID==='new'?'visible':'hidden')

	const modeToggle = () => {
    setMode(mode==='visible'?'hidden':'visible');
	};
	
	if (mode==='visible') {
		return (
			<div className={className}>
				<div className='content'>
					<h2>New Mail <a href='#' onClick={modeToggle}>-</a></h2>
					<form method="POST" action="/mail/create">
						<SubjectField subject={subject}/>
						<MailTextField mailText={mailText}/>
						<input type="submit" name="submit_button" value="Save Draft" />
					</form>
					<div>
						{errorList.length&&mailID==='new'?errorList:''}
					</div>
				</div>
			</div>
		);
	} else if (mode==='hidden') {
		return(<div className={className}>
					<div className='button' onClick={modeToggle}>
						<h2><a href='#'>New Mail +</a></h2>
					</div>
				</div>);
	}
};

const CreateMail = styled(BareCreateMail)`
line-height:1.5;
margin: 20px 50px;

.button {
	padding:20px;
	width: 200px;
	background-color: darkgrey;
	border: 2px solid grey;
	border-radius: 4px;
}

.button:hover {
	border: 2px solid aliceblue;
}

.button:hover a, .button a:visited {
	color:aliceblue;
}

.content{
	padding:20px;
	width:100%-50px;
	background-color: grey;
	border: 2px solid aliceblue;
	border-radius: 4px;
}

`

export default CreateMail;
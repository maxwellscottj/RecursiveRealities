import react, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import SubjectField from './subjectField'
import MailTextField from './mailTextField'
import styled from "styled-components";

class BarePostDetails extends react.Component {
	constructor(props) {
		super(props);
		this.state = {loggedIn: false, mailID: props.mailID, subject: null, mailText: null,  createDate: null, editDate: null, editable: null, deletable: null, sent:null, mode:'hidden', errors: []}
	}

	componentDidMount(){
		this.getMailDetails();
    }
	
	componentWillReceiveProps(props) {
		this.setState({ loggedIn: props.loggedIn})
	}
	
	getMailDetails() {
		const queryParameters = new URLSearchParams(window.location.search)
		const mailID = this.state.mailID
		const errors = JSON.parse(queryParameters.get("errors"))
		const myreq = new Request("/mail/details/"+mailID)
		fetch(myreq)
		.then(res => res.json())
		.then(data => this.setState({ 	mailID:data._id,
										subject:data.subject,
										mailText:queryParameters.get("mailText")?queryParameters.get("mailText"):data.mailText,
										createDate:data.createDate,
										editDate:data.editDate,
										editable:data.editable,
										deleteable:data.deleteable,
										sent:data.sent,
										errors:errors,
										mode:queryParameters.get("mailID")===this.props.mailID&&errors?'edit':queryParameters.get("mailID")===this.props.mailID&&!data.sent?'edit':queryParameters.get("mailID")===this.props.mailID?'display':this.state.mode
		}))
	}
	
	modeToggle = () => {
		if(this.state.mode==='hidden') {
			this.setState((state, props) => ({mode:!this.state.sent?'edit':'display'}))
		} else {
			this.setState((state, props) => ({mode:'hidden'}))
		}
	}
	
	deleteButton () {
		return (<form method="POST" action="/mail/delete">
			<input type="hidden" name="mailID" id="mailID" value={this.state.mailID}/>
			<input type="submit" name="submit_button" value="Delete" />
			</form>)
	}
	
	sendButton () {
		return (<form method="POST" action="/mail/send">
			<input type="hidden" name="mailID" id="mailID" value={this.state.mailID}/>
			<input type="submit" name="submit_button" value="Send" />
			</form>)
	}

	render () {
		var errorList = [];
		if (this.state.errors){
			this.state.errors.map(item => {
				errorList.push(item.msg)
				return {}
			});
		}
		
		const queryParameters = new URLSearchParams(window.location.search)
		const mailID = queryParameters.get("mailID")
		
		if (this.state.mode==='edit') {
			return (
				<div className={this.props.className}>
					<form method="POST" action="/mail/edit">
						<SubjectField subject={this.state.subject}/>
						<MailTextField mailText={this.state.mailText}/>
						<p>First draft date: {this.state.createDate}</p>
						<p>Currently editing...</p>
						<input type="hidden" name="mailID" id="mailID" value={this.state.mailID}/>
						<input type="submit" name="submit_button" value="Save Draft" />
						{this.sendButton()}
						{this.state.deleteable?this.deleteButton():""}
					</form>
					{errorList.length&&mailID===this.props.mailID?errorList:''}
				</div>
			);
		} else if (this.state.mode==='display') {
			return (
				<div className={this.props.className}>
					<h2>{this.state.subject}<a href='#' onClick={this.modeToggle}>-</a></h2>
					<p>{this.state.mailText}</p>
					<p>First draft date: {this.state.createDate}</p>
					<p>{this.state.sent?'Sent':'Last edited:'} {this.state.editDate}</p>
				</div>
			)
			} else if (this.state.mode==='hidden') {
			return (
				<div className={this.props.className}>
					<h2><a href='#' onClick={this.modeToggle}>{this.state.subject}</a></h2>
					<p>{this.state.sent?'Sent':'Last edited:'} {this.state.editDate}</p>
				</div>
			)
			;
		}
	}
};

const PostDetails = styled(BarePostDetails)`
margin: 20px 50px;
padding: 20px;
background-color:darkgrey;
border: 2px solid grey;
border-radius: 4px;
`

export default PostDetails;

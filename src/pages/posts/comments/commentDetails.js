import react from 'react';
import {useSearchParams} from 'react-router-dom';
import CommentTextField from './commentTextField'
import CommentVisBox from './commentVisBox'
import styled from "styled-components";

class BareCommentDetails extends react.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentID: props.commentID,
			parentPost: props.parentPost,
			authorData: props.authorData?props.authorData:'Deleted user',
			commentText: props.commentText,
			editDate: props.editDate,
			visEditable: props.visEditable,
			visible: props.visible,
			mode: 'display',
			errors: []
		};
	}

	componentWillReceiveProps(props) {
		this.setState({ 
			commentID: props.commentID,
			parentPost: props.parentPost,
			authorData: props.authorData?props.authorData:'Deleted user',
			commentText: props.commentText,
			visEditable: props.visEditable,
			visible: props.visible,
			})
	}
	
	componentDidMount(){
		this.getCommentDetails();
    }
	
	getCommentDetails(){
		const queryParameters = new URLSearchParams(window.location.search)
		const errors = JSON.parse(queryParameters.get("errors"))
		this.setState({mode:queryParameters.get("commentID")===this.props.commentID?'edit':this.state.mode, errors:errors})
	}
	
	modeToggle = () => {
		this.state.mode==='display'?this.setState((state, props) => ({mode:'edit'})):this.setState((state, props) => ({mode:'display'}));
	}
	
	deleteButton = () => { 
		if (this.props.deleteable) {
			return (
				<form method="POST" action="/comments/delete">
						<input type="hidden" name="commentID" id="commentID" value={this.props.commentID}/>
						<input type="submit" name="submit_button" value="Delete" />
				</form>
			)
		}
	}
	
	render() {
		
		var errorList = [];
		const queryParameters = new URLSearchParams(window.location.search)
		if (this.state.errors&&queryParameters.get("commentID")===this.state.commentID){
			this.state.errors.map(item => {
				errorList.push(<li>{item.msg}</li>)
				return {}
			});
		}
		
		if (this.state.mode==='display') {
			return (
				<div className={this.props.className}>
					<p>{this.state.authorData.name}</p>
					<p>{this.state.commentText}</p>
					<p>{this.state.editDate}</p>
					{this.props.editable?<a href='#' onClick={this.modeToggle}>Edit</a>:""}
				</div>
			);
		} else if (this.state.mode==='edit') {
			return (
				<div className={this.props.className}>
					<form method="POST" action="/comments/edit">
						<CommentTextField value={this.state.commentText}/>
						{this.state.visEditable?<CommentVisBox value={this.state.visible?"on":""}/>:<input type="checkbox" readOnly hidden name="visible" id="visible" defaultChecked={this.state.visible?"on":""}/>}
						<input type="hidden" name="commentID" id="commentID" value={this.props.commentID}/>
						<input type="hidden" name="parentPost" id="parentPost" value={this.props.parentPost}/>
						<input type="submit" name="submit_button" value="Edit"/>
					</form>
					{this.deleteButton()}
					<ul>
						{errorList}
					</ul>
				</div>
			);
		}
	}
}

const CommentDetails = styled(BareCommentDetails)`
background-color:grey;
color:white;
width: 100%-50px;
padding: 10px;
margin: 20px;
border: 2px solid lightgrey;
border-radius: 4px;
`

export default CommentDetails;
import react from 'react';
import CommentDetails from './commentDetails';
import styled from "styled-components";

class BareListComments extends react.Component {
	constructor(props) {
		super(props);
		this.state = {loggedIn:props.loggedIn, postID:props.postID, comments: [], commentsLoaded:false, mode:'hidden'}
	}
	
	componentDidMount(){
		this.getComments();
    }
	
	componentWillReceiveProps(props) {
		this.setState({ loggedIn: props.loggedIn})
	}
	
	modeToggle = () => {
		this.state.mode==='display'?this.setState((state, props) => ({mode:'hidden'})):this.setState((state, props) => ({mode:'display'}));
	}
	
	getComments() {
		const queryParameters = new URLSearchParams(window.location.search)
		const myreq = new Request(`${process.env.REACT_APP_NODE_URL}comments/`+this.props.postID)
		fetch(myreq)
		.then(res => res.json())
		.then(data => this.setState({comments:data, commentsLoaded:true, mode:queryParameters.get("postID")===this.props.postID&&queryParameters.get("commentID")?'display':this.state.mode}))
	}
	
	commentForm(){
		//if (this.state.loggedIn) {
			return (<form className='newCommentForm' method="POST" action="/comments/create">
					<input type="hidden" name="parentPost" id="parentPost" readOnly value={this.props.postID}/>
					<label>New Comment</label>
					<textarea name="commentText" id="commentText" />
					<input type="checkbox" checked readOnly hidden name="visible" id="visible" value="on"/>
					<input type="submit" name="submit_button" value="Submit" />
					</form>)
		//}
	}

	render () {
		var commentList = [];
		this.state.comments.map(item => {
				commentList.push( <CommentDetails key={item._id} commentID={item._id} parentPost={item.parentPost} commentText={item.commentText} authorData={item.authorData} editDate={item.editDate} editable={item.editable} deleteable={item.deleteable} visible={item.visible} visEditable={item.visEditable}/>);
        });
		
		if (this.state.mode === 'display') {
			return (
				<div className={this.props.className}>
					<a href='#' className='toggle' onClick={this.modeToggle} >Hide Comments</a>
					{this.state.loggedIn?this.commentForm():""}
					{!this.state.commentsLoaded?'Loading...':commentList.length?commentList:'No comments'}
				</div>
			);
		} else if (this.state.mode === 'hidden') {
			return (
				<div className={this.props.className}>
					<a href='#' className='toggle' onClick={this.modeToggle}>Show Comments</a>
				</div>
			);
		}
	}
};

const ListComments = styled(BareListComments)`
	background-color:darkgrey;
	padding:20px;
	
	.toggle{
		display:flex;
		justify-content:center;
		align-items:center;
		margin: 50px;
	}
	
	.newCommentForm{
		margin: 20px;
		padding: 20px;
		border: 2px solid lightgrey;
		border-radius: 4px;
		background: grey;
		color: white;
	}
	
	.newCommentForm textarea {
		width: 100%;
	}
	
	
`
  
export default ListComments;
import react, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import TitleField from './titleField'
import PostTextField from './postTextField'
import PostVisBox from './postVisBox'
import CommentDetails from './comments/commentDetails'
import ListComments from './comments/listComments'
import styled from "styled-components";

class BarePostDetails extends react.Component {
	constructor(props) {
		super(props);
		this.state = {loggedIn: false, postID: null, title: null, authorName: null, postText: null,  createDate: null, editDate: null, editable: null, deletable: null, comments: [], mode:'hidden', errors: []}
	}

	componentDidMount(){
		this.getPostDetails();
    }
	
	componentWillReceiveProps(props) {
		this.setState({ loggedIn: props.loggedIn})
	}
	
	getPostDetails() {
		const queryParameters = new URLSearchParams(window.location.search)
		const postID = this.props.postID;
		const errors = queryParameters.get("postID")===postID?JSON.parse(queryParameters.get("errors")):[];
		const myreq = new Request(`${process.env.REACT_APP_NODE_URL}/posts/details/${postID}`)
		fetch(myreq)
		.then(res => res.json())
		.then(data => this.setState({ 	postID:this.props.postID,
										title:data.title,
										postText:data.postText,
										authorName:data.authorName,
										createDate:data.createDate,
										editDate:data.editDate,
										editable:data.editable,
										deleteable:data.deleteable,
										comments:data.comments,
										visible:data.visible,
										errors:errors,
										mode:queryParameters.get("postID")===this.props.postID&&!queryParameters.get("commentID")&&errors?'edit':queryParameters.get("postID")===this.props.postID?'display':this.state.mode}))
	}
	
	modeToggle = () => {
		this.state.mode==='display'?this.setState((state, props) => ({mode:'edit'})):this.setState((state, props) => ({mode:'display'}));
	}
	
	hiddenMode = () => {
		this.setState((state, props) => ({mode:'hidden'}));
	}
	
	displayMode = () => {
		this.setState((state, props) => ({mode:'display'}));
	}
	
	deleteButton () {
		return (<form method="POST" action="/posts/delete">
			<input type="hidden" name="postID" id="postID" value={this.state.postID}/>
			<input type="submit" name="submit_button" value="Delete" />
			</form>)
	}
	
	render () {
		var errorList = [];
		if (this.state.errors){
			this.state.errors.map(item => {
				errorList.push(<li>{item.msg}</li>)
				return {}
			});
		}
		
		const queryParameters = new URLSearchParams(window.location.search)
		const postID = queryParameters.get("postID");
		const commentID = queryParameters.get("commentID");
		
		if (this.state.mode==='edit') {
			return (
			<div className={this.props.className}>
				<h1>{this.state.title+" "}<a href='#' onClick={this.hiddenMode}>-</a></h1>
				<form className='content' method="POST" action="/posts/edit">
					<TitleField title={this.state.title} />
					<PostVisBox value={this.state.visible} />
					<p><span>Author</span>: {this.state.authorName}</p>
					<p><span>Date:</span> {this.state.createDate}</p>
					<PostTextField postText={this.state.postText} />
					<p>Currently editing...</p>
					<input type="hidden" name="postID" id="postID" value={this.state.postID}/>
					<input type="submit" name="submit_button" value="Confirm"/>
					<button className='actionButton' onClick={this.modeToggle}>Cancel</button>
					{this.state.deleteable?this.deleteButton():""}
				</form>
				<ul>
					{errorList.length&&postID===this.props.postID&&!commentID?errorList:''}
				</ul>
			</div>
			);
		} else if (this.state.mode==='display') {
			return (
				<div className={this.props.className}>
					<h1>{this.state.title+"  "}<a href='#' onClick={this.hiddenMode}>-</a></h1>
					<div className='content'>
						<p><span>Author:</span> {this.state.authorName}</p>
						<p><span>Date:</span> {this.state.createDate}</p>
						<p dangerouslySetInnerHTML={{__html:this.state.postText}}></p>
						<p>Last edited: {this.state.editDate}</p>
						{this.state.editable?<a href='#' onClick={this.modeToggle}>Edit</a>:''}
					</div>
					<ListComments loggedIn={this.props.loggedIn} postID={this.props.postID}/>
				</div>
			);
		} else if (this.state.mode==='hidden') {
			return (
				<div className={this.props.className}>
					<h1><a href="#" onClick={this.displayMode}>{this.state.title}</a></h1>
				</div>
			)
		}
	}
};

const PostDetails = styled(BarePostDetails)`
	width:100%;
	background-color:grey;
	h1{
		color: white;
		background-color: darkgrey;
		display: flex;
		justify-content: center;
		padding: 150px;
	}
	h1.a{
		color:white;
	}
	h1>a:visited{
		color:white;
	}
	.content{
		padding: 50px;
	}
	p {
		color: white;	
	}
	span{
		font-weight: bold;
	}
	`;
  
export default PostDetails;
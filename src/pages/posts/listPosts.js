import react from 'react';
import CreatePost from './createPost';
import PostDetails from './postDetails';
import Banner from './banner'
import styled from "styled-components";

class BareListPosts extends react.Component {
	constructor(props) {
		super(props);
		this.state = {loggedIn: props.loggedIn, posts: [], permission:{}}
	}
	
	componentDidMount(){
		this.getPermission();
		this.getPosts();
    }
	
	componentWillReceiveProps(props) {
		this.setState({ loggedIn: props.loggedIn})
	}
	
	getPosts() {
		const myreq = new Request("./posts")
		fetch(myreq)
		.then(res => res.json())
		.then(posts => this.setState({ posts }))
	}
	
	getPermission() {
		const myreq = new Request("/posts/create")
		fetch(myreq)
		.then(res => res.json())
		.then(permission => this.setState({ permission }))
	}

	render () {
		return (
		<div className={this.props.className}>
			{this.state.permission.granted?<CreatePost/>:''}
			{this.state.posts.map(item => {
				return <PostDetails key={item._id} postID={item._id} loggedIn={this.state.loggedIn}/>;
            })}
		</div>
		);
	}
};
  
const ListPosts = styled(BareListPosts)`
	margin:000px 50px;
	padding:0px;
	background-color:rgba(16,16,16,0);
`

export default ListPosts;
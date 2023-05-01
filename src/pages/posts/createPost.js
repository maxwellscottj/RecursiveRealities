import react from 'react';
import {useSearchParams} from 'react-router-dom';
import TitleField from './titleField'
import PostTextField from './postTextField'
import PostVisBox from './postVisBox'
import styled from 'styled-components'


const BareCreatePost = ({className}) => {
	
	const queryParameters = new URLSearchParams(window.location.search)
	const title = queryParameters.get("title")?queryParameters.get("title"):"Post title here...";
	const postText = queryParameters.get("postText")?queryParameters.get("postText"):"Post text here...";
	const postID = queryParameters.get("postID")?queryParameters.get("postID"):null;
	
	var errors = JSON.parse(queryParameters.get("errors"))
	var errorList = [];
		if (errors){
			errors.map(item => {
				errorList.push(<p>{item.msg}</p>)
				return {}
			});
	}
	
	const [err, setErr] = react.useState(null);
	const [mode, setMode] = react.useState(errorList.length&&postID==='new'?'visible':'hidden')
	
	const modeToggle = () => {
    setMode(mode==='visible'?'hidden':'visible');
	};

	
	if (mode==='visible') {
		return (
	<div className={className}>
		<div className='content'>
			<h2>New Post <a href='#' onClick={modeToggle}>-</a></h2>
			<form method="POST" action="/posts/create">
				<TitleField title={title}/>
				<PostTextField postText={postText}/>
				<input type="submit" name="submit_button" value="Create Post" />
			</form>
			<div>
				{errorList.length&&postID==='new'?errorList:''}
			</div>
		</div>
	</div>
	)
	} else if (mode==='hidden') {
		return(<div className={className}>
					<div className='button' onClick={modeToggle}>
						<h2><a href='#'>New Post</a></h2>
					</div>
				</div>);
	}
};
  
const CreatePost = styled(BareCreatePost)`
line-height:1.5;



.button {
	padding:20px;
	width: 200px;
	background-color:  darkgrey;
	border: 2px solid lightgrey;
	border-radius: 4px;
}

.button:hover {
	border: 2px solid aliceblue;
}

.button:hover a, .button a:visited {
	color:aliceblue;
}

.content{
	padding:50px;
	width:100%-50px;
	background-color: darkgrey;
	border: 2px solid aliceblue;
	border-radius: 4px;
}

`

export default CreatePost;
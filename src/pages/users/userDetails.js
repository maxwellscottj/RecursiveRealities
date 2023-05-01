import react from 'react';
import {useSearchParams} from 'react-router-dom';
import NameField from './nameField'
import EmailField from './emailField'
import PasswordField from './passwordField'
import styled from 'styled-components'


class BareUserDetails extends react.Component {
	constructor(props) {
		super(props);
		this.state = {userID: props.userID, name: null, role: null, email: null, editable: null, mode:'display', errors: []}
	}
	
	componentDidMount(){
		this.getUserDetails();
    }
	
	modeToggle = () => {
		this.state.mode==='display'?this.setState((state, props) => ({mode:'edit'})):this.setState((state, props) => ({mode:'display'}));
	}
	
	getUserDetails() {
		const queryParameters = new URLSearchParams(window.location.search)
		const userID = this.props.userID
		const errors = JSON.parse(queryParameters.get("errors"))
		const myreq = new Request("./users/details/"+userID)
		fetch(myreq)
		.then(res => res.json())
		.then(data => this.setState({ 	userID:data._id,
										name:data.name,
										role:data.role,
										email:data.email,
										deletable:data.deletable,
										email:data.email,
										editable:data.editable,
										errors: errors,
										mode: errors&&queryParameters.get("userID")===userID?'edit':this.state.mode}))
	}
	
	deleteButton () {
		return (<form method="POST" action="/posts/delete">
			<input type="hidden" name="postID" id="postID" value={this.state.userID}/>
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
		const userID = queryParameters.get("userID")
		
		if (this.state.mode==='edit') {
		return (
			<div className={this.props.className}>
				<tr>
					<th>Username</th>
					<th>Role</th>
					<th>Email</th>
					<th>Editable</th>
				</tr>
				<form method="POST" action="/users/edit/">
					
					<td className={'td'}><NameField name={this.state.name}/></td>
					<p className={'td'}> {this.state.role} </p>
					<p className={'td'}><EmailField email={this.state.email}/></p>
					<p className={'td'}><input type="submit" name="submit_button" value="Confirm" /></p>
					<input type="hidden" name="userID" id="userID" value={this.state.userID}/>
				</form>

				<form method="POST" action="/users/delete/">
					<input type={this.state.deletable?"submit":"hidden"} name="submit_button" value="Delete" />
					<input type="hidden" name="userID" id="userID" value={this.state.userID}/>
				</form>
				<ul>
				{userID===this.state.userID&&errorList.length?errorList:''}
				</ul>
			</div>
		);
		} else if (this.state.mode==='display') {
		return (
		<div className={this.props.className}>
			<tr>
					<th>Username</th>
					<th>Role</th>
					<th>Email</th>
					<th>Editable</th>
			</tr>
			<tr>
					<td>{this.state.name}</td>
					<td>{this.state.role}</td>
					<td>{this.state.email}</td>
					<td><a href='#' onClick={this.state.editable?this.modeToggle:""}> {this.state.editable?'Edit':''} </a></td>
			</tr>
			
		</div>
		);
		}
	}
};

const UserDetails = styled(BareUserDetails)`
width:100%;
display:table;
margin-top: 20px;

form, tr {
	display:table-row;
}

td, .td {
	display:table-cell;
}
`
  
export default UserDetails;
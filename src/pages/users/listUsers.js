import react from 'react';
import userListItem from './userListItem';
import UserDetails from './userDetails';
import styled from 'styled-components'

class BareListUsers extends react.Component {
	constructor() {
		super();
		this.state = {users: []}
	}
	
	componentDidMount(){
		this.getUsers();
    }
	
	getUsers() {
		const myreq = new Request("./users")
		fetch(myreq)
		.then(res => res.json())
		.then(users => this.setState({ users }))
	}

	render () {
		if(this.state.users.length) {
			return (
			<div className={this.props.className}>
				<h1>User Directory</h1>
				<p>{this.state.users.length} Users</p>
				{this.state.users.map(item => {
					return <UserDetails userID={item._id}/>
				})}
			</div>
			);
		} else {
			return (
				<div className={this.props.className}>
					<h1>User Directory</h1>
					<p>You do not have permission to perform that action.</p>
				</div>
			)
		}
	}
};
 
const ListUsers = styled(BareListUsers)`
margin: 50px;
padding: 50px;
line-height: 1.5;
background-color:lightgrey;

h1 {
	margin: 50px;
	text-align: center;
}

table{
	width:100%;
}

th{
	color: white;
	background-color: grey;
}

`

export default ListUsers;
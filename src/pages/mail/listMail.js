import react from 'react';
import MailDetails from './mailDetails';
import CreateMail from './createMail';
import styled from 'styled-components';

class BareListMail extends react.Component {
	constructor() {
		super();
		this.state = {mail: [], mode: 'hidden', permission:{}}
	}
	
	componentDidMount(){
		this.getPermission();
		this.getMail();
    }
	
	getMail() {
		const myreq = new Request("/mail")
		fetch(myreq)
		.then(res => res.json())
		.then(mail => this.setState({ mail }))
	}
	
	getPermission() {
		const myreq = new Request("/mail/create")
		fetch(myreq)
		.then(res => res.json())
		.then(permission => this.setState({ permission }))
	}

	render () {
		return (
		<div className={this.props.className}>
			<h1>Email Announcements</h1>
			{this.state.permission.granted?<CreateMail/>:<p>You do not have permission to perform that action.</p>}
			{this.state.mail.map(item => {
				return <MailDetails key={item._id} mailID={item._id} loggedIn={this.state.loggedIn}/>;
            })}
		</div>
		);
	}
};
  
const ListMail = styled(BareListMail)`
background-color:lightgrey;
margin: 50px;
padding: 50px;

h1 {
	margin: 50px;
	text-align: center;
}

`

export default ListMail;
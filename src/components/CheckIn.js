import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { AppContext } from '../context';

class CheckIn extends Component {
	
	state = {
		email: ''
	}

	handleChange = e => {
		const state = { ...this.state };
		state.email = e.target.value;
		this.setState(state);
	}

	handleSubmit = async (e, changeAppContext) => {
		e.preventDefault();	

		const { email } = this.state;
		let promise = await axios.get(`http://localhost:3001/api/user/${email}`);

		if(promise.data.user) {
			changeAppContext(promise.data.user);
			this.props.history.push('/alerts');
			return;
		}

		promise = await axios.post('http://localhost:3001/api/users', { email });
		changeAppContext(promise.data.user);
		this.props.history.push('/alerts');
	}

	render() {
		const { email } = this.state;

		return (
			<section id='check-in' className='check-in'>
				<AppContext.Consumer>
					{ ({ changeAppContext }) => 
						<form onSubmit={(e) => this.handleSubmit(e, changeAppContext)}>
							<h1 className='title'>Faça <strong>check in</strong> com seu email</h1>
							<input 
								autoFocus
								className='input' 
								id='email' 
								onChange={this.handleChange}
								placeholder='email@domain.com'
								value={email} 
							/>
							<button className='button'>check in</button>
						</form>
					}
				</AppContext.Consumer>
			</section>
		);
	}
}

export default withRouter(CheckIn);

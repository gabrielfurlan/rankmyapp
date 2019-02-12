import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { AppContext } from '../context';

const defaultValues = {
	keywords: '',
	showNewAlert: false,
	logtime: 10
};

class Alerts extends Component {
	
	state = {
		...defaultValues
	}

	handleChange = e => {
		const state = { ...this.state };
		state[e.target.id] = e.target.value;
		this.setState(state);
	}

	handleLogtimeChange = e => {
		const state = { ...this.state };
		state.logtime = +e.target.value;
		this.setState(state);
	}	

	handleToggleNewAlert = () => {
		const state = { ...this.state };
		state.showNewAlert = !state.showNewAlert;
		this.setState(state);
	}

	handleDelete = async (_id, alerts, changeAppContext) => {
		const index = alerts.findIndex(alert => alert._id === _id)
		alerts.splice(index, 1);
		
		changeAppContext({ alerts });
		await axios.delete(`http://localhost:3001/api/alert/${_id}`);
	}

	handleSubmit = async (e, user, alerts, changeAppContext) => {
		e.preventDefault();

		const { keywords, logtime } = this.state;
		const data = { keywords, logtime, user };

		let promise = await axios.post('http://localhost:3001/api/alerts', data);

		if(promise.data.code === 'alert/duplicate') return;

		alerts.push(promise.data.alert);
		changeAppContext({ alerts });
		this.setState({ ...this.state, ...defaultValues });
	}

	renderAlerts(alerts, changeAppContext) {
		if(!alerts.length) 
				return <div className='not-alert'>Cadastre alertas e receba as melhores ofertas do produto.</div>
		
		return alerts.map(({ _id, keywords, created_at }) => (
			<div className='alert'>
				<header>
					<h3 className='title'>{keywords}</h3>
					<p className='id'>{_id}</p>
				</header>
				<span className='date'>{ moment(created_at).format('MMMM Do YYYY, h:mm') }</span>
				<img src='/delete-forever-outline.svg' onClick={() => this.handleDelete(_id, alerts, changeAppContext)} />
			</div>
		));
	}

	render() {
		const { logtime, keywords, showNewAlert } = this.state; 
		return (
			<AppContext.Consumer>
				{ ({ email, _id, alerts, changeAppContext }) => {
					if(!email) this.props.history.push('/');
					console.log(alerts);
					return (
						<section id='alerts' className='alerts'>
							<header>
								<h1 className='title'>alertas / <span>{email}</span></h1>
								<div className={`more-wrapper ${showNewAlert ? '-show' : ''}`}>
									<button className='more' onClick={this.handleToggleNewAlert}>+</button>
									<form className='form' onSubmit={(e) => this.handleSubmit(e, _id, alerts, changeAppContext)}>
										<label htmlFor='keywords'>Quais as palavras chaves para seu alerta?</label>
										<input 
											autoFocus
											className='input' 
											id='keywords' 
											onChange={this.handleChange}
											placeholder='chaves...'
											value={keywords} 
										/>
										<select 
											className='select' 
											id='logtime' 
											onChange={this.handleLogtimeChange}
										>
											<option selected={logtime === 10} value='10'>10 minutos</option>
											<option selected={logtime === 20} value='20'>20 minutos</option>
											<option selected={logtime === 30} value='30'>30 minutos</option>
										</select>
										<button className='save'>Registrar</button>
									</form>
								</div>
							</header>
							<main className='main'>
								{ this.renderAlerts(alerts, changeAppContext)	}
							</main>
						</section>
					);
				}}
			</AppContext.Consumer>
		);
	}
}

export default withRouter(Alerts);

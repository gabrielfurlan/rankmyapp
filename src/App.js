import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CheckIn from './components/CheckIn';
import Alerts from './components/Alerts';

import { AppContext } from './context';

import './static/css/index.css';

class App extends Component {
  
  state = {
  	email: '',
    alerts: []
  }

  changeAppContext = (data) => {
  	const state = { ...this.state, ...data };
  	this.setState(state);
  }

  render() {
  	const context = { 
  		...this.state,
  		changeAppContext: this.changeAppContext
  	};

    return (
    	<AppContext.Provider value={context}>
		  	<BrowserRouter>
		    	<div className='app'>
						<Route exact path='/' component={CheckIn} />
						<Route path='/alerts' component={Alerts} />
		    	</div>
		  	</BrowserRouter>
    	</AppContext.Provider>
    );
  }

}

export default App;

import React from 'react';

export const AppContext = React.createContext({
	email: '',
	changeAppContext: () => {},
	loading: false
});

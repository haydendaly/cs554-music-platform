import React from 'react';
import './App.css';
import Home from './component/Home'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const App = () => {

	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
				<h1 className='App-title'>Spotify</h1>
				</header>
				<br />
				<br />
				<div className='App-body'>
        <Route exact path='/' component={Home} />
				</div>
			</div>
		</Router>
	);
};

export default App;
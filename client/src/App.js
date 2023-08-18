import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';

const App = () => {
	return (
		<ContactState>
			<Router>
				<Fragment>
					<Navbar />
					<div className='container'>
						<Routes>
							<Route exact path='/' Component={ Home } />
							<Route exact path='/about' Component={ About } />
						</Routes>
					</div>
				</Fragment>
			</Router>
		</ContactState>
	);
}

export default App;

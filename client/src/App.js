import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<Router>
					<Fragment>
						<Navbar />
						<div className='container'>
							<Routes>
								<Route exact path='/' Component={ Home } />
								<Route exact path='/about' Component={ About } />
								<Route exact path='/register' Component={ Register } />
								<Route exact path='/login' Component={ Login } />
							</Routes>
						</div>
					</Fragment>
				</Router>
			</ContactState>
		</AuthState>
	);
}

export default App;

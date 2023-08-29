import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './components/pages/About';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import Register from './components/auth/Register';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState';
import SetAuthToken from './utils/SetAuthToken';

if(localStorage.token) {
	SetAuthToken(localStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment>
							<Navbar />
							<div className='container'>
								<Alerts />
								<Routes>
									<Route exact path='/' element={ <PrivateRoute component={ Home } /> } />
									<Route exact path='/about' Component={ About } />
									<Route exact path='/register' Component={ Register } />
									<Route exact path='/login' Component={ Login } />
								</Routes>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
}

export default App;

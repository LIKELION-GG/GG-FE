import React, { useEffect } from 'react';

import { RecoilRoot } from 'recoil';

import Router from './Router';

import './index.css';
import Navbar from './components/Layout/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
	const location = useLocation();
	const showNavbar = location.pathname !== '/landing';

	const token = sessionStorage.getItem('accessToken');

	const navigate = useNavigate();

	useEffect(() => {
		if (
			location.pathname !== '/landing' &&
			location.pathname !== '/login' &&
			location.pathname !== '/' &&
			location.pathname !== '/authkakao' &&
			location.pathname !== '/unauthorized' &&
			location.pathname !== '/notFound' &&
			!token
		) {
			navigate('/login');
		}
	}, []);

	return (
		<RecoilRoot>
			<div className="App">
				{showNavbar && <Navbar />}
				<Router />
			</div>
		</RecoilRoot>
	);
}

export default App;

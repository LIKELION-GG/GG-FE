import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [token, setToken] = useState(sessionStorage.getItem('accessToken'));

	useEffect(() => {
		setToken(sessionStorage.getItem('accessToken'));
	}, [token]);

	const delToken = () => {
		sessionStorage.removeItem('accessToken');
		token = undefined;
	};

	const refreshSite = () => {
		window.location.href = '/home';
	};

	return (
		<div className={`h-[72px] absolute top-0 flex justify-between px-[8vw] items-center w-full bg-[#f5f5f5] z-20`}>
			<img src="/img/logo.svg" alt="메인 Logo" className="w-[126px] cursor-pointer" onClick={refreshSite} />

			<div className="flex-template gap-5 text-Blue-400 text-[13px]">
				{token && (
					<>
						<Link to="/home" className="flex-template gap-2">
							<img src="/img/navbarHome.svg" />
							Home
						</Link>
						<img src="/img/navbarLine.svg" />
						<Link to="/mylists" className="flex-template gap-2">
							<img src="/img/navbarPar.svg" />
							지원자 List 및 작성한 글
						</Link>
						<img src="/img/navbarLine.svg" />
					</>
				)}
				{token ? (
					<Link to="/login" className="bg-Blue-200 py-2 px-4 rounded-3xl text-white" onClick={delToken}>
						로그아웃
					</Link>
				) : (
					<Link to="/login" className="bg-Blue-200 py-2 px-4 rounded-3xl text-white">
						로그인
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;

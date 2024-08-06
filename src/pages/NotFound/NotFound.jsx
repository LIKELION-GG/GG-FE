import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="h-full flex flex-col gap-4 justify-center items-center">
			<h1 className=" text-[50px]">Page Not Found 404</h1>
			<Link to="/home" className="bg-Blue-300 w-36 py-2 rounded-xl flex justify-center text-white">
				메인으로 돌아가기
			</Link>
		</div>
	);
};

export default NotFound;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ApplyList = ({ status, title, duration, startDate, endDate }) => {
	return (
		<div className={`p-5`}>
			<div
				className={`${status ? 'bg-gray-50 text-black' : 'opacity-80 text-opacity-80'} h-full border-2 border-gray-200 border-opacity-6 rounded-2xl overflow-hidden`}
			>
				<div className="p-6 object-cover object-center">
					<p
						className={`${status ? 'text-green-400' : 'text-red-500'} text-base font-pretendardMedium mb-3 mt-3`}
					>
						{status ? '진행 중' : '마감'}
					</p>
					<h3
						className={`${status ? 'text-black' : 'text-opacity-60'} text-xl font-pretendardBold text-black`}
					>
						{title}
					</h3>
					<p className="text-sm mt-2 font-pretendardLight text-gray-400">
						모집 기간 {'('}
						{duration}
						{')'}
					</p>
				</div>
				<div className="p-6 flex flex-wrap ml-auto">
					<Link className="ml-auto" to="/post">
						{' '}
						{/* 참가자 모집글로 이동 */}
						<img
							src="/img/navigation.svg"
							className="fill-blue-400 ml-auto w-8 h-8"
							alt="navigation images"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ApplyList;

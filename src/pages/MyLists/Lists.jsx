import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Lists = ({ title, duration, startDate, endDate, postId, currentStatus }) => {
	const [status, setStatus] = useState(false);
	const [currentBtn, setCurrentBtn] = useState(true); // disabled button 설정
	const [btn, setBtn] = useState('');

	const judgeStatus = (status) => {
		if (status === 'ongoing') {
			setStatus(true);
			setBtn('text-white bg-[#2563FF]');
		} else if (status === 'closed') {
			setStatus(false);
			setBtn('text-black bg-gray-200');
		}
	};

	useEffect(() => {
		judgeStatus(currentStatus);
	}, [currentStatus]);

	return (
		<div className={`p-5`}>
			<div
				className={`${status ? 'bg-gray-50 text-black' : 'opacity-80 text-opacity-80'} h-full border-2 border-gray-200 border-opacity-6 rounded-2xl overflow-hidden`}
			>
				<div className="pt-10 p-6 object-cover object-center border-b-2">
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
						{startDate.substr(5)}
						{'~'}
						{endDate.substr(5)}
						{')'}
					</p>
				</div>
				<div className="p-6 flex flex-wrap items-center">
					<Link to={`${postId}/applicants`}>
						{' '}
						{/* 본인이 작성한 글로 이동 */}
						<button
							disabled={currentStatus === 'ongoing' ? false : true}
							onClick={console.log(currentBtn)}
							className={`${btn} px-10 py-3 font-pretendardLight rounded-full `}
						>
							지원자 확인하기
						</button>
					</Link>
					<Link className="ml-auto" to={`/posts/${postId}`}>
						{' '}
						{/* 본인이 작성한 글로 이동 (위와 같은 기능) */}
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

export default Lists;

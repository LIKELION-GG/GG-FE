import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';

const SelectList = ({ title, duration, startDate, endDate, postId, currentStatus }) => {
	const [status, setStatus] = useState(false);
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const navigation = useNavigate();

	const judgeStatus = (status) => {
		if (status === 'ongoing') {
			setStatus(true);
		} else if (status === 'closed') {
			setStatus(false);
		}
	};

	useEffect(() => {
		judgeStatus(currentStatus);
	}, []);

	const handleContentClick = (e) => {
		e.stopPropagation();
	};

	const openModal = () => {
		setIsSelectOpen(!isSelectOpen);
		console.log('Modal Open at first');
		console.log(isSelectOpen);
	};

	const closeModal = (e) => {
		e.stopPropagation();
		setIsSelectOpen(false);
		console.log('close Modal');
	};

	const handleModalCloseRequest = (e) => {
		e.stopPropagation();
		setIsSelectOpen(false);
	};

	const handleBtnClick = () => {
		navigation('/home');
	};

	return (
		<div className={`p-5`} onClick={openModal}>
			<div
				className={`${status ? 'bg-gray-50 text-black' : 'opacity-80 text-opacity-80'} h-full border-2 border-gray-200 border-opacity-6 rounded-2xl overflow-hidden cursor-pointer hover:bg-gray-300`}
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
				<ReactModal
					isOpen={isSelectOpen}
					contentLabel="Select Modal"
					className="bg-white rounded-2xl shadow-lg text-center justify-center"
					overlayClassName="bg-black justify-center items-center flex fixed inset-0 bg-opacity-50"
					onRequestClose={handleModalCloseRequest}
					shouldCloseOnOverlayClick={true}
				>
					<div onClick={handleContentClick} className="relative">
						<button onClick={closeModal} className="absolute text-3xl font-light right-4 top-2">
							&times;
						</button>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="mx-20 px-10 mt-16 text-lg font-pretendardLight">
							이 글로 선택하시겠습니까?
						</span>
						<div className="flex items-center my-6">
							<button
								onClick={handleBtnClick}
								className="bg-[#00AEFF] font-pretendardSemibold text-white px-6 py-4 rounded-lg mx-2"
							>
								네
							</button>
							<button
								className="bg-white font-pretendardSemibold text-black border-2 border-black px-6 py-4 rounded-lg mx-2"
								onClick={closeModal}
							>
								아니요
							</button>
						</div>
					</div>
				</ReactModal>
			</div>
		</div>
	);
};

export default SelectList;

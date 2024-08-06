import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EachHelp = ({ name, initialstatus, applyTime, trust, postId, applicationId, userId, exchangePostId, trade }) => {
	const [bgColor, setBgColor] = useState('');
	const [btnColor, setBtnColor] = useState('');
	const [check, setCheck] = useState(false);
	const [checked, setChecked] = useState(false);
	const [isTrustOpen, setIsTrustOpen] = useState(false);
	const [isReviewOpen, setIsReviewOpen] = useState(false);
	const [isErrorOpen, setIsErrorOpen] = useState(false);
	const [sentence, setSentence] = useState({
		Requested: '님이 서로 돕기를 제안했어요!',
		soorack: '님과는 서로 도와주기!',
		Mannam: '님과 실험 후 리뷰하기',
	});
	const [selectedTrustOptions, setSelectedTrustOptions] = useState({
		late: false,
		noshow: false,
	});
	const formattedDate = applyTime.substr(0, 10); // 원하는 형식으로 날짜 변환
	const apiUrl = process.env.REACT_APP_API_URL;
	const [option3, setOption3] = useState(false);

	const navigate = useNavigate();

	const accessToken = sessionStorage.getItem('accessToken');

	const StatusInfo = [
		{ status: 'Requested', name: '님이 서로 돕기를 제안했어요!' },
		{ status: 'soorack', name: '님과는 서로 도와주기!' },
		{ status: 'Nannam', name: '님과 실험 후 리뷰하기' },
	];

	const matchStatusMent = StatusInfo.find((item) => item.status === initialstatus);

	const initialTrustOptions = {
		late: false,
		noshow: false,
	};

	useEffect(() => {
		if (matchStatusMent.status === 'soorack') {
			setCheck(true);
		} else if (matchStatusMent.status === 'Mannam') {
			setCheck(true);
		} else if (matchStatusMent.status === 'Requested') {
			setCheck(false);
		}
		switch (matchStatusMent.status) {
			case 'Requested':
				setBgColor('bg-gray-100 border-gray-100');
				break;
			case 'soorack':
				setBgColor('bg-[#E0F8FF] border-[#E0F8FF]');
				setChecked(false);
				break;
			case 'Mannam':
				setBgColor('bg-custom-blue border-custom-blue');
				setBtnColor('fill-white');
				setChecked(true);
				break;
			default:
				setBgColor('bg-gray-300 border-gray-300');
		}
	}, [matchStatusMent.status]);

	const handleErrorModal = () => {
		setIsErrorOpen(true);
	};

	const handleTrustOptionCheck = (option) => {
		setSelectedTrustOptions((prevState) => ({
			...prevState,
			[option]: !prevState[option],
		}));
	};

	const resetTrustOptions = () => {
		setSelectedTrustOptions(initialTrustOptions);
		console.log(selectedTrustOptions);
	};

	const openModal = (e) => {
		if (matchStatusMent.status === 'soorack' || matchStatusMent.status === 'Requested') {
			setIsTrustOpen(!isTrustOpen);
		} else if (matchStatusMent.status === 'Mannam') {
			setIsReviewOpen(!isReviewOpen);
		}
	};

	const closeTrustModal = () => {
		resetTrustOptions();
		setIsTrustOpen(!isTrustOpen);
	};

	const closeReviewModal = () => {
		setIsReviewOpen(!isReviewOpen);
	};

	const closeErrorModal = () => {
		setIsErrorOpen(!isErrorOpen);
	};

	const handleContentClick = (e) => {
		e.stopPropagation();
	};

	const handleReject = async (e) => {
		// X img 버튼 클릭시 reject 기능
		e.stopPropagation();

		console.log('click!!');

		try {
			const response = await axios.put(
				`${apiUrl}/applications/${exchangePostId}/reject`,
				{},
				{
					accessToken: accessToken,
				},
			);
		} catch (error) {
			console.error('Error submitting review: ', error);
		}
	};

	const handleCheck = async (event) => {
		// mannam 상태로 변경
		event.stopPropagation();

		try {
			const response = await axios.put(
				`${apiUrl}/applications/${exchangePostId}/mannam`,
				{},
				{
					accessToken: accessToken,
				},
			);
		} catch (error) {
			console.error('Error submitting review: ', error);
		}
	};

	const getTrustImage = (trust) => {
		switch (trust) {
			case 0:
				return '/img/0strike.svg';
			case 0.5:
				return '/img/0.5strike.svg';
			case 1:
				return '/img/1strike.svg';
			case 1.5:
				return '/img/1.5strike.svg';
			case 2:
				return '/img/2strike.svg';
			case 2.5:
				return '/img/2.5strike.svg';
			case 3:
				return '/img/3strike.svg';
			default:
				return '/img/0strike.svg';
		}
	};

	const handleSubmitReview = async () => {
		// Review 데이터를 서버로 보내주는 함수
		const { late, noshow } = selectedTrustOptions;

		try {
			console.log(userId, noshow, late, applicationId);
			const response = await axios.post(
				`${apiUrl}/review`,
				{
					userId: userId,
					late: late,
					noshow: noshow,
					applicationId: applicationId,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						accessToken: accessToken,
					},
				},
			);
			console.log('Review submitted:', response.data);
			closeReviewModal();
			navigate('/');
		} catch (error) {
			console.error('Error submitting review:', error);
			handleErrorModal();
			if (error.response) {
				console.error('Response data:', error.response.data);
			}
		}
	};

	if (!trade) {
		return null;
	}

	return (
		<div className="">
			<button
				className={`relative z-0 border-opacity-50 rounded-3xl p-3 flex items-center my-5 shadow w-full ${bgColor}`}
				onClick={openModal}
			>
				{/* 신뢰도를 보여주는 Modal */}
				<ReactModal
					isOpen={isTrustOpen}
					contentLabel="Test TrustModal"
					className="bg-white rounded-2xl shadow-lg text-center justify-center"
					overlayClassName="bg-black justify-center items-center flex fixed inset-0 bg-opacity-50"
					shouldCloseOnOverlayClick={true}
				>
					<div onClick={handleContentClick} className="relative">
						<button onClick={closeTrustModal} className="absolute text-3xl font-light right-4 top-2">
							&times;
						</button>
						<span className="block pt-5">{name}님의 신뢰도는</span>
						<div className="py-3 items-center mt-3 mx-20">
							<img src={getTrustImage(trust)} alt="trustCounter image" />
						</div>
						<button
							className="bg-blue-600 text-white px-5 py-3 mt-2 rounded-full mb-10"
							onClick={closeTrustModal}
						>
							완료
						</button>
						<Link
							to={`/posts/${exchangePostId}`}
							className="absolute bottom-4 right-5 text-xs font-pretendardSemibold"
						>
							{name}님의 모집글 확인하러 가기 →
						</Link>
					</div>
				</ReactModal>

				{/* Review를 보여주는 Modal */}
				<ReactModal
					isOpen={isReviewOpen}
					contentLabel="Test ReviewModal"
					className="bg-white rounded-2xl shadow-lg text-center justify-center"
					overlayClassName="bg-black justify-center items-center flex fixed inset-0 bg-opacity-50"
					shouldCloseOnOverlayClick={true}
				>
					<div onClick={handleContentClick} className="relative">
						<button onClick={closeReviewModal} className="absolute text-3xl font-light right-4 top-2">
							&times;
						</button>
						<div className="ml-5 pt-5">
							<span className="flex justify-start">{name}님 리뷰하기</span>
							<span className="flex justify-start py-3 mr-14 font-pretendardSemibold text-[#2563FF]">
								질문을 읽고 해당되는 사항에만 체크해주세요.
							</span>
						</div>
						<div className={`block`}>
							<div className="flex border-t-2 py-6 px-5">
								<span>실험/인터뷰에 결석했나요?</span>
								<img
									className="ml-auto cursor-pointer"
									onClick={() => handleTrustOptionCheck('noshow')}
									src={selectedTrustOptions.noshow ? '/img/checkbox.svg' : '/img/uncheckbox.svg'}
									alt="checkbox"
								/>
							</div>
							<div className="flex border-t-2 py-6 px-5">
								<span>실험/인터뷰에 지각했나요?</span>
								<img
									className="ml-auto cursor-pointer"
									onClick={() => handleTrustOptionCheck('late')}
									src={selectedTrustOptions.late ? '/img/checkbox.svg' : '/img/uncheckbox.svg'}
									alt="checkbox"
								/>
							</div>
							<div className="flex border-y-2 py-6 px-5">
								<span>결석 X, 지각 X</span>
								<img
									className="ml-auto cursor-pointer"
									onClick={() => setOption3(!option3)}
									src={option3 ? '/img/checkbox.svg' : '/img/uncheckbox.svg'}
									alt="checkbox"
								/>
							</div>
							<button
								onClick={handleSubmitReview}
								className="rounded-full bg-[#2563FF] px-5 py-3 font-pretendardMedium text-white flex ml-auto mr-3 my-5 cursor-pointer"
							>
								제출하기
							</button>
						</div>
					</div>
				</ReactModal>

				{/* 다시 제출 못하게 하는 Modal */}
				<ReactModal
					isOpen={isErrorOpen}
					contentLabel="Error Modal"
					className="bg-white rounded-2xl shadow-lg text-center justify-center"
					overlayClassName="bg-black justify-center items-center flex fixed inset-0 bg-opacity-50"
					shouldCloseOnOverlayClick={true}
				>
					<div onClick={handleContentClick} className="relative">
						<button onClick={closeErrorModal} className="absolute text-3xl font-light right-4 top-2">
							&times;
						</button>
						<div className="flex flex-col justify-center p-10">
							<span className="font-pretendardSemibold text-red-600 py-10">
								* 리뷰를 두 번이상 제출하실 수 없습니다. *
							</span>
							<button
								onClick={closeErrorModal}
								className="bg-[#2563FF] rounded-full px-10 py-4 text-white"
							>
								완료
							</button>
						</div>
					</div>
				</ReactModal>

				{check && (
					<img
						className=""
						src={checked ? '/img/checkbox.svg' : '/img/uncheckbox.svg'}
						onClick={handleCheck}
						alt="checkbox"
					/>
				)}
				<div className="pl-5">
					<p className="text-black font-pretendardMedium text-md">
						{name}
						{matchStatusMent.name}
					</p>
					<p className="text-start">learn more →</p>
				</div>
				<div className="ml-auto pr-2">
					{check && (
						<img
							className={`block ${btnColor} ml-auto w-5 h-5 pt-0 relative z-10`}
							src="/img/iconXCircle.svg"
							alt="delete image"
							onClick={handleReject}
						/>
					)}
					<p className="text-gray-400 font-pretendardLight text-sm pt-3">{formattedDate}</p>
				</div>
			</button>
		</div>
	);
};

export default EachHelp;

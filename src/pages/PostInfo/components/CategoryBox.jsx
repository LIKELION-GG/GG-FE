import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Spin } from 'antd';

import PostModal from '../../../components/common/PostModal';

import Question from '../../Post/components/Questions/Question';
import { useContext, useState } from 'react';
import { ReadContext } from '../../../context/ReadContext';
import { useNavigate } from 'react-router-dom';
import { deleteTargetPostInfo } from '../api/PostInfoApi';
import ModalDeleteComplete from './ModalDeleteComplete';

const CategoryBox = ({ position, btn1, btn2 }) => {
	const [isOpen, setIsOpen] = useState(false);

	const durationSet = [
		{ duration: 'Min15', name: '15분 이내' },
		{ duration: 'Min30', name: '30분 이내' },
		{ duration: 'Hour1', name: '1시간 이내' },
		{ duration: 'Hour2', name: '2시간 이내' },
		{ duration: 'Over', name: '2시간 이상' },
	];

	const { readData } = useContext(ReadContext);

	const matchingDuration = durationSet.find((item) => item.duration === readData.postDetails.duration);

	const navigate = useNavigate();

	const handleApply = () => {
		window.location.href = readData.postDetails.contactlink;
	};

	const handleHelp = () => {
		navigate('/select');
	};

	const handleEdit = () => {
		navigate(`/update/${readData.postDetails.id}`);
	};

	const handleDelete = async () => {
		await deleteTargetPostInfo(readData.postDetails.id);

		setIsOpen(!isOpen);
	};

	const buttonFunc = [
		{ BtnName: '수정하기', func: handleEdit },
		{ BtnName: '삭제하기', func: handleDelete },
		{ BtnName: '서로 도와주기', func: handleHelp },
		{ BtnName: '지원하기', func: handleApply },
	];

	const matchingBtn = (btn) => buttonFunc.find((item) => item.BtnName === btn);

	return (
		<div className="w-full h-full flex flex-col justify-between px-[10%]">
			<PostModal isOpen={isOpen} setIsOpen={setIsOpen}>
				<ModalDeleteComplete isOpen={isOpen} setIsOpen={setIsOpen} />
			</PostModal>
			{position === 'left' ? (
				<div>
					<Question question="모집기간" />
					<div className="w-full border border-x-0 border-t-0 border-b-2 border-black mt-2 mb-[3vh] py-2 px-1">
						<div className="gap-3 flex">
							<img src="/img/postsub4.svg" />
							<p>
								{readData.postDetails.startdate} - {readData.postDetails.enddate}
							</p>
						</div>
					</div>

					<Question question="진행방식" />
					<p className="mt-2 mb-[3vh] py-2 px-6 text-[25px]">
						{readData.postDetails.isuntact ? '대면' : '비대면'}
					</p>

					<Question question="인터뷰 예상 소요시간" />
					<div className="w-full border border-x-0 border-t-0 border-b-2 border-black mt-2 mb-[3vh] py-2 px-1">
						<div className="gap-3 flex">
							<img src="/img/timer.svg" />
							<p>{matchingDuration.name}</p>
						</div>
					</div>

					{readData.postDetails.isuntact ? (
						<>
							<Question question="인터뷰/실험 장소를 진행하는 장소" />
							<div className="w-full border border-x-0 border-t-0 border-b-2 border-black mt-2 mb-[3vh] py-2 px-1">
								<div className="gap-3 flex">
									<img src="/img/postsub7.svg" />
									<p>{readData.postDetails.location_name}</p>
								</div>
							</div>
							<div id="map" className="w-full h-[25vh] mb-[3vh] flex justify-center items-center">
								{readData ? (
									<Map
										center={{
											lat: readData.postDetails.location_latitude,
											lng: readData.postDetails.location_longitude,
										}}
										className="w-full h-full"
									>
										<MapMarker
											style={{ border: 'tranparent' }}
											position={{
												lat: readData.postDetails.location_latitude,
												lng: readData.postDetails.location_longitude,
											}}
										/>
									</Map>
								) : (
									<Spin />
								)}
							</div>{' '}
						</>
					) : (
						<div className="pt-10">
							<img src="/img/noMeet.svg" />
						</div>
					)}
				</div>
			) : (
				<div>
					<Question question="자격 요건 및 주의사항만 입력해주세요" />
					<div className="flex mt-2 gap-3">
						<img src="/img/alert.svg" />
						<p className="font-pretendardLight text-[13px] flex items-center">
							자격 요건 예시 : 대학교 재학 중인 사람 , 교직에 5년 이상 근무해 본 사람 <br />
							주의 사항 예시 : 임산부 및 심신 미약자는 실험 참여가 불가합니다.
						</p>
					</div>
					<div className="h-[25vh] mt-[2vh] border rounded-lg mb-[3vh]">
						<textarea
							className="w-full h-full outline-none rounded-lg p-3 resize-none"
							readOnly
							// onChange={handleInputChange}
							value={readData.postDetails.requirements}
						/>
					</div>

					<Question question="인터뷰/실험 보상" />
					<div className="w-full border border-x-0 border-t-0 border-b-2 border-black mt-2 mb-[3vh] py-2 px-1">
						<div className="gap-3 flex">
							<img src="/img/postsub5.svg" />
							<p>{readData.postDetails.reward}</p>
						</div>
					</div>

					<div className="flex flex-col justify-center items-center">
						{readData.postDetails.surveylink ? (
							<div className="w-[70%] h-[61px] border-2 border-black rounded-3xl flex px-6 gap-3 items-center mb-[3vh]">
								<img src="/img/postsub9.svg" className="w-[30px]" />
								<p>{readData.postDetails.surveylink}</p>
							</div>
						) : null}

						{btn1 && btn2 && (
							<div className="flex gap-6">
								<button
									className="py-2 px-4 bg-Blue-300 rounded-lg text-white border-2 border-Blue-300"
									onClick={matchingBtn(btn1).func}
								>
									{btn1}
								</button>
								<button
									className="py-2 px-4 rounded-lg border-2 border-black"
									onClick={matchingBtn(btn2).func}
								>
									{btn2}
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CategoryBox;

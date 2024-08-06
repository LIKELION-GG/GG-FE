import { useRecoilState } from 'recoil';
import { universityId } from '../../../stores/atoms/universityId';
import { useEffect, useState } from 'react';
import { getEnddate } from '../api/MainApi';
import { useNavigate } from 'react-router-dom';

const DeadLineInfo = () => {
	const [shcoolId, setScoolId] = useRecoilState(universityId);
	const [enddata, setEnddata] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const schoolPosts = async (shcoolId) => {
			try {
				const data = await getEnddate(shcoolId);
				setEnddata(data);
			} catch (error) {
				console.error('Failed to fetch user info:', error);
			}
		};

		shcoolId && schoolPosts(shcoolId);
	}, [shcoolId]);

	const durationSet = [
		{ duration: 'Min15', name: '15분 이내' },
		{ duration: 'Min30', name: '30분 이내' },
		{ duration: 'Hour1', name: '1시간 이내' },
		{ duration: 'Hour2', name: '2시간 이내' },
		{ duration: 'Over', name: '2시간 이상' },
	];

	// enddata가 있을 때만 matchingDuration 계산
	const matchingDuration = enddata ? durationSet.find((item) => item.duration === enddata.duration) : null;

	const handleClick = (id) => {
		navigate(`/posts/${id}`);
	};

	return (
		<div
			className={`w-full h-[60%] border px-[25px] bg-white rounded-2xl py-[11px] flex flex-col ${enddata && enddata.title ? 'cursor-pointer' : null}}`}
			onClick={enddata && enddata.title ? () => handleClick(enddata.id) : null}
		>
			<div className="flex gap-3">
				<p className="text-[12px]">마감 기한이 임박했어요!</p>
			</div>
			<div className="w-[168px] flex-col-template mt-2">
				<img src="/img/daedline.svg" />
			</div>
			{enddata ? (
				enddata.title && (
					<>
						<div className="flex-col-template text-center">
							<p className="text-[8px] text-Blue-500">소요시간</p>
							<p className="text-[11px] text-Blue-500">
								{matchingDuration ? matchingDuration.name : '정보 없음'}
							</p>
							<p className="mt-[10px] text-[15px] font-pretendardSemibold">
								{enddata ? enddata.title : '정보 없음'}
							</p>
							<p className="mt-[16px] text-[15px] font-pretendardSemibold">
								{enddata ? enddata.location_name : '정보 없음'}
							</p>
						</div>
						<div className="flex-template gap-3">
							<img src="/img/presentIcon.svg" />
							<p className="text-[11px]">{enddata ? enddata.reward : '정보 없음'}</p>{' '}
						</div>
					</>
				)
			) : (
				<div>정보가 없습니다.</div>
			)}
		</div>
	);
};

export default DeadLineInfo;

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const GonggangBox = (data) => {
	const result = data.data;
	const navigate = useNavigate();
	const durationSet = [
		{ duration: 'Min15', name: '15분 이내', bg: 'bg-[#2563FF] bg-opacity-50' },
		{ duration: 'Min30', name: '30분 이내', bg: 'bg-[#10C7F9] bg-opacity-50' },
		{ duration: 'Hour1', name: '1시간 이내', bg: 'bg-[#10C7F9] bg-opacity-50' },
		{ duration: 'Hour2', name: '2시간 이내', bg: 'bg-[#10C7F9] bg-opacity-30' },
		{ duration: 'Over', name: '2시간 이상', bg: 'bg-[#10C7F9] bg-opacity-20' },
	];

	const matchingDuration = durationSet.find((item) => item.duration === result.duration);

	const handleClick = (id) => {
		navigate(`/posts/${id}`);
	};

	return (
		<div
			className="flex-none w-[calc((100%-16px)/5)] h-full bg-[#666666] bg-opacity-10 rounded-3xl cursor-pointer"
			onClick={() => handleClick(result.id)}
		>
			<div className="flex flex-col justify-center items-center">
				<div
					className={clsx(
						'rounded-full w-[81px] h-[81px] flex flex-col justify-center items-center my-[12px] drop-shadow-md',
						matchingDuration.bg,
					)}
				>
					<p className="text-[8px] font-pretendardLight">소요 시간</p>
					<p className="text-[11px] font-pretendardSemibold">{matchingDuration.name}</p>
				</div>
				<div className="text-[11px] px-[24px] font-pretendardSemibold text-center">{result.title}</div>
				{result.isuntact ? (
					<div className="text-[11px] mt-[11px] font-pretendardSemibold text-Blue-500">비대면</div>
				) : (
					<div className="text-[11px] mt-[11px] font-pretendardSemibold text-[#999999]">
						{result.location_name}
					</div>
				)}
			</div>
		</div>
	);
};

export default GonggangBox;

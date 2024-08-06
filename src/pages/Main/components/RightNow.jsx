import { useState } from 'react';
import RightNowBox from './RightNow/RightNowBox';
import { useContext } from 'react';
import { UnivPostsContext } from '../../../context/UnivPostsContext';

const RightNow = () => {
	const [visibleStartIndex, setVisibleStartIndex] = useState(0);
	const [isSliding, setIsSliding] = useState(false);

	const { univdata } = useContext(UnivPostsContext);
	const sortedData = univdata.sort((a, b) => b.id - a.id);

	const handleClick = () => {
		if (isSliding || sortedData.length < 3) return; // 애니메이션 진행 중 클릭 방지 및 박스 수가 3개 미만일 때 클릭 방지

		setIsSliding(true);
		setTimeout(() => {
			setVisibleStartIndex((prevIndex) => {
				const nextIndex = prevIndex + 1;
				return nextIndex < sortedData.length ? nextIndex : 0; // 다음 인덱스가 배열 범위를 초과하면 0으로 리셋
			});
			setIsSliding(false);
		}, 500);
	};

	return (
		<div className="w-full h-[50%] border px-[25px] bg-white rounded-b-2xl py-[25px] flex flex-col gap-4">
			<div className="flex gap-[26px]">
				<p className="text-[12px]">방금 올라왔어요!</p>
				<img src="/img/moreIcon.svg" onClick={handleClick} className="cursor-pointer" />
			</div>
			<div className="w-full h-full flex gap-[29px] overflow-hidden relative">
				{/* 현재 보이는 박스 */}
				<div
					className={`flex w-full gap-[29px] transition-transform duration-500 ${isSliding ? 'slide-out' : ''}`}
				>
					{sortedData.slice(visibleStartIndex, visibleStartIndex + 3).map((box, index) => (
						<RightNowBox key={index} data={box} />
					))}
				</div>
				{/* 슬라이드 인 애니메이션을 위한 새로운 박스 */}
				{isSliding && (
					<div className="absolute inset-0 flex gap-[29px] transition-transform duration-500 slide-in">
						{sortedData
							.slice(
								(visibleStartIndex + 1) % sortedData.length,
								(visibleStartIndex + 4) % sortedData.length,
							)
							.map((box, index) => (
								<RightNowBox key={index} data={box} />
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default RightNow;

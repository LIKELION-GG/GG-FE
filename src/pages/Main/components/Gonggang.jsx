import { useState } from 'react';
import GonggangBox from './Gonggang/GonggangBox';
import { useContext } from 'react';
import { UnivPostsContext } from '../../../context/UnivPostsContext';

const Gonggang = () => {
	const [visibleStartIndex, setVisibleStartIndex] = useState(0);
	const [isSliding, setIsSliding] = useState(false);

	const { univdata } = useContext(UnivPostsContext);

	const handleClick = () => {
		setIsSliding(true);
		setTimeout(() => {
			setVisibleStartIndex((prevIndex) => (prevIndex + 3) % univdata.length);
			setIsSliding(false);
		}, 500);
	};

	return (
		<div className="w-full h-[50%] border px-[25px] bg-white rounded-t-2xl py-[2vh] flex flex-col gap-4">
			<div className="flex gap-[8px]">
				<p className="text-[12px]">공강 시간에 할 수 있어요!</p>
				<img src="/img/moreIcon.svg" onClick={handleClick} className="cursor-pointer" />
			</div>
			<div className="w-full h-full flex gap-[4px] overflow-hidden relative">
				<div
					className={`flex gap-[4px] w-full transition-transform duration-500 ${isSliding ? 'slide-out' : ''}`}
				>
					{univdata.slice(visibleStartIndex, visibleStartIndex + 5).map((box, index) => (
						<GonggangBox key={index} data={box} />
					))}
				</div>
				{isSliding && (
					<div className={`absolute inset-0 flex gap-[4px] transition-transform duration-500 slide-in`}>
						{univdata
							.slice((visibleStartIndex + 3) % univdata.length, (visibleStartIndex + 8) % univdata.length)
							.map((box, index) => (
								<GonggangBox key={index} data={box} />
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Gonggang;

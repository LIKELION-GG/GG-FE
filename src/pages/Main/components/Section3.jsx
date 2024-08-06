import { useNavigate } from 'react-router-dom';
import DeadLineInfo from './DeadLineInfo';

const Section3 = () => {
	const navigate = useNavigate();

	const handleBtnClick = () => {
		navigate('/post');
	};

	return (
		<div className="w-[20%] h-full flex flex-col justify-between relative">
			<DeadLineInfo />
			<div className="flex justify-center">
				<img src="/img/mainBg2.svg" className="w-[80%]" />
			</div>
			<img
				src="/img/writeBtn.svg"
				className="w-[79px] absolute bottom-20 right-8 cursor-pointer"
				onClick={handleBtnClick}
			/>
		</div>
	);
};

export default Section3;

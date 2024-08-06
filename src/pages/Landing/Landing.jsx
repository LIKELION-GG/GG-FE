import { useNavigate } from 'react-router-dom';

const Landing = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/login');
	};

	return (
		<div className="bg-Blue-500 w-full h-full flex flex-col items-center">
			<img src="img/landingTitle.svg" className="w-[50%] mt-10" />
			<buttn
				className="py-3 px-8 bg-Blue-200 rounded-full text-white text-[28px] font-pretendardBold mt-12 cursor-pointer relative z-10 hover:opacity-70"
				onClick={handleClick}
			>
				시작하기
			</buttn>
			<img src="/img/landing.svg" className="w-[100vw] object-cover absolute bottom-0 z-0" />
		</div>
	);
};

export default Landing;

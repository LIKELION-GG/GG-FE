import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

const Profile = () => {
	const { userData } = useContext(UserContext);

	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/applies');
	};

	return (
		<div className="w-full h-[290px] border rounded-2xl bg-white">
			<img src="/img/profileBg.svg" className="w-full h-[91px] object-cover rounded-t-2xl" />
			<div className="flex flex-col justify-center items-center">
				<p className="text-[25px] font-pretendardSemibold mt-[26px]">{userData.name}님 어서오세요!</p>
				<span className="text-[12px] mt-[19px] flex">
					지금까지 참여한 인터뷰 / 실험 횟수는
					<p className="ml-1 text-Blue-500">{userData.participated}회</p> 예요.
				</span>

				<button
					className="mt-[32px] py-[12px] w-[206px] bg-Blue-500 rounded-3xl text-white text-[14px]"
					onClick={handleClick}
				>
					지원한 글 확인하기
				</button>
			</div>
		</div>
	);
};

export default Profile;

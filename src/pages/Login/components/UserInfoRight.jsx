import React from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../../stores/atoms/selectedUserInfo';
import { modalState } from '../../../stores/atoms/modalState';
import { submitUserInfo } from '../api/LoginApi';
import { useNavigate } from 'react-router-dom';

const UserInfoRight = () => {
	const [name, setName] = useRecoilState(userInfo);
	const [, setIsOpen] = useRecoilState(modalState);

	const navigate = useNavigate();

	const handleNameChange = (e) => {
		// 객체 확산 연산자 (**리스트가 아니라 객체일 때 사용)
		setName((pre) => ({
			...pre,
			username: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await submitUserInfo({ name: name.username, universityId: name.schoolId });
		if (data) {
			navigate('/home');
		}
	};

	const handleSchoolClick = () => {
		setIsOpen(true);
	};

	return (
		<div className="flex flex-col font-pretendardLight z-10">
			<p className="text-[25px] mb-[24px]">
				<b className="font-pretendardBold">이름</b>을 입력하세요
			</p>
			<input
				type="text"
				placeholder="Enter Your Name"
				className="h-[62px] w-[369px] bg-[#E0F8FF] rounded-lg pl-4 mb-[30px] placeholder:text-[#00AEFF] focus:outline-none focus:border-[#00AEFF] focus:ring-Blue-100 focus:ring-2"
				onChange={handleNameChange}
			/>

			<p className="text-[25px] mb-[24px]">
				<b className="font-pretendardBold">재학중인 대학교</b>를 선택하세요
			</p>
			<input
				type="text"
				placeholder="Enter Your College"
				readOnly="true"
				value={name.school}
				className="h-[62px] w-[369px] bg-[#E0F8FF] rounded-lg pl-4 mb-[30px] placeholder:text-[#00AEFF] focus:outline-none focus:border-[#00AEFF] focus:ring-Blue-100 focus:ring-2"
				onClick={handleSchoolClick}
			/>

			<button className="h-[59px] rounded-lg bg-[#00AEFF] text-white" onClick={handleSubmit}>
				Go Lab 시작하기
			</button>
		</div>
	);
};

export default UserInfoRight;

import React from 'react';

import Modal from '../../components/common/Modal';
import UserInfoLeft from './components/UserInfoLeft';
import UserInfoRight from './components/UserInfoRight';
import ModalSchoolContent from './components/ModalSchoolContent';

const UserInfo = () => {
	return (
		<div className="w-full h-full">
			<Modal>
				<ModalSchoolContent />
			</Modal>
			<div className="flex justify-around items-center h-full relative mt-[-60px]">
				<div className="flex gap-[201px]">
					<UserInfoLeft />
					<UserInfoRight />
				</div>
			</div>
			<img src="/img/loginBg.svg" alt="파도 배경" className="absolute bottom-0 w-full z-0" />
		</div>
	);
};

export default UserInfo;

import { useContext, useEffect } from 'react';
import Profile from './Profile';
import Strike from './Strike';
import { UserContext } from '../../../context/UserContext';
import { getUserInfo } from '../api/MainApi';
import { Spin } from 'antd';
import { useRecoilState } from 'recoil';
import { universityId } from '../../../stores/atoms/universityId';

const Section1 = () => {
	const { userData, setUserData } = useContext(UserContext);

	const [univId, setUnivId] = useRecoilState(universityId);

	if (!userData) {
		setUserData({});
	}

	useEffect(() => {
		const userInfo = async () => {
			try {
				const data = await getUserInfo();
				setUserData(data);
				setUnivId(data.universityId);
				// setUnivId((prev) => ({ ...prev, schoolId: data.universityId }));
			} catch (error) {
				console.error('Failed to fetch user info:', error);
				setUserData(null);
			}
		};
		userInfo();
	}, [setUserData]);

	return (
		<div className="w-[30%] h-full flex flex-col gap-[20px]">
			{userData ? (
				<>
					<Profile />
					<Strike />
				</>
			) : (
				<Spin />
			)}
		</div>
	);
};

export default Section1;

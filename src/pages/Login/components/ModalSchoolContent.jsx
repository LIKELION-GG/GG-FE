import React, { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { schoolList } from '../../../stores/atoms/searchSchoolName';
import { userInfo } from '../../../stores/atoms/selectedUserInfo';
import { initialSchools, searchSchool } from '../api/LoginApi';
import { modalState } from '../../../stores/atoms/modalState';
import { PostContext } from '../../../context/PostContext';

const ModalSchoolContent = () => {
	const [schools, setSchools] = useRecoilState(schoolList);
	const [name, setName] = useRecoilState(userInfo);
	const [, setIsOpen] = useRecoilState(modalState);
	const [isLoading, setIsLoading] = useState(true);
	const [searchSchoolName, setSearchSchoolName] = useState('');

	const { postData, setPostData } = useContext(PostContext);

	const handleSearchName = (e) => {
		setSearchSchoolName(e.target.value);
	};

	useEffect(() => {
		const getSchools = async () => {
			try {
				const initLists = await initialSchools();
				// 리스트일 때는 그냥 리스트로 넣기
				setSchools(initLists);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching schools:', error);
				setIsLoading(false);
			}
		};
		getSchools();
	}, []);

	const handleSearchResult = async () => {
		if (searchSchoolName) {
			const data = await searchSchool(searchSchoolName);

			setSchools(data);
		}
	};

	const selectSchool = (idx) => {
		setName({ ...name, school: schools[idx].name, schoolId: schools[idx].id });
		setPostData((prev) => ({ ...prev, universityId: schools[idx].id }));
		setIsOpen(false);
	};

	return (
		<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
			<div className="sm:flex sm:items-start">
				<div className="my-3 text-center sm:mt-0 sm:text-left w-full">
					<h3 className="text-base font-semibold leading-6 pb-2 text-[#999999]">학교</h3>
					<div className="mb-3 flex border border-[#999999] rounded-md">
						<input
							type="text"
							placeholder="학교명을 입력해주세요."
							className="mr-3 flex-1 pl-3 focus:outline-none border-none rounded-md"
							onChange={handleSearchName}
						/>
						<button type="submit" className="px-2 py-1 rounded-sm flex-2" onClick={handleSearchResult}>
							<img src="/img/search.svg" alt="Search" />
						</button>
					</div>
					<div className="w-auto h-80 flex flex-col p-2 rounded-sm overflow-y-auto">
						{isLoading ? (
							<p className="flex justify-center items-center h-full text-[#999999]">로딩 중...</p>
						) : schools.length > 0 ? (
							schools.map((school, idx) => (
								<p key={idx} className="py-1 cursor-pointer" onClick={() => selectSchool(idx)}>
									{school.name}
								</p>
							))
						) : (
							<p className="flex justify-center items-center h-full text-[#999999]">
								검색 결과가 없습니다.
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalSchoolContent;

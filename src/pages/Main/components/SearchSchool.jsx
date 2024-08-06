import { useContext, useEffect, useState } from 'react';
import SearchSchoolList from './SearchScoolList';
import { searchSchool } from '../../Login/api/LoginApi';
import { useRecoilState } from 'recoil';
import { universityId } from '../../../stores/atoms/universityId';
import { getUnivPosts } from '../api/MainApi';
import { UnivPostsContext } from '../../../context/UnivPostsContext';
import { Spin } from 'antd';

const SearchSchool = () => {
	const [searchName, setSearchName] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [boxState, setBoxState] = useState(false);

	const [shcoolId, setScoolId] = useRecoilState(universityId);

	const { univdata, setUnivdata } = useContext(UnivPostsContext);

	const handleSearch = (e) => {
		setSearchName(e.target.value);
	};

	useEffect(() => {
		const schoolPosts = async (shcoolId) => {
			try {
				const data = await getUnivPosts(shcoolId);
				setUnivdata(data);
			} catch (error) {
				console.error('Failed to fetch user info:', error);
				setUnivdata(null);
			}
		};
		shcoolId && schoolPosts(shcoolId);
	}, [setUnivdata, shcoolId]);

	useEffect(() => {
		const getSearchSchools = async (inputs) => {
			if (searchName) {
				const data = await searchSchool(inputs);

				setSearchResults(data);
			}
		};

		getSearchSchools(searchName);
	}, [searchName]);

	useEffect(() => {
		if (searchResults.length && searchName) {
			setBoxState(true);
		} else {
			setBoxState(false);
		}
	}, [searchResults, searchName]);

	const handleSchoolSelect = (id, name) => {
		setSearchName(name);
		setScoolId(id);
		setBoxState(false);
	};

	return (
		<div className="w-full h-[15%] border flex gap-[42px] px-[25px] bg-white rounded-2xl pt-[20px]">
			{univdata ? (
				<>
					<p className="text-[12px]">대학교 선택</p>
					<div className="flex flex-col relative w-[75%] h-full">
						<div className="flex w-full h-[60%] relative">
							<input
								id="searchBox"
								type="text"
								className="border border-[#999999] w-full focus:outline-none px-2 rounded-l-lg"
								onChange={handleSearch}
								value={searchName}
							/>
							<img src="/img/search_white.svg" className="p-2 rounded-r-lg bg-Blue-300 cursor-pointer" />
							{boxState ? (
								<div className="w-full h-[150px] absolute top-full left-0 border border-[#999999] rounded-lg z-10 bg-white flex flex-col justify-start items-center overflow-auto mt-2">
									{searchResults.map((name, idx) => (
										<div
											key={idx}
											className="w-[94%] h-[30px] hover:bg-Blue-100/75 cursor-pointer z-40 py-1"
											onClick={() => handleSchoolSelect(name.id, name.name)}
										>
											<SearchSchoolList schoolName={name.name} />
										</div>
									))}
								</div>
							) : null}
						</div>
					</div>
				</>
			) : (
				<Spin />
			)}
		</div>
	);
};

export default SearchSchool;

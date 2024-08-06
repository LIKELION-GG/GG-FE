import SchoolInfoBox from './SchoolInfoBox';
import SearchSchool from './SearchSchool';

const Section2 = () => {
	return (
		<div className="w-[50%] h-full flex flex-col gap-[20px]">
			<SearchSchool />
			<SchoolInfoBox />
		</div>
	);
};

export default Section2;

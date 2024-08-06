import { useContext } from 'react';
import PostTitle from '../../pages/Post/components/PostTitle';
import CategoryBox from '../../pages/PostInfo/components/CategoryBox';
import { ReadContext } from '../../context/ReadContext';

const PostView = ({ btn1, btn2 }) => {
	const { readData, setReadData } = useContext(ReadContext);

	return (
		<>
			<div className="relative pt-[100px] px-[8vw] h-[calc(100vh-72px)] z-10">
				<PostTitle text={readData.postDetails.title} read={true} />
				<div className="bg-white w-full h-[75vh] rounded-sm flex items-center relative z-10">
					<div className="border w-[50%] h-[90%] border-y-0 border-l-0 border-r-1 border-[#999999]">
						<CategoryBox position="left" />
					</div>
					<div className="border-none w-[50%] h-[90%]">
						<CategoryBox position="right" btn1={btn1} btn2={btn2} />
					</div>
				</div>
			</div>
			<img src="/img/postbg.svg" className="absolute bottom-0 z-0 w-full" />
		</>
	);
};

export default PostView;

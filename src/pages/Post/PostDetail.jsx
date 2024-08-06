import { useContext } from 'react';
import PageButton from './components/PageButton';
import PostTitle from './components/PostTitle';
import QuestionBox from './components/Questions/QuestionBox';
import QuestionGeo from './components/Questions/QuestionGeo';
import Modal from '../../components/common/Modal';
import ModalSchoolContent from '../Login/components/ModalSchoolContent';

import { PostContext } from '../../context/PostContext';

const PostDetail = () => {
	const { postData, setPostData } = useContext(PostContext);

	return (
		<>
			<div className="relative pt-[100px] px-[8vw] h-[calc(100vh-72px)] z-10">
				<PostTitle text="모집 글 작성하기" />
				<Modal>
					<ModalSchoolContent />
				</Modal>
				<div className="bg-white w-full h-[60vh] rounded-sm flex items-center relative z-10">
					<div className="border w-[50%] h-[90%] border-y-0 border-l-0 border-r-1 border-[#999999]">
						<QuestionBox page="2" />
					</div>
					<div className="w-[50%] h-[94%]">
						<QuestionGeo />
					</div>
				</div>
				<PageButton page="2 / 2" text="게시하기" className="bg-Blue-500" />
			</div>
			<img src="/img/postbg.svg" className="absolute bottom-0 z-0 w-full" />
		</>
	);
};

export default PostDetail;

import { useContext, useEffect } from 'react';
import PageButton from './components/PageButton';
import PostTitle from './components/PostTitle';
import Question from './components/Questions/Question';
import QuestionBox from './components/Questions/QuestionBox';
import { PostContext } from '../../context/PostContext';
import { getTargetPostInfo } from '../PostInfo/api/PostInfoApi';
import { useParams } from 'react-router-dom';

const PostUpdate = () => {
	const { postid } = useParams();

	const { postData, setPostData } = useContext(PostContext);

	const handleInputChange = (e) => {
		const { value } = e.target;
		setPostData((prev) => ({ ...prev, requirements: value }));
	};

	useEffect(() => {
		const getPostInfo = async (postid) => {
			const data = await getTargetPostInfo(postid);
			setPostData((prev) => ({ ...prev, ...data.postDetails }));
		};

		getPostInfo(postid);
	}, []);

	return (
		<>
			<div className="relative pt-[100px] px-[8vw] h-[calc(100vh-72px)] z-10">
				<PostTitle text="모집 글 작성하기" />
				<div className="bg-white w-full h-[60vh] rounded-sm flex items-center relative z-10">
					<div className="border w-[50%] h-[90%] border-y-0 border-l-0 border-r-1 border-[#999999]">
						<QuestionBox page="1" />
					</div>
					<div className="border-none w-[50%] h-[90%]">
						<div className="px-[10%] h-full">
							<Question question="자격 요건 및 주의사항만 입력해주세요" />
							<div className="flex mt-2 gap-3">
								<img src="/img/alert.svg" />
								<p className="font-pretendardLight text-[13px] flex items-center">
									자격 요건 예시 : 대학교 재학 중인 사람 , 교직에 5년 이상 근무해 본 사람 <br />
									주의 사항 예시 : 임산부 및 심신 미약자는 실험 참여가 불가합니다.
								</p>
							</div>
							<div className="h-[40vh] mt-[2vh] border rounded-lg">
								<textarea
									className="w-full h-full outline-none rounded-lg p-3 resize-none"
									onChange={handleInputChange}
									value={postData.requirements}
								/>
							</div>
						</div>
					</div>
				</div>
				<PageButton page="1 / 2" text="다음" link={`/update/detail/${postid}`} className="bg-Blue-500" />
			</div>
			<img src="/img/postbg.svg" className="absolute bottom-0 z-0 w-full" />
		</>
	);
};

export default PostUpdate;

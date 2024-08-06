import clsx from 'clsx';
import { useContext, useState } from 'react';

import Question from './Question';
import { PostContext } from '../../../../context/PostContext';

const QuestionRadio = () => {
	const { postData, setPostData } = useContext(PostContext);

	const activeBtn = clsx('py-2 px-4 bg-Blue-200 rounded-lg text-white');
	const deActiveBtn = clsx('py-2 px-4 rounded-lg border-2 border-black');

	const [faceBtn, setFaceBtn] = useState(postData.isuntact);
	const [nonFacingBtn, setNonFacingBtn] = useState(!postData.isuntact);

	const handleFaceClick = () => {
		setFaceBtn(true);
		setNonFacingBtn(false);

		setPostData((prev) => ({ ...prev, isuntact: true }));
	};

	const handleNonFacingClick = () => {
		setFaceBtn(false);
		setNonFacingBtn(true);

		setPostData((prev) => ({ ...prev, isuntact: false }));
	};

	return (
		<>
			<Question question="진행 방식을 선택해주세요" />
			<div className="flex gap-[25px] ml-[25px]">
				<button className={faceBtn ? activeBtn : deActiveBtn} onClick={handleFaceClick}>
					대면
				</button>
				<button className={nonFacingBtn ? activeBtn : deActiveBtn} onClick={handleNonFacingClick}>
					비대면
				</button>
			</div>
		</>
	);
};

export default QuestionRadio;

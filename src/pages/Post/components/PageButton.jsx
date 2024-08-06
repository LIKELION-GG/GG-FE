import clsx from 'clsx';
import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ModalPostComplete from './ModalPostComplete';
import PostModal from '../../../components/common/PostModal';
import { submitPosts } from '../api/PostApi';
import { PostContext } from '../../../context/PostContext';
import { putTargetPostInfo } from '../../PostInfo/api/PostInfoApi';

const PageButton = ({ page, text, link, className }) => {
	const buttonClass = clsx('py-2 w-[429px] rounded-3xl text-white', className);

	const { postid } = useParams();
	const [isOpen, setIsOpen] = useState(false);

	const { postData, setPostData } = useContext(PostContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await submitPosts({
			...postData,
			location_latitude: +postData.location_latitude,
			location_longitude: +postData.location_longitude,
			people: +postData.people,
		});
		if (data) {
			setIsOpen(true);
		}
	};

	const handleModify = async (e) => {
		e.preventDefault();
		const data = await putTargetPostInfo(postid, {
			...postData,
			location_latitude: +postData.location_latitude,
			location_longitude: +postData.location_longitude,
			people: +postData.people,
		});
		if (data) {
			setIsOpen(true);
		}
	};

	const submitInfo = [
		{
			text: '게시하기',
			func: handleSubmit,
			modalText: '작성',
		},
		{ text: '수정하기', func: handleModify, modalText: '수정' },
	];
	const matchBtn = submitInfo.find((item) => item.text === text);

	return (
		<div className="flex flex-col justify-center items-center mt-[21px]">
			<PostModal isOpen={isOpen} setIsOpen={setIsOpen}>
				{matchBtn && <ModalPostComplete isOpen={isOpen} setIsOpen={setIsOpen} text={matchBtn.modalText} />}
			</PostModal>
			<p className="text-[#999999] mb-[15px] text-[13px]">{page}</p>
			{page === '1 / 2' ? (
				<Link to={link}>
					<button className={buttonClass}>{text}</button>
				</Link>
			) : (
				<button className={buttonClass} onClick={matchBtn.func}>
					{text}
				</button>
			)}
		</div>
	);
};

export default PageButton;

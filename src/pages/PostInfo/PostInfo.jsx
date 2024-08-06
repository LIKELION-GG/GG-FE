// import { useLocation } from 'react-router-dom';
import PostView from '../../components/Layout/PostView';
import { useContext, useEffect, useState } from 'react';
import { ReadContext } from '../../context/ReadContext';
import { getTargetPostInfo } from './api/PostInfoApi';

import { Spin } from 'antd';
import { useLocation, useParams } from 'react-router-dom';

const PostInfo = () => {
	const { postid } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	const { readData, setReadData } = useContext(ReadContext);

	useEffect(() => {
		const getPostsInfo = async () => {
			const data = await getTargetPostInfo(postid);

			setReadData((prev) => ({ ...prev, ...data }));
			setIsLoading(false);
		};
		getPostsInfo();
	}, []);

	if (isLoading) {
		return <Spin />;
	}

	return (
		<>
			{!isLoading && readData.author && <PostView btn1="수정하기" btn2="삭제하기" />}
			{!isLoading && !readData.author && <PostView btn1="서로 도와주기" btn2="지원하기" />}
		</>
	);
};

export default PostInfo;

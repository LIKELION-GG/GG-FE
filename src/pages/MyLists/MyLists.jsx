import { useState, useEffect } from 'react';
import React from 'react';
import Lists from './Lists';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { post } from '../../api/ApiNotLogin';
import { format } from 'prettier';

const MyLists = () => {
	const [posts, setPosts] = useState([]);
	const apiUrl = process.env.REACT_APP_API_URL;
	const today = new Date(); // 현재 날짜 가져오기
	const formattedDate = `${today.getFullYear() - 1}-${today.getMonth() >= 10 ? '' : '0'}${today.getMonth() + 1}-${today.getDate() >= 10 ? '' : '0'}${today.getDate()}`; // 날짜를 원하는 형식으로 교체

	const fetchData = async () => {
		try {
			const response = await axios.get(apiUrl + '/posts/user');

			// 데이터에 Status 키를 추가하는 로직
			const postsWithStatus = response.data.map((post) => ({
				...post, //(formattedDate >= startDate) & (formattedDate <= endDate)
				status: (formattedDate >= post.startdate) & (formattedDate <= post.enddate) ? 'ongoing' : 'closed',
			}));

			const sortedPosts = postsWithStatus.sort((a, b) => {
				const statusOrder = ['ongoing', 'closed'];
				return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
			});
			setPosts(sortedPosts);
			console.log(posts);
			console.log(formattedDate);
		} catch (error) {
			console.log('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container px-[8vw] py-10 mx-auto">
			<div className="ml-4 flex flex-wrap pt-14">
				<img src="/img/bookCheck.svg" alt="글 List 이미지" />
				<p className="ml-2 text-2xl font-pretendardSemibold">작성한 글 LIST</p>
			</div>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[600px]">
				{posts.map((post) => (
					<Lists
						key={post.id}
						postId={post.id}
						title={post.title}
						duration={post.duration}
						startDate={post.startdate}
						endDate={post.enddate}
						currentStatus={post.status}
					/>
				))}
			</div>
		</div>
	);
};

export default MyLists;

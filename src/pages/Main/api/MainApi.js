import * as API from '../../../api/Api';

export const getUserInfo = async () => {
	return await API.get('/user/mypage');
};

export const getUnivPosts = async (universityId) => {
	return await API.get(`/posts/university/${universityId}`);
};

export const getEnddate = async (universityId) => {
	return await API.get(`/posts/university/${universityId}/enddate`);
};

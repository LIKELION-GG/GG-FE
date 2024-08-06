import * as API from '../../../api/Api';

export const getTargetPostInfo = async (postId) => {
	return await API.get(`/posts/${postId}`);
};

export const deleteTargetPostInfo = async (postId) => {
	return await API.delete(`/posts/${postId}`);
};

export const putTargetPostInfo = async (postId, reqBody) => {
	return await API.put(`/posts/${postId}`, reqBody);
};

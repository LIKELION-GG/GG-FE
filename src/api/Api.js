import axios from 'axios';
import { getAccessToken, tokenRefresh } from './ApiUtil';

const instance = axios.create();

instance.defaults.withCredentials = true;
instance.defaults.baseURL = process.env.REACT_APP_API_URL;

instance.interceptors.request.use(
	(config) => {
		const accessToken = getAccessToken();

		if (!accessToken) {
			window.location.href = '/login';
			return config;
		}

		config.headers['Content-Type'] = 'application/json';
		config.headers['accessToken'] = `${accessToken}`;

		return config;
	},
	(error) => {
		console.log(error);
		console.log('실패했음');
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	// async (error) => {
	// 	if (error.response?.status === 401) {
	// 		window.location.href = '/unauthorized';
	// 	} else if (error.response?.status === 404) {
	// 		window.location.href = '/notFound';
	// 	} else if (error.response && error.response?.status === 500) {
	// 		const errorCode = error.response.data.errorCode;
	// 		if (errorCode === 7001) {
	// 			console.log('토큰만료');
	// 			await tokenRefresh(instance);
	// 			const accessToken = getAccessToken();
	// 			error.config.headers.Authorization = `Bearer ${accessToken}`;
	// 			// 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
	// 			return instance(error.config);
	// 		}
	// 	}
	// 	return Promise.reject(error);
	// },
);

const get = async (url) => {
	try {
		const { data } = await instance.get(url);
		return data;
	} catch (error) {
		console.log(error);
		if (error instanceof Error)
			throw new Error(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${error.message}`);
	}
};

const del = async (url) => {
	try {
		const { data } = await instance.delete(url);
		return data;
	} catch (error) {
		if (error instanceof Error)
			throw new Error(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${error.message}`);
	}
};

/**
 *
 * @param url : url주소 ex) /api/shops
 * @param post : body
 * @param config : default = null, 이미지 보낼때만 "imgPost" 설정 > 'Content-Type': 'multipart/form-data' 설정
 * @returns : res.data 반환
 */
const post = async (url, post, config) => {
	try {
		if (config === 'imgPost') {
			const result = await instance.post(url, post, {
				headers: { 'Content-Type': 'multipart/form-data' },
				transformRequest: (data, headers) => {
					return data;
				},
			});
			return result.data;
		}
		const result = await instance.post(url, post);
		return result.data;
	} catch (error) {
		console.log(error);
		if (error instanceof Error)
			throw new Error(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${error.message}`);
	}
};

const put = async (url, put) => {
	try {
		const { data } = await instance.put(url, put);
		return data;
	} catch (error) {
		if (error instanceof Error)
			throw new Error(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${error.message}`);
	}
};

const patch = async (url, patch) => {
	try {
		const { data } = await instance.patch(url, patch);
		return data;
	} catch (error) {
		if (error instanceof Error)
			throw new Error(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${error.message}`);
	}
};

export { get, del as delete, post, put, patch };

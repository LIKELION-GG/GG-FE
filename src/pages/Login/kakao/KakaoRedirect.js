import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoRedirect() {
	const token = new URL(window.location.href).searchParams.get('accessToken');
	const isRegister = new URL(window.location.href).searchParams.get('isRegisterComplete');

	const navigate = useNavigate();

	useEffect(() => {
		async function KakaoLogin() {
			token && sessionStorage.setItem('accessToken', token);
		}
		KakaoLogin();
		if (isRegister === 'true') {
			navigate('/home', { replace: true });
		} else if (isRegister === 'false') {
			navigate('/login/userinfo', { replace: true });
		} else {
			navigate('/login', { replace: true });
		}
	}, []);

	return;
}

export default KakaoRedirect;

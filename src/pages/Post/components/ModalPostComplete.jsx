import { Link } from 'react-router-dom';

const ModalPostComplete = ({ isOpen, setIsOpen, text }) => {
	const handleClose = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
				<div className="flex justify-between">
					<p>글 {text}이 완료되었어요!</p>
					<img src="/img/closeIcon.svg" onClick={handleClose} className="cursor-pointer" />
				</div>
				<div className="flex justify-end mt-10">
					<Link to="/home">
						<button className="py-2 px-4 rounded-3xl bg-Blue-200 text-white">홈으로 돌아가기</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default ModalPostComplete;

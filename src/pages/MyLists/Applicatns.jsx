import { useEffect, useRef, useState } from 'react';
import Applicant from './Applicant';
import EachHelp from './EachHelp';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Applicants = () => {
	const [applications, setApplications] = useState([]);
	const [applyList, setApplyList] = useState([]);
	const { postId } = useParams();
	const apiUrl = process.env.REACT_APP_API_URL;
	const loading = useRef(false);

	const accessToken = sessionStorage.getItem('accessToken');

	// 데이터를 가져오는 비동기 함수
	const fetchData = async () => {
		try {
			const response = await axios.get(apiUrl + `/posts/${postId}/applications`);
			const sortedApplications = response.data.sort((a, b) => {
				const statusOrder = ['Mannam', 'soorack', 'Requested'];
				return statusOrder.indexOf(a.applicationStatus) - statusOrder.indexOf(b.applicationStatus);
			});
			setApplications(sortedApplications);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	// 컴포넌트가 마운트될 때 fetchData 함수를 호출
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="px-[8vw] mt-16 pt-5">
			<div className="flex mx-10">
				<img src="/img/fileDockSearch.svg" alt="file dock search image" />
				<div className="font-pretendardMedium text-xl ml-3">지원자 List</div>
			</div>
			<div className="grid grid-cols-2 my-6">
				<div className="mx-10 border-4 rounded-xl bg-white py-10 px-2.5">
					<div className="flex items-center border-b-2 pb-4 mb-10">
						<img className="mx-4 w-8 h-8" src="/img/eachHelpIcon.svg" alt="help icon image" />
						<p className="font-pretendardMedium text-2xl">서로 돕기</p>
					</div>
					<div className="grid grid-cols-1 overflow-y-auto max-h-[400px]">
						{applications
							.filter((application) => application.trade)
							.map((application) => (
								<EachHelp
									key={application.id}
									name={application.userNickname}
									initialstatus={application.applicationStatus}
									applyTime={application.applicationCreatedAt}
									trust={application.userTrust}
									postId={postId}
									userId={application.userId}
									applicationId={application.applicationId}
									exchangePostId={application.exchangePostId}
									trade={application.trade}
								/>
							))}
					</div>
				</div>
				<div className="mx-10 border-4 rounded-xl bg-white py-10 px-2.5">
					<div className="flex items-center border-b-2 pb-4 mb-14">
						<img className="mx-4 w-8 h-8" src="/img/applicantIcon.svg" alt="applicant icon image" />
						<p className="font-pretendardSemibold text-2xl">지원자</p>
					</div>
					{applications
						.filter((application) => !application.trade)
						.map((application) => (
							<Applicant
								key={application.id}
								name={application.userNickname}
								initialstatus={application.applicationStatus}
								applyTime={application.applicationCreatedAt}
								trust={application.userTrust}
								postId={postId}
								userId={application.userId}
								applicationId={application.applicationId}
								exchangePostId={application.exchangePostId}
								trade={application.trade}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default Applicants;

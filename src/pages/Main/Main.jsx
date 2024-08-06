import { React } from 'react';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import { UserProvider } from '../../context/UserContext';
import { UnivPostsProvider } from '../../context/UnivPostsContext';

const Main = () => {
	return (
		<UserProvider>
			<UnivPostsProvider>
				<div className="relative pt-[100px] px-[8vw] h-[calc(100vh-72px)] z-10 flex gap-[22px]">
					<Section1 />
					<Section2 />
					<Section3 />
				</div>
				<img src="/img/mainBg.svg" className="absolute bottom-0 w-full z-0" />
			</UnivPostsProvider>
		</UserProvider>
	);
};

export default Main;

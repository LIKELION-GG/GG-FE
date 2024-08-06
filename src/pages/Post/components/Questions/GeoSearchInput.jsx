import { useEffect, useState } from 'react';
import MapSearchBox from './MapSearchBox';
import fetchSearchLocation from './fetchSearchlocation';
import { useRecoilState } from 'recoil';
import { GeoInfo } from '../../../../stores/atoms/GeoInfo';

const GeoSearchInput = () => {
	const [searchName, setSearchName] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [boxState, setBoxState] = useState(false);

	const [geoInfo, setGeoInfo] = useRecoilState(GeoInfo);

	const handleSearch = (e) => {
		setGeoInfo({ ...geoInfo, locationName: '' });
		setSearchName(e.target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchSearchLocation({ inputValue: searchName });
				setSearchResults(data);
			} catch (error) {
				console.error(error);
			}
		};

		if (searchName) {
			fetchData();
		}
	}, [searchName]);

	useEffect(() => {
		if (searchResults.length && searchName) {
			setBoxState(true);
		}
	}, [searchResults]);

	const handleLocationSelect = (name, x, y) => {
		setBoxState(false);

		setGeoInfo({ ...geoInfo, locationName: name, location_latitude: y, location_longitude: x });
	};

	return (
		<div className="flex flex-col relative">
			<div className="flex">
				<input
					type="text"
					className="border border-[#999999] w-full focus:outline-none px-2 rounded-l-lg"
					onChange={handleSearch}
					value={geoInfo.locationName ? geoInfo.locationName : searchName}
				/>
				<img src="/img/search_white.svg" className="p-2 rounded-r-lg bg-Blue-300 cursor-pointer" />
			</div>

			{boxState ? (
				<div className="w-full h-[259px] absolute top-full border border-[#999999] rounded-lg z-10 bg-white flex flex-col justify-start items-center overflow-auto">
					{searchResults.map((location, idx) => (
						<div
							className="w-[94%] h-[33%] min-h-[85px] hover:bg-Blue-100/75 cursor-pointer z-40"
							onClick={() => handleLocationSelect(location.place_name, location.x, location.y)}
						>
							<MapSearchBox
								key={idx}
								placeName={location.place_name}
								placeCategory={location.category_name}
								placeAddress={location.address_name}
							/>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

export default GeoSearchInput;

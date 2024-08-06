import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
	const [postData, setPostData] = useState({
		title: null,
		location_latitude: null,
		location_longitude: null,
		location_name: null,
		isuntact: null,
		reward: null,
		requirements: null,
		contactlink: null,
		surveylink: null,
		startdate: null,
		enddate: null,
		duration: null,
		universityId: null,
		people: null,
	});

	return <PostContext.Provider value={{ postData, setPostData }}>{children}</PostContext.Provider>;
};

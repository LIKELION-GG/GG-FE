import React, { createContext, useState } from 'react';

export const UnivPostsContext = createContext();

export const UnivPostsProvider = ({ children }) => {
	const [univdata, setUnivdata] = useState([]);

	return <UnivPostsContext.Provider value={{ univdata, setUnivdata }}>{children}</UnivPostsContext.Provider>;
};

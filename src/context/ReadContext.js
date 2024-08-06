import React, { createContext, useState } from 'react';

export const ReadContext = createContext();

export const ReadProvider = ({ children }) => {
	const [readData, setReadData] = useState(null);

	return <ReadContext.Provider value={{ readData, setReadData }}>{children}</ReadContext.Provider>;
};

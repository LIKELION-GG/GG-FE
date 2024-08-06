import { colors } from './src/constants/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {
			colors: colors,
			fontFamily: {
				pretendardLight: 'light',
				pretendardMedium: 'medium',
				pretendardSemibold: 'semiBold',
				pretendardBold: 'bold',
			},

			backgroundColor: {
				'custom-blue': 'rgba(37, 99, 255, 0.9)',
			},
		},
	},
	plugins: [],
};

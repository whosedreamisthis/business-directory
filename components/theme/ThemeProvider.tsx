'use client';
import { createContext, useState, useEffect, useContext } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [theme, setTheme] = useState<Theme>('light');
	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		if (savedTheme) {
			setTheme(savedTheme);
		}
	}, []);
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');
		root.classList.add(theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('useTheme must be used with ThemeProvider');
	}

	return context;
};

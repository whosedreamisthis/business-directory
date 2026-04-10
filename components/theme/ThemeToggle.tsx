'use client';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { Button } from '../ui/button';

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	return (
		<Button onClick={toggleTheme}>
			{theme === 'light' && <Sun />}
			{theme === 'dark' && <Moon />}
		</Button>
	);
}

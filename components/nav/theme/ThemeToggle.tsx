'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { Button } from '../../ui/button';

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// useEffect only runs on the client, so we know we're "mounted"
	useEffect(() => {
		setMounted(true);
	}, []);

	// Return a placeholder with the same dimensions so the layout doesn't jump
	if (!mounted) {
		return <Button variant="outline" size="icon" className="opacity-0" />;
	}
	return (
		<Button onClick={toggleTheme}>
			{theme === 'light' && <Sun />}
			{theme === 'dark' && <Moon />}
		</Button>
	);
}

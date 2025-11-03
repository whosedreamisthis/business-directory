'use client';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/nav/theme-toggle';
export default function Home() {
	return (
		<div className="flex justify-center items-center h-screen">
			<ThemeToggle />
		</div>
	);
}

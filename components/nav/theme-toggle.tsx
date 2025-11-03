import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	return (
		<div>
			<Button
				variant="link"
				size="icon"
				onClick={() => {
					setTheme(theme === 'dark' ? 'light' : 'dark');
				}}
			>
				{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
			</Button>
		</div>
	);
}

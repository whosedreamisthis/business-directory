import React from 'react';

// This layout wraps the dashboard page and runs on the server.
// It provides a clean structure for the protected route.
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* For now, this is a simple wrapper, but this is where a sidebar/navigation would go. */}
			<main className="flex-1">{children}</main>
		</div>
	);
}

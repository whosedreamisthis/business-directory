'use client'; // CRITICAL: This must be a client component

import { useAuth } from '@clerk/nextjs';
import React from 'react';

export default function Dashboard() {
	const { isLoaded, isSignedIn } = useAuth();

	// Show nothing until Clerk state is loaded
	if (!isLoaded) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-xl">Loading authentication...</p>
			</div>
		);
	}

	// NOTE: If the middleware failed, this client-side check will trigger the final protection.
	// In your case, the middleware IS working (as shown by the NEXT_REDIRECT error),
	// so this code will only execute once signed in.
	if (!isSignedIn) {
		// This state should theoretically not be reachable if middleware works,
		// but it acts as a safety net. Clerk handles the redirect internally.
		return null;
	}

	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold mb-4">
				Welcome to your Dashboard!
			</h1>
		</div>
	);
}

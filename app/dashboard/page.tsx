'use client'; // CRITICAL: This must be a client component

import { useAuth } from '@clerk/nextjs';
import React from 'react';
import { useBusiness } from '@/context/business';
import PreviewCard from '@/components/business/preview/preview-card';
import Link from 'next/link';

export default function Dashboard() {
	const { isLoaded, isSignedIn } = useAuth();
	const { businesses } = useBusiness();
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
		<div className="p-5">
			<h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
				{businesses.map((business, index) => {
					return (
						<Link
							key={index}
							href={`/dashboard/business/edit/${business._id}`}
						>
							<div className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
								<PreviewCard business={business} />
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

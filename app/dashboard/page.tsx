'use client';
import React from 'react';
import { useBusiness } from '@/context/business';
import PreviewCard from '@/components/business/preview/PreviewCard';
import Link from 'next/link';

export default function DashboardPage() {
	const { businesses } = useBusiness();
	return (
		<div className="p-5">
			<h1 className="text-2xl font-bold mb-5 text-center">Dashboard</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
				{businesses.map((business, index) => (
					<Link
						key={index}
						href={`/dashboard/business/edit/${business._id}`}
					>
						<div className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
							<PreviewCard business={business} />
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

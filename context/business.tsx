'use client';

import React, {
	useContext,
	createContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { BusinessState } from '@/utils/types/business';
import { useClerk, useUser } from '@clerk/nextjs';
import {
	saveBusinessToDb,
	getUserBusinessesFromDb,
	getBusinessFromDb,
} from '@/actions/business';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';

const intialState: BusinessState = {
	_id: '',
	userEmail: '',
	name: '',
	category: '',
	description: '',
	address: '',
	phone: '',
	email: '',
	website: '',
	hours: '',
	logo: '',
	bn: '',
	slug: '',
	createdAt: '',
	updatedAt: '',
	__v: 0,
};

interface BusinessContextType {
	business: BusinessState;
	setBusiness: React.Dispatch<React.SetStateAction<BusinessState>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.MouseEvent) => void;
	businesses: BusinessState[];
	setBusinesses: React.Dispatch<React.SetStateAction<BusinessState[]>>;
}
const BusinessContext = createContext<BusinessContextType | undefined>(
	undefined,
);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [business, setBusiness] = useState<BusinessState>(intialState);
	const [loading, setLoading] = useState<boolean>(false);
	const [businesses, setBusinesses] = useState<BusinessState[]>([]);

	const { openSignIn } = useClerk();
	const { isSignedIn } = useUser();

	const router = useRouter();
	const pathname = usePathname();

	const isDashboardPage = pathname === '/dashboard';

	useEffect(() => {
		const savedBusiness = localStorage.getItem('business');
		if (savedBusiness) {
			setBusiness(JSON.parse(savedBusiness));
		}
	}, []);

	useEffect(() => {
		if (isDashboardPage) {
			getUserBusinesses();
		}
	}, [isDashboardPage]);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setBusiness((prevBusiness: BusinessState) => {
			const updatedBusiness = { ...prevBusiness, [name]: value };
			localStorage.setItem('business', JSON.stringify(updatedBusiness));
			return updatedBusiness;
		});
	};

	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();

		if (!isSignedIn) {
			openSignIn();
			return;
		} else {
			try {
				setLoading(true);
				const savedBusiness = await saveBusinessToDb(business);
				setBusiness(savedBusiness);
				localStorage.removeItem('business');

				toast.success('🎉 Business saved Successfully');
				router.push(`/dashboard/business/edit/${savedBusiness._id}`);
			} catch (err) {
				console.log(err);
				toast.error('❌ Failed to save business');
			} finally {
				setLoading(false);
			}
		}
	};

	const getUserBusinesses = async () => {
		setLoading(true);

		try {
			const businesses = await getUserBusinessesFromDb();
			setBusinesses(businesses);
		} catch (err) {
			console.log(err);
			toast.error('❌ Failed to fetch businesses');
		} finally {
			setLoading(false);
		}
	};

	return (
		<BusinessContext.Provider
			value={{
				business,
				setBusiness,
				loading,
				setLoading,
				handleChange,
				handleSubmit,
				businesses,
				setBusinesses,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
};

export const useBusiness = () => {
	const context = useContext(BusinessContext);

	if (!context) {
		throw new Error('useBusiness must be used within a BusinessProvider');
	}
	return context;
};

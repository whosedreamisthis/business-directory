'use client';

import { Bus } from 'lucide-react';
import React, {
	createContext,
	useContext,
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
import { useRouter, usePathname, useParams } from 'next/navigation';

const initialState: BusinessState = {
	_id: '',
	userEmail: '',
	name: '',
	description: '',
	address: '',
	phone: '',
	website: '',
	category: '',
	email: '',
	hours: '',
	logo: '',
	abn: '',
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
	handleSubmit: (e: React.FormEvent) => void;
	businesses: BusinessState[];
	setBusinesses: React.Dispatch<React.SetStateAction<BusinessState[]>>;
	initialState: BusinessState;
}
const BusinessContext = createContext<BusinessContextType | undefined>(
	undefined
);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [business, setBusiness] = useState<BusinessState>(initialState);
	const [loading, setLoading] = useState<boolean>(false);
	const [businesses, setBusinesses] = useState<BusinessState[]>([]);
	const { openSignIn } = useClerk();
	const { isSignedIn } = useUser();
	const router = useRouter();
	const pathname = usePathname();

	const isDashboardPage = pathname === '/dashboard';
	const { slug } = useParams();
	useEffect(() => {
		const savedBusiness = localStorage.getItem('business');
		if (savedBusiness) {
			setBusiness(JSON.parse(savedBusiness));
		}
	}, [router]);

	useEffect(() => {
		if (isDashboardPage) {
			getUserBusinesses();
		}
	}, [isDashboardPage]);

	useEffect(() => {
		if (typeof slug === 'string') {
			getBusiness();
		}
	}, [slug]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setBusiness((prevBusiness: BusinessState) => {
			const updatedBusiness = { ...prevBusiness, [name]: value };

			localStorage.setItem('business', JSON.stringify(updatedBusiness));
			return updatedBusiness;
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
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
				toast.success('🎉 Business saved successfully');
				router.push(`/dashboard/business/edit/${savedBusiness._id}`);
			} catch (err) {
				console.log('❌', err);
				toast.success('❌ Failed to save business');
			} finally {
				setLoading(false);
			}

			setLoading(false);
		}
	};

	const getUserBusinesses = async () => {
		setLoading(true);

		try {
			const businesses = await getUserBusinessesFromDb();
			setBusinesses(businesses);
		} catch (err: any) {
			console.log(err);
			toast.error('❌ Failed to fetch businesses');
		} finally {
			setLoading(false);
		}
	};

	const getBusiness = async () => {
		if (!slug || typeof slug !== 'string') {
			return;
		}
		try {
			const business = await getBusinessFromDb(slug.toString());
			setBusiness(business);
		} catch (err: any) {
			console.log(err);
			toast.error('❌ Failed to fetch business');
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
				initialState,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
};

export const useBusiness = (): BusinessContextType => {
	const context = useContext(BusinessContext);
	if (!context) {
		throw new Error('useBusiness must be used within a BusinessProvider');
	}
	return context;
};
